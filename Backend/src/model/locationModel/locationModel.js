const mongoose = require('mongoose');


const locationSchema = new mongoose.Schema({
  locationName: { type: String, required: true },
  locationCode: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  stateName: { type: String, required: true },
  pinNo: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // Cloudinary URL
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);
