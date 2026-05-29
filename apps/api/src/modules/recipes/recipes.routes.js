const { Router } = require('express');
const {
  getRecipes,
  searchRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require('./recipes.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { requireAdmin } = require('../../middlewares/role.middleware');

const router = Router();

router.get('/search', searchRecipes);
router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.post('/', authMiddleware, requireAdmin, createRecipe);
router.put('/:id', authMiddleware, requireAdmin, updateRecipe);
router.delete('/:id', authMiddleware, requireAdmin, deleteRecipe);

module.exports = router;
