const Imovel = require('../models/Imovel');

exports.criarImovel = async (req, res) => {
  try {
    const novo = new Imovel(req.body);
    const salvo = await novo.save();
    res.status(201).json(salvo);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar imóvel', error: error.message });
  }
};

exports.listarImoveis = async (req, res) => {
  try {
    const imoveis = await Imovel.find();
    res.json(imoveis);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar imóveis', error: error.message });
  }
};

exports.buscarImovelPorId = async (req, res) => {
  try {
    const imovel = await Imovel.findById(req.params.id);
    if (!imovel) return res.status(404).json({ message: 'Imóvel não encontrado' });
    res.json(imovel);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar imóvel', error: error.message });
  }
};

exports.atualizarImovel = async (req, res) => {
  try {
    const atualizado = await Imovel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ message: 'Imóvel não encontrado' });
    res.json(atualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar imóvel', error: error.message });
  }
};

exports.deletarImovel = async (req, res) => {
  try {
    const removido = await Imovel.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ message: 'Imóvel não encontrado' });
    res.json({ message: 'Imóvel removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar imóvel', error: error.message });
  }
};
