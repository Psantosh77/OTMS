const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
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
  mobileNo: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  concurrency: {
    type: Date,
    default: () => new Date() // timestamp for concurrency control
  },
  signupDate: {
    type: Date,
    default: Date.now
  },
  vehicleNo: {
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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
