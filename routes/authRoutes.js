const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Já está certo
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('📩 Dados recebidos:', { email, password });

  try {
    const usuario = await User.findOne({ email });
    console.log('🔍 Usuário encontrado:', usuario);

    if (!usuario) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // ⛏️ Aqui é onde estava o erro!
    const senhaValida = await bcrypt.compare(password, usuario.password);
    console.log('🔐 Senha válida?', senhaValida);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.fullName,
        email: usuario.email,
        roles: usuario.roles
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno', erro: error.message });
  }
});

module.exports = router;
