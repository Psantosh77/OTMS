const mongoose = require('mongoose');
// Try to load native bcrypt, fallback to bcryptjs if not installed (avoids crash on Windows dev machines)
let bcrypt;
try {
  bcrypt = require('bcrypt');
} catch (e) {
  bcrypt = require('bcryptjs');
}

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

adminSchema.pre('save', function (next) {
  try {
    if (!this.isModified('password')) return next();
    // Use synchronous API to be compatible across bcrypt and bcryptjs
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

adminSchema.methods.comparePassword = function (candidatePassword) {
  try {
    // returns boolean
    return bcrypt.compareSync(candidatePassword, this.password);
  } catch (err) {
    // On error, return false
    return false;
  }
};

module.exports = mongoose.model('Admin', adminSchema);
