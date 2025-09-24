const mongoose = require('mongoose');

const ManufacturerSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    display_name: { type: String, required: true },
    // vehicle_type indicates the broad vehicle category for this manufacturer
    // Acceptable values: 'Passenger', 'Commercial', 'Bike'
    vehicle_type: { type: String, enum: ['Passenger', 'Commercial', 'Bike'], default: 'Passenger' },
    is_procurable: { type: Boolean, default: false },
    is_usable: { type: Boolean, default: false },
    logo_url: { type: String },
    tags: { type: [String], default: [] },
    logo_with_name: { type: String }
}, { timestamps: true });

// Virtual populate for car models
ManufacturerSchema.virtual('car_models', {
    ref: 'CarModel',
    localField: 'id',
    foreignField: 'brand_id'
});

ManufacturerSchema.set('toObject', { virtuals: true });
ManufacturerSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Manufacturer', ManufacturerSchema);
