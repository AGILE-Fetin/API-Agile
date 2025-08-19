const Transacao = require('../models/Transacao');

// Criar transação
exports.createTransacao = async (req, res) => {
  try {
    const transacao = new Transacao({
      ...req.body,
      userId: req.user.id,
      createdAt: new Date(),
    });

    await transacao.save();
    res.status(201).json(transacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todas transações do usuário logado
exports.getAllTransacoes = async (req, res) => {
  try {
    const transacoes = await Transacao.find({ userId: req.user.id });
    res.json(transacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar transação por ID
exports.getTransacaoById = async (req, res) => {
  try {
    const transacao = await Transacao.findById(req.params.id);
    if (!transacao) return res.status(404).json({ error: 'Transação não encontrada' });

    // Só pode acessar se for dono
    if (transacao.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    res.json(transacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar transação
exports.updateTransacao = async (req, res) => {
  try {
    const updatedTransacao = await Transacao.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedTransacao) {
      return res.status(404).json({ error: 'Transação não encontrada ou acesso negado' });
    }

    res.json(updatedTransacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar transação
exports.deleteTransacao = async (req, res) => {
  try {
    const deletedTransacao = await Transacao.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deletedTransacao) {
      return res.status(404).json({ error: 'Transação não encontrada ou acesso negado' });
    }

    res.json({ message: 'Transação deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
