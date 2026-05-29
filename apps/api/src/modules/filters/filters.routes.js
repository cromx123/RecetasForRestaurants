const { Router } = require('express');
const { getFilters, createFilter, deleteFilter } = require('./filters.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { requireAdmin } = require('../../middlewares/role.middleware');

const router = Router();

router.get('/', getFilters);
router.post('/', authMiddleware, requireAdmin, createFilter);
router.delete('/:id', authMiddleware, requireAdmin, deleteFilter);

module.exports = router;
