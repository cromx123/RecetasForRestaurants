const { pool } = require('../../db/pool');

async function getIngredients(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT id, name FROM ingredients ORDER BY name');
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function createIngredient(req, res, next) {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ error: 'Nombre requerido' });

    const [existing] = await pool.query('SELECT id FROM ingredients WHERE name = ?', [name.trim()]);
    if (existing.length > 0) return res.status(409).json({ error: 'El ingrediente ya existe' });

    const [result] = await pool.query('INSERT INTO ingredients (name) VALUES (?)', [name.trim()]);
    res.status(201).json({ id: result.insertId, name: name.trim() });
  } catch (err) {
    next(err);
  }
}

async function deleteIngredient(req, res, next) {
  try {
    const { id } = req.params;

    const [inUse] = await pool.query(
      'SELECT recipe_id FROM recipe_ingredients WHERE ingredient_id = ? LIMIT 1',
      [id]
    );
    if (inUse.length > 0) {
      return res.status(400).json({ error: 'No se puede eliminar: el ingrediente está en uso en recetas' });
    }

    await pool.query('DELETE FROM ingredients WHERE id = ?', [id]);
    res.json({ message: 'Ingrediente eliminado' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getIngredients, createIngredient, deleteIngredient };
