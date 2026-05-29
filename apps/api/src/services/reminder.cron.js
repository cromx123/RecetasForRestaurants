const cron = require('node-cron');
const { pool } = require('../db/pool');
const { sendReminderEmail } = require('./email.service');

function startReminderCron() {
  // Runs every day at 09:00 server time
  cron.schedule('0 9 * * *', async () => {
    console.log('[CRON] Buscando reservas para recordatorio en 2 días...');
    try {
      const [rows] = await pool.query(`
        SELECT
          r.id,
          DATE_FORMAT(r.reservation_date, '%Y-%m-%d') AS reservation_date,
          TIME_FORMAT(r.reservation_time, '%H:%i')    AS reservation_time,
          r.guests,
          r.notes,
          u.username,
          u.email
        FROM reservations r
        JOIN users u ON u.id = r.user_id
        WHERE r.reservation_date = DATE_ADD(CURDATE(), INTERVAL 2 DAY)
          AND r.reminder_sent = 0
          AND r.status = 'confirmada'
      `);

      if (rows.length === 0) {
        console.log('[CRON] Sin recordatorios pendientes hoy.');
        return;
      }

      for (const row of rows) {
        try {
          await sendReminderEmail(
            { username: row.username, email: row.email },
            { reservation_date: row.reservation_date, reservation_time: row.reservation_time, guests: row.guests, notes: row.notes }
          );
          await pool.query('UPDATE reservations SET reminder_sent = 1 WHERE id = ?', [row.id]);
          console.log(`[CRON] Recordatorio enviado — reserva #${row.id} → ${row.email}`);
        } catch (emailErr) {
          console.error(`[CRON] Error al enviar recordatorio para reserva #${row.id}:`, emailErr.message);
        }
      }
    } catch (err) {
      console.error('[CRON] Error al ejecutar el cron de recordatorios:', err);
    }
  });

  console.log('[CRON] Scheduler de recordatorios iniciado (diario a las 09:00)');
}

module.exports = { startReminderCron };
