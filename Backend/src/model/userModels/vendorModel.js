const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  businessTradeLicense: {
    type: String,
    required: false
  },
  vatCertificate: {
    type: String,
    required: false
  },
  businessCard: {
    type: String,
    required: false
  },
  bankAccountInfo: {
    type: String,
    required: false
  },
  vendorId: {
    type: Number,
    required: true,
    unique: true
  },
  concurrency: {
    type: Date,
    default: () => new Date() // timestamp for concurrency control
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  role: {
    type: String,
    enum: ["vendor"],
    required: true,
    default: "vendor"
  },
  isActive: {
    type: Boolean,
    default: true
  },
  signupDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Vendor", vendorSchema);