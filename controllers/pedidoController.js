const Pedido = require('../models/Pedido'); // Modelo de Pedido

// Criar novo pedido
exports.createPedido = async (req, res) => {
  try {
    const pedidoData = {
      ...req.body,
      userId: req.user.id
    };
    const pedido = new Pedido(pedidoData);
    const savedPedido = await pedido.save();
    res.status(201).json(savedPedido);
  } catch (error) {
    console.error('❌ Erro ao criar pedido:', error);
    res.status(400).json({ message: 'Erro ao criar pedido', error: error.message });
  }
};

// Listar todos pedidos (pode ser filtrado por usuário, etc)
exports.getPedidos = async (req, res) => {
  try {
    const filter = {};
    if (req.query.userId) filter.userId = req.query.userId;
    const pedidos = await Pedido.find(filter).populate('userId', 'fullName email').populate({
  path: 'items.productId',
  select: 'title price',
  strictPopulate: false, // evita erro se o modelo não existir no momento
  options: { lean: true }
  });

    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedidos', error: error.message });
  }
};

// Buscar pedido por id
exports.getPedidoById = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate('userId', 'fullName email').populate('items.productId', 'title price');
    if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedido', error: error.message });
  }
};

// Atualizar pedido por id
exports.updatePedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.json(pedido);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar pedido', error: error.message });
  }
};

// Deletar pedido por id
exports.deletePedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.json({ message: 'Pedido deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar pedido', error: error.message });
  }
};
