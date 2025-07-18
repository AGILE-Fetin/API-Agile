const Servico = require('../models/Servico');

exports.criarServico = async (req, res) => {
  try {
    const novo = new Servico(req.body);
    const salvo = await novo.save();
    res.status(201).json(salvo);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar serviço', error: error.message });
  }
};

exports.listarServicos = async (req, res) => {
  try {
    const servicos = await Servico.find();
    res.json(servicos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar serviços', error: error.message });
  }
};

exports.buscarServicoPorId = async (req, res) => {
  try {
    const servico = await Servico.findById(req.params.id);
    if (!servico) return res.status(404).json({ message: 'Serviço não encontrado' });
    res.json(servico);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar serviço', error: error.message });
  }
};

exports.atualizarServico = async (req, res) => {
  try {
    const atualizado = await Servico.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ message: 'Serviço não encontrado' });
    res.json(atualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar serviço', error: error.message });
  }
};

exports.deletarServico = async (req, res) => {
  try {
    const removido = await Servico.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ message: 'Serviço não encontrado' });
    res.json({ message: 'Serviço removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar serviço', error: error.message });
  }
};
