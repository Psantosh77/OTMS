// Backend/src/model/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  vendorId: { type: String, required: true },
  services: [String],
  subServices: [String],
  total: { type: Number, required: true },
  serviceType: { type: String, required: true },
  timeSlot: { type: String, required: true },
  address: { type: String, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
