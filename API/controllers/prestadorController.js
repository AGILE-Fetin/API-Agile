const Prestador = require('../models/Prestador');

// Criar prestador
exports.createPrestador = async (req, res) => {
  try {
    const prestador = new Prestador({
      ...req.body,
      postedBy: req.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await prestador.save();
    res.status(201).json(prestador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todos prestadores
exports.getAllPrestadores = async (req, res) => {
  try {
    const prestadores = await Prestador.find().populate('postedBy', 'fullName email');
    res.json(prestadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter prestador por ID
exports.getPrestadorById = async (req, res) => {
  try {
    const prestador = await Prestador.findById(req.params.id).populate('postedBy', 'fullName email');
    if (!prestador) {
      return res.status(404).json({ error: 'Prestador não encontrado' });
    }
    res.json(prestador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar prestador
exports.updatePrestador = async (req, res) => {
  try {
    const prestador = await Prestador.findById(req.params.id);

    if (!prestador) {
      return res.status(404).json({ error: 'Prestador não encontrado' });
    }

    // Verifica se postedBy existe antes de usar toString()
    if (!prestador.postedBy || prestador.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const updatedPrestador = await Prestador.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    res.json(updatedPrestador);
  } catch (error) {
    console.error('Erro updatePrestador:', error);
    res.status(400).json({ error: error.message });
  }
};

// Deletar prestador
exports.deletePrestador = async (req, res) => {
  try {
    const prestador = await Prestador.findById(req.params.id);

    if (!prestador) {
      return res.status(404).json({ error: 'Prestador não encontrado' });
    }

    // Verifica se postedBy existe antes de usar toString()
    if (!prestador.postedBy || prestador.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    await Prestador.findByIdAndDelete(req.params.id);
    res.json({ message: 'Prestador deletado com sucesso' });
  } catch (error) {
    console.error('Erro deletePrestador:', error);
    res.status(500).json({ error: error.message });
  }
};
