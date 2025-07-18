const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  fullAddress: String,
  city: String,
  state: String,
  zipCode: String
}, { _id: false });

const imovelDetailsSchema = new mongoose.Schema({
  type: String, // ex: apartamento, casa, terreno, etc
  bedrooms: Number,
  bathrooms: Number,
  parkingSpaces: Number,
  area: Number, // em m²
  price: Number,
  rentPrice: Number,
  condoFee: Number,
  iptu: Number,
  furnished: Boolean,
  petsAllowed: Boolean,
  description: String
}, { _id: false });

const imovelSchema = new mongoose.Schema({
  title: String,
  description: String,
  imagesUrls: [String],
  videoUrl: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  listingType: String,
  status: String,
  location: locationSchema,
  viewsCount: Number,
  whatsappClickCount: Number,
  isPromoted: Boolean,
  promotionEndDate: Date,
  expiresAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  imovelDetails: imovelDetailsSchema
}, { collection: 'admin.imoveis' });

module.exports = mongoose.model('Imovel', imovelSchema);
