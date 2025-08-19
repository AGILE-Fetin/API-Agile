const mongoose = require('mongoose');

const UserActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  activityType: String,
  ipAddress: String,
  userAgent: String,
  details: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserActivity', UserActivitySchema);
