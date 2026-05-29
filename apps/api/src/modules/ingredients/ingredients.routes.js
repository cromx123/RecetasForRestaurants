const { Router } = require('express');
const { getIngredients, createIngredient, deleteIngredient } = require('./ingredients.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { requireAdmin } = require('../../middlewares/role.middleware');

const router = Router();

router.get('/', getIngredients);
router.post('/', authMiddleware, requireAdmin, createIngredient);
router.delete('/:id', authMiddleware, requireAdmin, deleteIngredient);

module.exports = router;
