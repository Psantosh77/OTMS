const express = require('express');
const { sendResponse, sendError } = require('../../utils/response');
// Replace in-memory array with a database model
const Manufacturer = require('../../model/carDataModel/manufacturerModel'); // adjust path as needed
const CarModel = require('../../model/carDataModel/carModelListModel'); // Make sure to create this model

// Controller method to add manufacturer(s)
async function manufacturer(req, res) {
    const data = req.body;
    try {
        // Normalization helper
        const allowedVehicleTypes = ['Passenger', 'Commercial', 'Bike'];
        const normalize = (d) => {
            const obj = {};
            if (d.id || d._id) {
                // prefer numeric id if provided
                const maybe = d.id || d._id;
                const n = Number(maybe);
                if (!Number.isNaN(n)) obj.id = n;
            }
            obj.display_name = d.display_name || d.name || '';
            obj.is_procurable = !!d.is_procurable;
            obj.is_usable = !!d.is_usable;
            obj.logo_url = d.logo_url || null;
            obj.logo_with_name = d.logo_with_name || d.logo_url || null;
            if (Array.isArray(d.tags)) obj.tags = d.tags;
            else if (typeof d.tags === 'string') obj.tags = d.tags.split(',').map(t=>t.trim()).filter(Boolean);
            else obj.tags = [];
            const vt = d.vehicle_type || d.vehicleType || d.type;
            obj.vehicle_type = allowedVehicleTypes.includes(vt) ? vt : 'Passenger';
            return obj;
        };

        // Find current max id to assign new ids when missing
        const currentMax = await Manufacturer.findOne().sort({ id: -1 }).select('id').lean();
        let nextId = currentMax && currentMax.id ? Number(currentMax.id) + 1 : 1;

        let result;
        if (Array.isArray(data)) {
            const toInsert = data.map(d => {
                const n = normalize(d);
                if (typeof n.id === 'undefined') {
                    n.id = nextId++;
                }
                return n;
            });
            result = await Manufacturer.insertMany(toInsert);
            return sendResponse(res, {
                message: 'Manufacturers added',
                data: result,
                status: 201
            });
        } else if (typeof data === 'object' && data !== null) {
            const toCreate = normalize(data);
            if (typeof toCreate.id === 'undefined') {
                toCreate.id = nextId++;
            }
            result = await Manufacturer.create(toCreate);
            return sendResponse(res, {
                message: 'Manufacturer added',
                data: result,
                status: 201
            });
        } else {
            return sendError(res, {
                message: 'Invalid input',
                status: 400
            });
        }
    } catch (err) {
        // Mongo duplicate key (e.g., id unique) should be readable
        if (err && err.code === 11000) {
            return sendError(res, {
                message: 'Duplicate manufacturer id',
                data: err.keyValue || err.message,
                status: 409
            });
        }
        return sendError(res, {
            message: 'Database error',
            data: err.message,
            status: 500
        });
    }
}

// Controller method to add car model(s)
async function carModelList(req, res) {
    const data = req.body;
    try {
        const allowed = ['Passenger', 'Commercial', 'Bike'];
        const normalize = (d) => {
            const obj = {};
            // id (optional) - prefer numeric
            if (d.id || d._id) {
                const maybe = d.id || d._id;
                const n = Number(maybe);
                if (!Number.isNaN(n)) obj.id = n;
            }
            // brand_id is required by schema; coerce to number when possible
            if (d.brand_id !== undefined) {
                const b = Number(d.brand_id);
                obj.brand_id = !Number.isNaN(b) ? b : d.brand_id;
            }
            obj.name = d.name || d.model || '';
            obj.display_name = d.display_name || d.name || '';
            const v = d.vehicle_type || d.vehicleType || d.type;
            const vt = v ? String(v).trim() : null;
            obj.vehicle_type = allowed.includes(vt) ? vt : 'Passenger';
            obj.is_usable = !!d.is_usable;
            obj.logo = d.logo || d.logo_url || null;
            return obj;
        };

        // Find current max id to assign new ids when missing
        const currentMax = await CarModel.findOne().sort({ id: -1 }).select('id').lean();
        let nextId = currentMax && currentMax.id ? Number(currentMax.id) + 1 : 1;

        let result;
        if (Array.isArray(data)) {
            const toInsert = data.map(d => {
                const n = normalize(d);
                if (typeof n.id === 'undefined') n.id = nextId++;
                return n;
            });
            result = await CarModel.insertMany(toInsert);
            return sendResponse(res, {
                message: 'Car models added',
                data: result,
                status: 201
            });
        } else if (typeof data === 'object' && data !== null) {
            const toCreate = normalize(data);
            if (typeof toCreate.id === 'undefined') toCreate.id = nextId++;
            result = await CarModel.create(toCreate);
            return sendResponse(res, {
                message: 'Car model added',
                data: result,
                status: 201
            });
        } else {
            return sendError(res, {
                message: 'Invalid input',
                status: 400
            });
        }
    } catch (err) {
        if (err && err.code === 11000) {
            return sendError(res, {
                message: 'Duplicate car model id',
                data: err.keyValue || err.message,
                status: 409
            });
        }
        return sendError(res, {
            message: 'Database error',
            data: err.message,
            status: 500
        });
    }
}

// API to get all manufacturers (with car models populated) and filter by user's brand_id
async function getAllManufacturers(req, res) {
    try {
            // Get all manufacturers with their car_models and return them
            const allManufacturers = await Manufacturer.find().populate('car_models');
            const manufacturerList = allManufacturers.map(m => {
                const obj = { ...m.toObject() };
                obj.car_models = m.car_models || [];
                return obj;
            });

            return sendResponse(res, {
                message: 'Manufacturer list',
                data: {
                    manufacturers: manufacturerList
                },
                status: 200
            });
    } catch (err) {
        return sendResponse(res, {
            message: 'Manufacturer list',
            data: {
                manufacturers: [],
                selectedBrandId: null,
                selectedModelId: null,
                user: null
            },
            status: 200
        });
    }
}

// API to get car models by brand_id (accepts brand_id in body or query)
async function getCarModelsByBrand(req, res) {
    try {
        const brandIdRaw = req.body && req.body.brand_id !== undefined ? req.body.brand_id : req.query.brand_id;
        if (brandIdRaw === undefined || brandIdRaw === null || brandIdRaw === '') {
            return sendError(res, { message: 'brand_id is required', status: 400 });
        }
        const brandId = Number(brandIdRaw);
        if (Number.isNaN(brandId)) {
            return sendError(res, { message: 'brand_id must be a number', status: 400 });
        }

        const models = await CarModel.find({ brand_id: brandId }).lean();

        return sendResponse(res, {
            message: 'Car models fetched',
            data: { brand_id: brandId, car_models: models },
            status: 200
        });
    } catch (err) {
        return sendError(res, { message: 'Database error', data: err.message, status: 500 });
    }
}

module.exports = {
    manufacturer,
    carModelList,
    getAllManufacturers,
    getCarModelsByBrand
    // ...existing code if you add more exports...
};