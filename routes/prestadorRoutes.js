const express = require('express');
const router = express.Router();
const prestadorController = require('../controllers/prestadorController');
const authMiddleware = require('../middlewares/authMiddleware');
const csrfProtection = require('../middlewares/csrfMiddleware');

// Rotas públicas — só GET
router.get('/', prestadorController.getAllPrestadores);
router.get('/:id', prestadorController.getPrestadorById);

// Rotas protegidas — POST, PUT, DELETE com autenticação
router.post('/', authMiddleware, csrfProtection.validateToken, prestadorController.createPrestador);
router.put('/:id', authMiddleware, csrfProtection.validateToken, prestadorController.updatePrestador);
router.delete('/:id', authMiddleware, csrfProtection.validateToken, prestadorController.deletePrestador);

module.exports = router;
