const Estrela = require('../models/Estrela');

// Criar avaliação
exports.createEstrela = async (req, res) => {
  try {
    const { produtoId, produtoModelo, nota, comentario } = req.body;

    const novaEstrela = new Estrela({
      listingId: produtoId,
      evaluationType: produtoModelo,
      ratingValue: nota,
      comment: comentario,
      evaluatorUserId: req.user.id,
      createdAt: new Date(),
    });

    await novaEstrela.save();

    // Retorna também "nota" para o teste passar
    return res.status(201).json({
      ...novaEstrela.toObject(),
      nota: novaEstrela.ratingValue
    });
  } catch (error) {
    console.error('Erro createEstrela:', error);
    return res.status(400).json({ error: error.message });
  }
};

// Listar todas avaliações
exports.getAllEstrelas = async (req, res) => {
  try {
    const estrelas = await Estrela.find();
    return res.json(estrelas.map(e => ({
      ...e.toObject(),
      nota: e.ratingValue
    })));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Buscar avaliação por ID
exports.getEstrelaById = async (req, res) => {
  try {
    const estrela = await Estrela.findById(req.params.id);
    if (!estrela) return res.status(404).json({ error: 'Avaliação não encontrada' });

    return res.json({
      ...estrela.toObject(),
      nota: estrela.ratingValue
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Atualizar avaliação
exports.updateEstrela = async (req, res) => {
  try {
    const estrela = await Estrela.findById(req.params.id);
    if (!estrela) return res.status(404).json({ error: 'Avaliação não encontrada' });

    if (estrela.evaluatorUserId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const updateData = { updatedAt: new Date() };

    if (req.body.nota !== undefined) updateData.ratingValue = req.body.nota;
    if (req.body.comentario !== undefined) updateData.comment = req.body.comentario;

    const updatedEstrela = await Estrela.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    return res.json({
      ...updatedEstrela.toObject(),
      nota: updatedEstrela.ratingValue
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Deletar avaliação
exports.deleteEstrela = async (req, res) => {
  try {
    const estrela = await Estrela.findById(req.params.id);
    if (!estrela) return res.status(404).json({ error: 'Avaliação não encontrada' });

    if (estrela.evaluatorUserId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    await Estrela.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Avaliação deletada com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
