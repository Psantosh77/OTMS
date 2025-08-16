const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true
  },
  otp: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["customer", "vendor", "admin"],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // Document will be removed after 5 minutes
  }
}, { timestamps: false, versionKey: false });

module.exports = mongoose.model('Otp', otpSchema);