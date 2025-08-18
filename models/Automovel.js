const mongoose = require('mongoose');

const AutomovelSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 200 },
  description: { type: String, required: true, maxlength: 2000 },
  imagesUrls: [String],
  videoUrl: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listingType: { type: String, required: true },
  status: { type: String, required: true },
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
