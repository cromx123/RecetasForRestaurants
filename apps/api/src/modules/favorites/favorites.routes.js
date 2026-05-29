const { Router } = require('express');
const { getFavorites, addFavorite, removeFavorite } = require('./favorites.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');

const router = Router();

router.get('/', authMiddleware, getFavorites);
router.post('/:recipeId', authMiddleware, addFavorite);
router.delete('/:recipeId', authMiddleware, removeFavorite);

module.exports = router;
