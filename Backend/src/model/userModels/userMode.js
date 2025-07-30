const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  brand: {
    type: String,
    required: true
  },
  brand_id: {
    type: Number,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  model_id: {
    type: Number,
    required: true
   
  },
  mobileNo: {
    type: String,
    required: false,
    
  },
  password: {
    type: String,
    required: false
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
  }
}, {
  timestamps: true
});



module.exports = mongoose.model("User", userSchema);
