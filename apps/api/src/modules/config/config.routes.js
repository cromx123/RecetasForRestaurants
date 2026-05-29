const { Router } = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { requireAdmin } = require('../../middlewares/role.middleware');
const { getConfig, updateConfig } = require('./config.controller');

const router = Router();

// Público: cualquiera puede leer el horario
router.get('/', getConfig);

// Admin: sólo administradores pueden modificar
router.put('/', authMiddleware, requireAdmin, updateConfig);

module.exports = router;
