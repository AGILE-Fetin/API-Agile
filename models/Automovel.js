const mongoose = require('mongoose');

const AutomovelSchema = new mongoose.Schema({
  title: String,
  description: String,
  imagesUrls: [String],
  videoUrl: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  listingType: String,
  status: String,
  location: {
    fullAddress: String,
    city: String,
    state: String,
    zipCode: String
  },
  viewsCount: Number,
  whatsappClickCount: Number,
  isPromoted: Boolean,
  promotionEndDate: Date,
  expiresAt: Date,
  automobileDetails: {
    make: String,
    model: String,
    yearManufacture: Number,
    yearModel: Number,
    mileage: Number,
    fuelType: String,
    transmission: String,
    color: String,
    doors: Number,
    plateEnding: String,
    options: [String],
    conservationState: String,
    price: Number,
    rentPrice: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Automovel', AutomovelSchema, 'admin.automoveis');
