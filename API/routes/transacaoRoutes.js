const express = require('express');
const router = express.Router();
const transacaoController = require('../controllers/transacaoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Todas rotas protegidas, precisa de token
router.post('/', authMiddleware, transacaoController.createTransacao);
router.get('/', authMiddleware, transacaoController.getAllTransacoes);
router.get('/:id', authMiddleware, transacaoController.getTransacaoById);
router.put('/:id', authMiddleware, transacaoController.updateTransacao);
router.delete('/:id', authMiddleware, transacaoController.deleteTransacao);

module.exports = router;
