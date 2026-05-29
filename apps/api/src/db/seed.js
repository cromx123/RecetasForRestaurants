const bcrypt = require('bcryptjs');
const { pool } = require('./pool');

async function seedDatabase() {
  const [rows] = await pool.query('SELECT COUNT(*) as count FROM users');
  if (rows[0].count > 0) return;

  console.log('Seeding admin user...');
  const passwordHash = await bcrypt.hash('adm123', 10);

  const [result] = await pool.query(
    'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
    ['Gabriel', 'ga.admin@gmail.com', passwordHash, 'Administrador']
  );

  await pool.query('INSERT INTO admins (user_id) VALUES (?)', [result.insertId]);
  console.log('Admin user seeded: Gabriel / adm123');
}

module.exports = { seedDatabase };
