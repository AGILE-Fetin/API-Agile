const express = require('express');
const router = express.Router();
const User = require('../models/User');
const autenticarToken = require('../middlewares/authMiddleware'); 

// ✅ Rota protegida com autenticação
router.get('/', autenticarToken, async (req, res) => {
  try {
    const usuarios = await User.find({}, '-password'); // 🔐 Oculta o campo password
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuários', erro: err.message });
  }
});

module.exports = router;
