require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { port } = require('./config/env');
const { waitForDB } = require('./db/pool');
const { seedDatabase } = require('./db/seed');
const { errorMiddleware } = require('./middlewares/error.middleware');

const authRoutes        = require('./modules/auth/auth.routes');
const usersRoutes       = require('./modules/users/users.routes');
const recipesRoutes     = require('./modules/recipes/recipes.routes');
const ingredientsRoutes = require('./modules/ingredients/ingredients.routes');
const filtersRoutes     = require('./modules/filters/filters.routes');
const favoritesRoutes   = require('./modules/favorites/favorites.routes');
const commentsRoutes    = require('./modules/comments/comments.routes');
const reservationsRoutes = require('./modules/reservations/reservations.routes');
const configRoutes       = require('./modules/config/config.routes');
const { startReminderCron } = require('./services/reminder.cron');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/ingredients', ingredientsRoutes);
app.use('/api/filters', filtersRoutes);
app.use('/api/favorites',     favoritesRoutes);
app.use('/api/reservations',  reservationsRoutes);
app.use('/api/config',        configRoutes);
app.use('/api', commentsRoutes);

app.use(errorMiddleware);

async function start() {
  await waitForDB();
  await seedDatabase();
  startReminderCron();
  app.listen(port, () => console.log(`MagicGourmet API running on port ${port}`));
}

start().catch((err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});
