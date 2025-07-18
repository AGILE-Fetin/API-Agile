const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  street: String,
  number: String,
  complement: String,
  neighborhood: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
}, { _id: false });

const SocialLoginSchema = new mongoose.Schema({
  provider: String,
  providerId: String,
}, { _id: false });

const PortfolioItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  videoUrl: String,
}, { _id: false });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  roles: [String],
  fullName: String,
  profilePictureUrl: String,
  phone: String,
  dateOfBirth: Date,
  gender: String,
  address: AddressSchema,
  socialLogins: [SocialLoginSchema],
  passwordResetToken: String,
  passwordResetExpires: Date,
  twoFactorAuthSecret: String,
  isTwoFactorAuthEnabled: Boolean,
  verificationStatus: String,
  activityLog: [mongoose.Schema.Types.Mixed], // Pode ser adaptado conforme necessidade
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  sellerInfo: {
    documentFrontUrl: String,
    documentBackUrl: String,
    facePhotoUrl: String,
    companyName: String,
    tradingName: String,
    cnpj: String,
    partnersCpfs: [String],
    averageRating: Number,
    totalRatings: Number,
  },

  serviceProviderInfo: {
    cnpjOrCpf: String,
    serviceCategories: [String],
    portfolio: [PortfolioItemSchema],
    geographicCoverage: [String],
    openingHours: String,
    averageRating: Number,
    totalRatings: Number,
  },
});

module.exports = mongoose.model('User', UserSchema, 'admin.users');

