const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  concurrency: {
    type: Date,
    default: Date.now
  },
  signupDate: {
    type: Date,
    default: Date.now
  },
  vehicleNumber: {
    type: String,
    required: true
  },
  vehicleName: {
    type: String,
    required: true
  },
  vehicleBrand: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Vendor", vendorSchema);
