const mongoose = require("mongoose");

const CommonUsers = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  isVerified: {
    type: Boolean,
    default: false
}

}, {
  timestamps: true
});

module.exports = mongoose.model("CommonUser", CommonUsers);