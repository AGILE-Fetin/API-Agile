const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Função para gerar token JWT
const gerarToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secreta', {
    expiresIn: '7d'
  });
};

// Registrar novo usuário
exports.register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Verifica se o email já está cadastrado
    let usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    // Criptografa a senha
    const senhaHash = await bcrypt.hash(password, 10);

    // Cria e salva o novo usuário
    const novoUsuario = await User.create({
      email,
      password: senhaHash,
      fullName,
      roles: ['cliente'],
      isActive: true
    });

    // Gera token
    const token = gerarToken(novoUsuario._id);

    res.status(201).json({
      token,
      user: {
        _id: novoUsuario._id,
        email: novoUsuario.email,
        fullName: novoUsuario.fullName,
        roles: novoUsuario.roles
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
  }
};

// Login do usuário
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const senhaCorreta = await bcrypt.compare(password, usuario.password);
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = gerarToken(usuario._id);

    res.status(200).json({
      token,
      user: {
        _id: usuario._id,
        email: usuario.email,
        fullName: usuario.fullName,
        roles: usuario.roles
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao autenticar usuário', error: error.message });
  }
};

// Perfil do usuário logado
exports.getProfile = async (req, res) => {
  try {
    const usuario = await User.findById(req.user.id).select('-password');
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter perfil', error: error.message });
  }
};
