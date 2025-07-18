const express = require('express');
const router = express.Router();

// Dados fictícios (mock)
const produtosFake = [
  { id: 1, nome: "Apartamento em SP", preco: 320000 },
  { id: 2, nome: "Carro - Corolla", preco: 78000 },
];

// GET /api/produtos
router.get('/', (req, res) => {
  res.json(produtosFake); // retorna os dados falsos
});

module.exports = router;
