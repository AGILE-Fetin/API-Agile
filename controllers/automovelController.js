const Automovel = require('../models/Automovel');

// Listar todos
exports.getAll = async (req, res) => {
  try {
    const automoveis = await Automovel.find();
    res.json(automoveis);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar automóveis', erro: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const allowedFields = ['title', 'description', 'imagesUrls', 'price', 'year', 'mileage', 'color', 'brand', 'model', 'fuelType', 'transmission', 'condition'];
    const automovelData = { postedBy: req.user.id };
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        automovelData[field] = req.body[field];
      }
    });
    
    const novo = new Automovel(automovelData);
    const salvo = await novo.save();

    res.status(201).json(salvo);
  } catch (err) {
    console.error('❌ Erro ao criar automóvel:', err);
    res.status(400).json({ message: 'Erro ao criar automóvel', erro: err.message });
  }
};

// Buscar por ID
exports.getById = async (req, res) => {
  try {
    const automovel = await Automovel.findById(req.params.id);
    if (!automovel) return res.status(404).json({ message: 'Automóvel não encontrado' });
    res.json(automovel);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar automóvel', erro: err.message });
  }
};

// Atualizar
exports.update = async (req, res) => {
  try {
    const allowedFields = ['title', 'description', 'imagesUrls', 'price', 'year', 'mileage', 'color', 'brand', 'model', 'fuelType', 'transmission', 'condition'];
    const updateData = {};
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });
    
    const atualizado = await Automovel.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!atualizado) return res.status(404).json({ message: 'Automóvel não encontrado' });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar', erro: err.message });
  }
};

// Remover
exports.remove = async (req, res) => {
  try {
    const removido = await Automovel.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ message: 'Automóvel não encontrado' });
    res.json({ message: 'Automóvel removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover', erro: err.message });
  }
};
