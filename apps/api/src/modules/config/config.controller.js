const { pool } = require('../../db/pool');

// Valores por defecto si aún no se ha guardado config en DB
const DEFAULT_CONFIG = {
  schedule: {
    0: { open: '13:00', close: '22:30', closed: false },  // Domingo
    1: { open: '13:00', close: '22:30', closed: true  },  // Lunes (cerrado)
    2: { open: '13:00', close: '22:30', closed: false },  // Martes
    3: { open: '13:00', close: '22:30', closed: false },  // Miércoles
    4: { open: '13:00', close: '22:30', closed: false },  // Jueves
    5: { open: '13:00', close: '22:30', closed: false },  // Viernes
    6: { open: '13:00', close: '22:30', closed: false },  // Sábado
  },
  durations: [60, 90, 120],
};

async function getConfig(req, res, next) {
  try {
    const [rows] = await pool.query(
      'SELECT config_key, config_value FROM restaurant_config'
    );

    const config = { ...DEFAULT_CONFIG };
    for (const row of rows) {
      config[row.config_key] = JSON.parse(row.config_value);
    }

    res.json(config);
  } catch (err) {
    next(err);
  }
}

async function updateConfig(req, res, next) {
  try {
    const { schedule, durations } = req.body;
    const errors = [];

    if (schedule) {
      // Validar que cada día tenga open, close y closed
      for (const [day, cfg] of Object.entries(schedule)) {
        if (!cfg.closed && (!cfg.open || !cfg.close)) {
          errors.push(`El día ${day} requiere hora de apertura y cierre`);
        }
      }
    }

    if (durations) {
      if (!Array.isArray(durations) || durations.length === 0) {
        errors.push('Debes seleccionar al menos una duración');
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join('. ') });
    }

    const upsert = async (key, value) => {
      await pool.query(
        `INSERT INTO restaurant_config (config_key, config_value)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE config_value = VALUES(config_value)`,
        [key, JSON.stringify(value)]
      );
    };

    if (schedule)   await upsert('schedule',   schedule);
    if (durations)  await upsert('durations',  durations);

    res.json({ message: 'Configuración guardada exitosamente' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getConfig, updateConfig, DEFAULT_CONFIG };
