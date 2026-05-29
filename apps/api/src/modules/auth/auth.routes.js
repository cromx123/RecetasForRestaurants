const { Router } = require('express');
const { login, register, me } = require('./auth.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', authMiddleware, me);

module.exports = router;
