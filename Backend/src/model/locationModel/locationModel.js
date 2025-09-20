const mongoose = require('mongoose');

// UAE-focused Address subdocument
const AddressSchema = new mongoose.Schema({
  area: { type: String }, // e.g., Al Barsha
  district: { type: String },
  street: { type: String },
  building: { type: String },
  floor: { type: String },
  apartment: { type: String },
  po_box: { type: String },
  makani_number: { type: String },
  landmark: { type: String },
  gps: {
    lat: { type: Number },
    lng: { type: Number }
  }
}, { _id: false });

// City subdocument
const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  postal_code: { type: String, required: true },
  icon: { type: String },
  location_file: { type: String },
  makani_number: { type: String },
  // Address can be an array of Address subdocuments (to support multiple addresses per city)
  address: { type: [AddressSchema], default: [] }
}, { _id: false });

// Top-level Location schema (emirate-level)
const LocationSchema = new mongoose.Schema({
  emirate: { type: String, required: true },
  icon: { type: String },
  isActive: { type: Boolean, default: true },
  // location_type set at city level instead of emirate; however include default here for convenience
  location_type: {
    type: String,
    enum: ['onsite', 'offsite', 'remote'],
    lowercase: true,
    trim: true,
    default: 'onsite'
  },
  cities: { type: [CitySchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Location', LocationSchema);
