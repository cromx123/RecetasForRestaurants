const { pool } = require('../../db/pool');

async function getUsers(req, res, next) {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    if (req.user.id !== parseInt(id) && req.user.role !== 'Administrador') {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    const [rows] = await pool.query(
      'SELECT id, username, email, role, created_at FROM users WHERE id = ?',
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;

    if (req.user.id !== parseInt(id) && req.user.role !== 'Administrador') {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    const updates = [];
    const values = [];

    if (username) { updates.push('username = ?'); values.push(username); }
    if (email) { updates.push('email = ?'); values.push(email); }
    if (role && req.user.role === 'Administrador') {
      updates.push('role = ?');
      values.push(role);
    }

    if (updates.length === 0) return res.status(400).json({ error: 'Nada que actualizar' });

    values.push(id);
    await pool.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);
    res.json({ message: 'Usuario actualizado' });
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getUsers, getUserById, updateUser, deleteUser };
