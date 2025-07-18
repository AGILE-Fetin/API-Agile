const express = require('express');
const router = express.Router();
const controller = require('../controllers/servicoController');
const autenticarToken = require('../middlewares/authMiddleware');

// Públicas
router.get('/', controller.listarServicos);
router.get('/:id', controller.buscarServicoPorId);

// Privadas
router.post('/', autenticarToken, controller.criarServico);
router.put('/:id', autenticarToken, controller.atualizarServico);
router.delete('/:id', autenticarToken, controller.deletarServico);

module.exports = router;
