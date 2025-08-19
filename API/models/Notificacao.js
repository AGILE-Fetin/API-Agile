const mongoose = require('mongoose');

const NotificacaoSchema = new mongoose.Schema({
  recipientUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String, // ex: "NEW_RATING"
  title: String,
  message: String,
  isRead: { type: Boolean, default: false },
  relatedListingId: { type: mongoose.Schema.Types.ObjectId },
  relatedUserId: { type: mongoose.Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notificacao', NotificacaoSchema, 'config.notificacao');
