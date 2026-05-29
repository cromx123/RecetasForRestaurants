const { pool } = require('../../db/pool');

async function getComments(req, res, next) {
  try {
    const { recipeId } = req.params;
    const [rows] = await pool.query(
      `SELECT c.id, c.description, c.created_at, c.user_id, u.username
       FROM comments c
       LEFT JOIN users u ON u.id = c.user_id
       WHERE c.recipe_id = ?
       ORDER BY c.created_at DESC`,
      [recipeId]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function addComment(req, res, next) {
  try {
    const { recipeId } = req.params;
    const { description } = req.body;

    if (!description || !description.trim()) {
      return res.status(400).json({ error: 'El comentario no puede estar vacío' });
    }

    const [result] = await pool.query(
      'INSERT INTO comments (recipe_id, user_id, description) VALUES (?, ?, ?)',
      [recipeId, req.user.id, description.trim()]
    );
    res.status(201).json({ id: result.insertId, message: 'Comentario agregado' });
  } catch (err) {
    next(err);
  }
}

async function deleteComment(req, res, next) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT user_id FROM comments WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Comentario no encontrado' });

    if (rows[0].user_id !== req.user.id && req.user.role !== 'Administrador') {
      return res.status(403).json({ error: 'No tienes permiso para eliminar este comentario' });
    }

    await pool.query('DELETE FROM comments WHERE id = ?', [id]);
    res.json({ message: 'Comentario eliminado' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getComments, addComment, deleteComment };
