const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const autenticarToken = require('../middlewares/authMiddleware');

// Criar novo pedido
router.post('/', autenticarToken, pedidoController.createPedido);

// Listar pedidos (todos ou filtro por userId via query)
router.get('/', autenticarToken, pedidoController.getPedidos);

// Buscar pedido por id
router.get('/:id', autenticarToken, pedidoController.getPedidoById);

// Atualizar pedido
router.put('/:id', autenticarToken, pedidoController.updatePedido);

// Deletar pedido
router.delete('/:id', autenticarToken, pedidoController.deletePedido);

module.exports = router;
