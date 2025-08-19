const express = require('express');
const router = express.Router();
const controller = require('../controllers/imovelController');
const autenticarToken = require('../middlewares/authMiddleware');
const csrfProtection = require('../middlewares/csrfMiddleware');

// Públicas
router.get('/', controller.listarImoveis);
router.get('/:id', controller.buscarImovelPorId);

// Privadas (autenticadas)
router.post('/', autenticarToken, controller.criarImovel);
router.put('/:id', autenticarToken, controller.atualizarImovel);
router.delete('/:id', autenticarToken, controller.deletarImovel);

module.exports = router;
