const mysql = require('mysql2/promise');
const { db } = require('../config/env');

const pool = mysql.createPool({
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  database: db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function waitForDB(retries = 10, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      const conn = await pool.getConnection();
      conn.release();
      console.log('Database connection established.');
      return;
    } catch (err) {
      console.log(`DB not ready, retrying in ${delay / 1000}s... (${i + 1}/${retries})`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error('Could not connect to the database after multiple retries.');
}

module.exports = { pool, waitForDB };
