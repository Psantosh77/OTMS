const mongoose = require('mongoose');

// Address subdocument matching client payload
const AddressSchema = new mongoose.Schema({
  building_no: { type: String },
  street_no: { type: String },
  address1: { type: String },
  address2: { type: String },
  makani_number: { type: String },
  gps: {
    lat: { type: Number, default: null },
    lng: { type: Number, default: null }
  }
}, { _id: false });

// City subdocument
const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  // optional per-city location_type (can inherit top-level if empty)
  location_type: {
    type: String,
    enum: ['onsite', 'offsite', 'remote'],
    lowercase: true,
    trim: true,
    set: v => {
      // normalize empty string/undefined to null so enum doesn't reject
      if (v === undefined || v === null) return null;
      const s = String(v).trim().toLowerCase();
      return s === '' ? null : s;
    }
  },
  // Address is a single Address subdocument per city
  address: { type: AddressSchema, default: null }
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
    default: 'onsite',
    set: v => {
      if (v === undefined || v === null) return null;
      const s = String(v).trim().toLowerCase();
      return s === '' ? null : s;
    }
  },
  cities: { type: [CitySchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Location', LocationSchema);
