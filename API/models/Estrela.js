const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const EstrelaSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId },
  evaluatorUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  evaluatedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  evaluationType: String, // ex: "BuyerEvaluatingSeller"
  ratingValue: Number,
  comment: String,
  reply: ReplySchema,
  isReport: { type: Boolean, default: false },
  reportDetails: { type: mongoose.Schema.Types.Mixed, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Estrela', EstrelaSchema, 'config.estrelas');
