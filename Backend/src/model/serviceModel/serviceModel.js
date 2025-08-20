const mongoose = require('mongoose');

const subServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
});

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  subServices: [subServiceSchema],
  image: { type: String },
  active: { type: Boolean, default: true },
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

module.exports = mongoose.model('Service', serviceSchema);
