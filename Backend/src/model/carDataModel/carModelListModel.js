const mongoose = require('mongoose');

const CarModelSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    brand_id: { type: Number, required: true }, // references Manufacturer.id
    name: { type: String, required: true },
    display_name: { type: String, required: true },
    // vehicle_type: Passenger, Commercial, Bike
    vehicle_type: { type: String, enum: ['Passenger', 'Commercial', 'Bike'], default: 'Passenger', trim: true },
    is_usable: { type: Boolean, default: false },
    logo: { type: String },
    model_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Manufacturer' } // for population if needed
}, { timestamps: true });

module.exports = mongoose.model('CarModel', CarModelSchema);
