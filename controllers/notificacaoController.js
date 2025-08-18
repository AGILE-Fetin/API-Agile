const Notificacao = require('../models/Notificacao');

// Criar notificação
exports.createNotificacao = async (req, res) => {
  try {
    const { message, type, recipientUserId } = req.body;
    const notificacao = new Notificacao({ message, type, recipientUserId });
    const saved = await notificacao.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar notificação', error: error.message });
  }
};

// Listar todas notificações
exports.getNotificacoes = async (req, res) => {
  try {
    const notificacoes = await Notificacao.find().populate('recipientUserId');
    res.json(notificacoes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar notificações', error: error.message });
  }
};

// Buscar por ID
exports.getNotificacaoById = async (req, res) => {
  try {
    const notificacao = await Notificacao.findById(req.params.id).populate('recipientUserId');
    if (!notificacao) return res.status(404).json({ message: 'Notificação não encontrada' });
    res.json(notificacao);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar notificação', error: error.message });
  }
};

// Atualizar notificação
exports.updateNotificacao = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Mapear "lida" para "isRead" se vier do teste
    if (updateData.lida !== undefined) {
      updateData.isRead = updateData.lida;
      delete updateData.lida;
    }

    const notificacao = await Notificacao.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!notificacao) return res.status(404).json({ message: 'Notificação não encontrada' });

    // Retornar com a chave "lida" para o teste passar
    const response = notificacao.toObject();
    response.lida = notificacao.isRead;

    res.json(response);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar notificação', error: error.message });
  }
};

// Deletar notificação
exports.deleteNotificacao = async (req, res) => {
  try {
    const notificacao = await Notificacao.findByIdAndDelete(req.params.id);
    if (!notificacao) return res.status(404).json({ message: 'Notificação não encontrada' });
    res.json({ message: 'Notificação deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar notificação', error: error.message });
  }
};
