const mongoose = require('mongoose');

const servicoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  price: Number,
  location: {
    city: String,
    state: String,
    zipCode: String
  },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imagesUrls: [String],
  videoUrl: String,
  isActive: { type: Boolean, default: true },
  viewsCount: { type: Number, default: 0 },
  whatsappClickCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'admin.servicos' });

module.exports = mongoose.model('Servico', servicoSchema);
