const { pool } = require('../../db/pool');

async function getRecipes(req, res, next) {
  try {
    const [recipes] = await pool.query(
      'SELECT id, name, description, link, image_url, category, price, preparation_time, is_available, created_at FROM recipes ORDER BY category, name ASC'
    );

    const result = await Promise.all(
      recipes.map(async (recipe) => {
        const [ingredients] = await pool.query(
          `SELECT i.id, i.name FROM ingredients i
           JOIN recipe_ingredients ri ON ri.ingredient_id = i.id
           WHERE ri.recipe_id = ?`,
          [recipe.id]
        );
        const [steps] = await pool.query(
          'SELECT id, description, step_order FROM steps WHERE recipe_id = ? ORDER BY step_order',
          [recipe.id]
        );
        return { ...recipe, ingredients, steps };
      })
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function searchRecipes(req, res, next) {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    const term = `%${q}%`;
    const [recipes] = await pool.query(
      `SELECT DISTINCT r.id, r.name, r.description, r.link, r.image_url, r.category, r.price, r.preparation_time, r.is_available, r.created_at
       FROM recipes r
       LEFT JOIN recipe_ingredients ri ON ri.recipe_id = r.id
       LEFT JOIN ingredients i ON i.id = ri.ingredient_id
       WHERE r.name LIKE ? OR r.description LIKE ? OR i.name LIKE ?
       ORDER BY r.category, r.name ASC`,
      [term, term, term]
    );

    const result = await Promise.all(
      recipes.map(async (recipe) => {
        const [ingredients] = await pool.query(
          `SELECT i.id, i.name FROM ingredients i
           JOIN recipe_ingredients ri ON ri.ingredient_id = i.id
           WHERE ri.recipe_id = ?`,
          [recipe.id]
        );
        const [steps] = await pool.query(
          'SELECT id, description, step_order FROM steps WHERE recipe_id = ? ORDER BY step_order',
          [recipe.id]
        );
        return { ...recipe, ingredients, steps };
      })
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getRecipeById(req, res, next) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      'SELECT id, name, description, link, image_url, category, price, preparation_time, is_available, created_at FROM recipes WHERE id = ?',
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Receta no encontrada' });

    const recipe = rows[0];
    const [ingredients] = await pool.query(
      `SELECT i.id, i.name FROM ingredients i
       JOIN recipe_ingredients ri ON ri.ingredient_id = i.id
       WHERE ri.recipe_id = ?`,
      [id]
    );
    const [steps] = await pool.query(
      'SELECT id, description, step_order FROM steps WHERE recipe_id = ? ORDER BY step_order',
      [id]
    );

    res.json({ ...recipe, ingredients, steps });
  } catch (err) {
    next(err);
  }
}

async function createRecipe(req, res, next) {
  const conn = await pool.getConnection();
  try {
    const { name, description, link, image_url, category, price, preparation_time, ingredients = [], steps = [] } = req.body;
    if (!name) return res.status(400).json({ error: 'El nombre es requerido' });

    await conn.beginTransaction();

    const [result] = await conn.query(
      'INSERT INTO recipes (name, description, link, image_url, category, price, preparation_time, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, description || '', link || '', image_url || '', category || 'Entradas', price || 0, preparation_time || null, req.user.id]
    );
    const recipeId = result.insertId;

    for (const ingName of ingredients) {
      const [ingRows] = await conn.query(
        'SELECT id FROM ingredients WHERE name = ?',
        [ingName.trim()]
      );
      if (ingRows.length > 0) {
        await conn.query(
          'INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)',
          [recipeId, ingRows[0].id]
        );
      }
    }

    for (let i = 0; i < steps.length; i++) {
      if (steps[i].trim()) {
        await conn.query(
          'INSERT INTO steps (recipe_id, description, step_order) VALUES (?, ?, ?)',
          [recipeId, steps[i].trim(), i + 1]
        );
      }
    }

    await conn.commit();
    res.status(201).json({ id: recipeId, message: 'Receta creada' });
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
}

async function updateRecipe(req, res, next) {
  const conn = await pool.getConnection();
  try {
    const { id } = req.params;
    const { name, description, link, image_url, category, price, preparation_time, ingredients, steps } = req.body;

    await conn.beginTransaction();

    const updates = [];
    const values = [];
    if (name) { updates.push('name = ?'); values.push(name); }
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (link !== undefined) { updates.push('link = ?'); values.push(link); }
    if (image_url !== undefined) { updates.push('image_url = ?'); values.push(image_url); }
    if (category !== undefined) { updates.push('category = ?'); values.push(category); }
    if (price !== undefined) { updates.push('price = ?'); values.push(price); }
    if (preparation_time !== undefined) { updates.push('preparation_time = ?'); values.push(preparation_time); }

    if (updates.length > 0) {
      values.push(id);
      await conn.query(`UPDATE recipes SET ${updates.join(', ')} WHERE id = ?`, values);
    }

    if (Array.isArray(ingredients)) {
      await conn.query('DELETE FROM recipe_ingredients WHERE recipe_id = ?', [id]);
      for (const ingName of ingredients) {
        const [ingRows] = await conn.query('SELECT id FROM ingredients WHERE name = ?', [ingName.trim()]);
        if (ingRows.length > 0) {
          await conn.query(
            'INSERT IGNORE INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)',
            [id, ingRows[0].id]
          );
        }
      }
    }

    if (Array.isArray(steps)) {
      await conn.query('DELETE FROM steps WHERE recipe_id = ?', [id]);
      for (let i = 0; i < steps.length; i++) {
        if (steps[i].trim()) {
          await conn.query(
            'INSERT INTO steps (recipe_id, description, step_order) VALUES (?, ?, ?)',
            [id, steps[i].trim(), i + 1]
          );
        }
      }
    }

    await conn.commit();
    res.json({ message: 'Receta actualizada' });
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
}

async function deleteRecipe(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM recipes WHERE id = ?', [id]);
    res.json({ message: 'Receta eliminada' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getRecipes, searchRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe };
