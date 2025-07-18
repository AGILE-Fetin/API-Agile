const mongoose = require('mongoose');

const TransacaoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String, // ex: "credit_purchase_coins"
  currency: String, // ex: "Real"
  amount: Number,
  relatedListingId: { type: mongoose.Schema.Types.ObjectId, default: null },
  paymentGatewayTransactionId: String,
  status: String, // ex: "Completed"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transacao', TransacaoSchema, 'dinheiro.transição');
