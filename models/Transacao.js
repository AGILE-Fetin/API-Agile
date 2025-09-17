const mongoose = require('mongoose');

const TransacaoSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, 'ID do usuário é obrigatório']
  },
  type: { 
    type: String,
    required: [true, 'Tipo da transação é obrigatório'],
    enum: ['pix', 'credit_card', 'debit_card', 'bank_transfer', 'wallet']
  },
  currency: { 
    type: String,
    required: [true, 'Moeda é obrigatória'],
    enum: ['BRL', 'USD', 'EUR'],
    default: 'BRL'
  },
  amount: {
    type: Number,
    required: [true, 'Valor é obrigatório'],
    min: [0.01, 'Valor deve ser maior que zero']
  },
  relatedListingId: { 
    type: mongoose.Schema.Types.ObjectId, 
    default: null 
  },
  paymentGatewayTransactionId: {
    type: String,
    maxlength: [100, 'ID do gateway não pode exceder 100 caracteres']
  },
  status: { 
    type: String,
    required: [true, 'Status é obrigatório'],
    enum: ['pending', 'completed', 'failed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transacao', TransacaoSchema, 'transacoes');
