const express = require('express');
const router = express.Router();
const prestadorController = require('../controllers/prestadorController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas — só GET
router.get('/', prestadorController.getAllPrestadores);
router.get('/:id', prestadorController.getPrestadorById);

// Rotas protegidas — POST, PUT, DELETE com autenticação
router.post('/', authMiddleware, prestadorController.createPrestador);
router.put('/:id', authMiddleware, prestadorController.updatePrestador);
router.delete('/:id', authMiddleware, prestadorController.deletePrestador);

module.exports = router;
