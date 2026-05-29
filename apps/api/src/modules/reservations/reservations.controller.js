const { pool } = require('../../db/pool');
const { sendConfirmationEmail } = require('../../services/email.service');
const { DEFAULT_CONFIG } = require('../config/config.controller');

// ── Helpers ───────────────────────────────────────────────────
function parseDateLocal(dateStr) {
  const [y, m, d] = String(dateStr).slice(0, 10).split('-').map(Number);
  return new Date(y, m - 1, d);
}

function timeToMins(timeStr) {
  const [h, m] = String(timeStr).slice(0, 5).split(':').map(Number);
  return h * 60 + m;
}

async function loadConfig() {
  const [rows] = await pool.query(
    'SELECT config_key, config_value FROM restaurant_config'
  );
  const config = { ...DEFAULT_CONFIG };
  for (const row of rows) {
    config[row.config_key] = JSON.parse(row.config_value);
  }
  return config;
}

// ── Controladores ─────────────────────────────────────────────
async function createReservation(req, res, next) {
  try {
    const { reservation_date, reservation_time, duration, guests, notes } = req.body;

    // Campos requeridos
    if (!reservation_date || !reservation_time || !duration || !guests) {
      return res.status(400).json({ error: 'Fecha, horario, duración y número de personas son requeridos' });
    }

    // Fecha debe ser mañana o posterior
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const resDate = parseDateLocal(reservation_date);
    if (resDate <= today) {
      return res.status(400).json({ error: 'La reserva debe ser para mañana o una fecha posterior' });
    }

    // Cargar config del restaurante
    const config = await loadConfig();
    const dayNum = resDate.getDay();
    const dayConfig = config.schedule[dayNum] || config.schedule[String(dayNum)];

    // Día cerrado
    if (!dayConfig || dayConfig.closed) {
      return res.status(400).json({ error: 'El restaurante no abre ese día. Elige otra fecha.' });
    }

    // Duración válida
    const durationNum = parseInt(duration);
    const allowedDurations = config.durations.map(Number);
    if (!allowedDurations.includes(durationNum)) {
      return res.status(400).json({ error: 'Duración no disponible' });
    }

    // Horario: el slot + duración debe caber dentro del horario de cierre
    const timeKey   = String(reservation_time).slice(0, 5);
    const slotMins  = timeToMins(timeKey);
    const openMins  = timeToMins(dayConfig.open);
    const closeMins = timeToMins(dayConfig.close);

    if (slotMins < openMins || slotMins + durationNum > closeMins) {
      return res.status(400).json({ error: 'El horario seleccionado no está disponible para esa duración' });
    }

    // Personas: 1–8
    const guestsNum = parseInt(guests);
    if (isNaN(guestsNum) || guestsNum < 1 || guestsNum > 8) {
      return res.status(400).json({ error: 'El número de personas debe ser entre 1 y 8' });
    }

    // Sin duplicados para el mismo usuario, día y hora
    const [existing] = await pool.query(
      `SELECT id FROM reservations
       WHERE user_id = ? AND reservation_date = ? AND reservation_time = ? AND status = 'confirmada'`,
      [req.user.id, reservation_date, timeKey]
    );
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Ya tienes una reserva confirmada para ese día y hora' });
    }

    // Obtener datos del usuario para el email
    const [userRows] = await pool.query(
      'SELECT username, email FROM users WHERE id = ?',
      [req.user.id]
    );
    if (userRows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    const [result] = await pool.query(
      `INSERT INTO reservations (user_id, reservation_date, reservation_time, duration, guests, notes)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [req.user.id, reservation_date, timeKey, durationNum, guestsNum, notes || null]
    );

    const reservation = {
      id:               result.insertId,
      reservation_date,
      reservation_time: timeKey,
      duration:         durationNum,
      guests:           guestsNum,
      notes:            notes || null,
      status:           'confirmada',
    };

    sendConfirmationEmail(userRows[0], reservation).catch((err) =>
      console.error('[EMAIL] Error al enviar confirmación:', err.message)
    );

    res.status(201).json({ ...reservation, message: 'Reserva creada. Te enviamos un correo de confirmación.' });
  } catch (err) {
    next(err);
  }
}

async function getMyReservations(req, res, next) {
  try {
    const [rows] = await pool.query(
      `SELECT
         id,
         DATE_FORMAT(reservation_date, '%Y-%m-%d') AS reservation_date,
         TIME_FORMAT(reservation_time, '%H:%i')    AS reservation_time,
         duration,
         guests,
         notes,
         status,
         reminder_sent,
         DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s') AS created_at
       FROM reservations
       WHERE user_id = ?
       ORDER BY reservation_date ASC, reservation_time ASC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function cancelReservation(req, res, next) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      'SELECT id, user_id, reservation_date, reservation_time, status FROM reservations WHERE id = ?',
      [id]
    );

    if (rows.length === 0) return res.status(404).json({ error: 'Reserva no encontrada' });
    if (rows[0].user_id !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
    if (rows[0].status === 'cancelada') return res.status(400).json({ error: 'La reserva ya está cancelada' });

    const dateTime = new Date(`${rows[0].reservation_date}T${rows[0].reservation_time}`);
    if (dateTime < new Date()) {
      return res.status(400).json({ error: 'No se puede cancelar una reserva que ya ocurrió' });
    }

    await pool.query('UPDATE reservations SET status = ? WHERE id = ?', ['cancelada', id]);
    res.json({ message: 'Reserva cancelada exitosamente' });
  } catch (err) {
    next(err);
  }
}

module.exports = { createReservation, getMyReservations, cancelReservation };
