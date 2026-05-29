const { Router } = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('./users.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { requireAdmin } = require('../../middlewares/role.middleware');

const router = Router();

router.get('/', authMiddleware, requireAdmin, getUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, requireAdmin, deleteUser);

module.exports = router;
