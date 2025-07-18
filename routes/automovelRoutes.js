const express = require('express');
const router = express.Router();
const Automovel = require('../models/Automovel');
const autenticarToken = require('../middlewares/authMiddleware');

// 🔓 Pública - Listar todos os automóveis
router.get('/', async (req, res) => {
  try {
    const autos = await Automovel.find().populate('postedBy', 'fullName email');
    res.json(autos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar automóveis', erro: err.message });
  }
});

// 🔓 Pública - Detalhes de um automóvel
router.get('/:id', async (req, res) => {
  try {
    const auto = await Automovel.findById(req.params.id).populate('postedBy', 'fullName email');
    if (!auto) return res.status(404).json({ message: 'Automóvel não encontrado' });
    res.json(auto);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar automóvel', erro: err.message });
  }
});

// 🔐 Privada - Criar novo automóvel
router.post('/', autenticarToken, async (req, res) => {
  try {
    const novo = new Automovel({ ...req.body, postedBy: req.usuario.id });
    await novo.save();
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar automóvel', erro: err.message });
  }
});

// 🔐 Privada - Atualizar automóvel
router.put('/:id', autenticarToken, async (req, res) => {
  try {
    const atualizado = await Automovel.findOneAndUpdate(
      { _id: req.params.id, postedBy: req.usuario.id },
      req.body,
      { new: true }
    );
    if (!atualizado) return res.status(404).json({ message: 'Automóvel não encontrado ou sem permissão' });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar', erro: err.message });
  }
});

// 🔐 Privada - Deletar automóvel
router.delete('/:id', autenticarToken, async (req, res) => {
  try {
    const removido = await Automovel.findOneAndDelete({ _id: req.params.id, postedBy: req.usuario.id });
    if (!removido) return res.status(404).json({ message: 'Automóvel não encontrado ou sem permissão' });
    res.json({ message: 'Automóvel removido' });
  } catch (err) {
    res.status(400).json({ message: 'Erro ao remover', erro: err.message });
  }
});

module.exports = router;
