const { pool } = require('../../db/pool');

async function getFilters(req, res, next) {
  try {
    const [rows] = await pool.query(
      `SELECT f.id, f.name, f.description, f.ingredient_id, i.name AS ingredient_name
       FROM filters f
       LEFT JOIN ingredients i ON i.id = f.ingredient_id
       ORDER BY f.name`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function createFilter(req, res, next) {
  try {
    const { name, description, ingredient_id } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ error: 'Nombre requerido' });

    const [result] = await pool.query(
      'INSERT INTO filters (name, description, ingredient_id) VALUES (?, ?, ?)',
      [name.trim(), description || null, ingredient_id || null]
    );
    res.status(201).json({ id: result.insertId, name: name.trim() });
  } catch (err) {
    next(err);
  }
}

async function deleteFilter(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM filters WHERE id = ?', [id]);
    res.json({ message: 'Filtro eliminado' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getFilters, createFilter, deleteFilter };
