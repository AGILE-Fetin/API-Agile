const express = require('express');
const router = express.Router();
const pixController = require('../controllers/pixController');
const autenticarToken = require('../middlewares/authMiddleware');
const csrfProtection = require('../middlewares/csrfMiddleware');

// Validação para PIX
const validarDadosPix = (req, res, next) => {
  const { valor, chavePix } = req.body;
  
  if (!valor || isNaN(valor) || parseFloat(valor) <= 0) {
    return res.status(400).json({ message: 'Valor deve ser um número maior que zero' });
  }
  
  if (!chavePix || chavePix.trim().length === 0) {
    return res.status(400).json({ message: 'Chave PIX é obrigatória' });
  }
  
  // Converter valor para número
  req.body.valor = parseFloat(valor);
  req.body.chavePix = chavePix.trim();
  
  next();
};

// Gerar PIX (autenticado + CSRF)
router.post('/gerar', autenticarToken, csrfProtection.validateToken, validarDadosPix, pixController.gerarPix);

// Verificar status do pagamento
router.get('/status/:transacaoId', autenticarToken, pixController.verificarStatus);

// Listar transações do usuário
router.get('/transacoes', autenticarToken, pixController.listarTransacoes);

module.exports = router;