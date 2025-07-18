const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  fullAddress: String,
  city: String,
  state: String,
  zipCode: String,
}, { _id: false });

const ServiceDetailsSchema = new mongoose.Schema({
  serviceCategory: String,
  averagePrice: String,
  estimatedExecutionTime: String,
  servicePortfolioImages: [String],
}, { _id: false });

const PrestadorSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imagesUrls: [String],
  videoUrl: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  listingType: String,
  status: String,
  location: LocationSchema,
  viewsCount: { type: Number, default: 0 },
  whatsappClickCount: { type: Number, default: 0 },
  isPromoted: { type: Boolean, default: false },
  promotionEndDate: { type: Date, default: null },
  expiresAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  serviceDetails: ServiceDetailsSchema,
});

module.exports = mongoose.model('Prestador', PrestadorSchema);
