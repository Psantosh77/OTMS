const mongoose = require('mongoose');

const CarModelSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    brand_id: { type: Number, required: true }, // references Manufacturer.id
    name: { type: String, required: true },
    display_name: { type: String, required: true },
    is_usable: { type: Boolean, default: false },
    logo: { type: String },
    model_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Manufacturer' } // for population if needed
}, { timestamps: true });

module.exports = mongoose.model('CarModel', CarModelSchema);
