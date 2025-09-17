const express = require('express');
const router = express.Router();
const controller = require('../controllers/automovelController');
const autenticarToken = require('../middlewares/authMiddleware');
const csrfProtection = require('../middlewares/csrfMiddleware');
const { validateObjectIdParam } = require('../middlewares/validationMiddleware');

// Rotas públicas
router.get('/', controller.getAll);
router.get('/:id', validateObjectIdParam(), controller.getById);

// Rotas privadas (requerem autenticação)
router.post('/', autenticarToken, csrfProtection.validateToken, controller.create);
router.put('/:id', validateObjectIdParam(), autenticarToken, csrfProtection.validateToken, controller.update);
router.delete('/:id', validateObjectIdParam(), autenticarToken, csrfProtection.validateToken, controller.remove);

module.exports = router;
