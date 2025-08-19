const User = require('../models/User');

// Atualizar usuário
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id, _id: req.user.id },
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado ou acesso negado' });
    }

    return res.json(updatedUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Deletar usuário
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      _id: req.params.id,
      _id: req.user.id
    });
    
    if (!deletedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado ou acesso negado' });
    }
    
    return res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
