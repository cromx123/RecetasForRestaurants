require('dotenv').config();

module.exports = {
  port: process.env.PORT || 4000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'magicuser',
    password: process.env.DB_PASSWORD || 'magicpass',
    database: process.env.DB_NAME || 'magicgourmet',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'change_me_dev_secret_2024',
    expiresIn: '7d',
  },
};
