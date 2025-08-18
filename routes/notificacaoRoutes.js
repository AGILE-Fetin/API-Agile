const express = require('express');
const router = express.Router();
const notificacaoController = require('../controllers/notificacaoController');
const autenticarToken = require('../middlewares/authMiddleware');

router.post('/', autenticarToken, notificacaoController.createNotificacao);
router.get('/', autenticarToken, notificacaoController.getNotificacoes);
router.get('/:id', autenticarToken, notificacaoController.getNotificacaoById);
router.put('/:id', autenticarToken, notificacaoController.updateNotificacao);
router.delete('/:id', autenticarToken, notificacaoController.deleteNotificacao);

module.exports = router;
