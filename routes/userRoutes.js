const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // ✅ importa o controller
const authMiddleware = require('../middlewares/authMiddleware'); // ✅ middleware de autenticação

// ✅ Rota protegida com autenticação para listar todos os usuários
router.get('/', authMiddleware, async (req, res) => {
  try {
    const usuarios = await require('../models/User').find({}, '-password'); // 🔐 oculta senha
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuários', erro: err.message });
  }
});

// Atualizar usuário
router.put('/:id', authMiddleware, userController.updateUser);

// Deletar usuário
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
