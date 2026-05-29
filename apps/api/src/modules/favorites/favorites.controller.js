const { pool } = require('../../db/pool');

async function getFavorites(req, res, next) {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      `SELECT r.id, r.name, r.description, r.link, r.image_url, r.created_at,
              f.created_at AS favorited_at
       FROM favorites f
       JOIN recipes r ON r.id = f.recipe_id
       WHERE f.user_id = ?
       ORDER BY f.created_at DESC`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function addFavorite(req, res, next) {
  try {
    const userId = req.user.id;
    const { recipeId } = req.params;

    const [existing] = await pool.query(
      'SELECT 1 FROM favorites WHERE user_id = ? AND recipe_id = ?',
      [userId, recipeId]
    );
    if (existing.length > 0) return res.status(409).json({ error: 'Ya está en favoritos' });

    await pool.query('INSERT INTO favorites (user_id, recipe_id) VALUES (?, ?)', [userId, recipeId]);

    await pool.query(
      'UPDATE clients SET favorite_count = favorite_count + 1 WHERE user_id = ?',
      [userId]
    );

    res.status(201).json({ message: 'Agregado a favoritos' });
  } catch (err) {
    next(err);
  }
}

async function removeFavorite(req, res, next) {
  try {
    const userId = req.user.id;
    const { recipeId } = req.params;

    await pool.query('DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?', [userId, recipeId]);

    await pool.query(
      'UPDATE clients SET favorite_count = GREATEST(0, favorite_count - 1) WHERE user_id = ?',
      [userId]
    );

    res.json({ message: 'Eliminado de favoritos' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getFavorites, addFavorite, removeFavorite };
