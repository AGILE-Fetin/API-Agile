const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Dados fictícios (mock)
const produtosFake = [
  { id: 1, nome: "Apartamento em SP", preco: 320000 },
  { id: 2, nome: "Carro - Corolla", preco: 78000 },
];

// GET /api/produtos
router.get('/', authMiddleware, (req, res) => {
  try {
    res.json(produtosFake);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
