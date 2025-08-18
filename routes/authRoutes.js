const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const csrfProtection = require('../middlewares/csrfMiddleware');
const { authRateLimit } = require('../middlewares/rateLimitMiddleware');
const { validateRegister, validateLogin } = require('../middlewares/validationMiddleware');

// Rotas públicas
router.post('/register', authRateLimit, validateRegister, register);
router.post('/login', authRateLimit, validateLogin, login);

// Rota protegida
router.get('/profile', authMiddleware, getProfile);

// Rota para obter token CSRF
router.get('/csrf-token', csrfProtection.getToken);

module.exports = router;
