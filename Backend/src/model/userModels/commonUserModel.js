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
},
role:{
  type: String,
  enum: ["customer", "vendor", "admin"],
  default: "customer"
}

}, {
  timestamps: true
});

module.exports = mongoose.model("CommonUser", CommonUsers);