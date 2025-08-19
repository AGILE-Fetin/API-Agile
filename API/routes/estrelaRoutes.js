const express = require('express');
const router = express.Router();
const estrelaController = require('../controllers/estrelaController');
const authMiddleware = require('../middlewares/authMiddleware');

// Todas as rotas aqui são protegidas (precisa de token)
router.post('/', authMiddleware, estrelaController.createEstrela);
router.get('/', authMiddleware, estrelaController.getAllEstrelas);
router.get('/:id', authMiddleware, estrelaController.getEstrelaById);
router.put('/:id', authMiddleware, estrelaController.updateEstrela);
router.delete('/:id', authMiddleware, estrelaController.deleteEstrela);

module.exports = router;
