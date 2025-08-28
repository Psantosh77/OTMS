const mongoose = require('mongoose');

const subServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
});

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: false},
  subServices: [subServiceSchema],
  image: { type: String },
  active: { type: Boolean, default: true },
  showInHome: { type: Boolean, default: false },
  showInService: { type: Boolean, default: false },
  couponOffers: [{
    code: { type: String, required: true },
    discountType: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
    value: { type: Number, required: true },
    isActive: { type: Boolean, default: true }
  }],
  discount: {
    type: Number,
    default: 0 // percentage discount
  }
});

// Auto-calculate price from subServices before saving
serviceSchema.pre('save', function (next) {
  if (Array.isArray(this.subServices) && this.subServices.length > 0) {
    this.price = this.subServices.reduce((sum, s) => sum + (s.price || 0), 0);
  }
  next();
});

module.exports = mongoose.model('Service', serviceSchema);
