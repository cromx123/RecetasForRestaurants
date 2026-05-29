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
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || '"MagicGourmet" <noreply@magicgourmet.cl>',
  },
  restaurant: {
    name: process.env.RESTAURANT_NAME || 'MagicGourmet',
  },
};
