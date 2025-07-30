const express = require('express');
const { sendResponse, sendError } = require('../../utils/response');
// Replace in-memory array with a database model
const Manufacturer = require('../../model/carDataModel/manufacturerModel'); // adjust path as needed
const CarModel = require('../../model/carDataModel/carModelListModel'); // Make sure to create this model

// Controller method to add manufacturer(s)
async function manufacturer(req, res) {
    const data = req.body;
    try {
        let result;
        if (Array.isArray(data)) {
            result = await Manufacturer.insertMany(data);
            return sendResponse(res, {
                message: 'Manufacturers added',
                data: result,
                status: 201
            });
        } else if (typeof data === 'object' && data !== null) {
            result = await Manufacturer.create(data);
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
        let result;
        if (Array.isArray(data)) {
            result = await CarModel.insertMany(data);
            return sendResponse(res, {
                message: 'Car models added',
                data: result,
                status: 201
            });
        } else if (typeof data === 'object' && data !== null) {
            result = await CarModel.create(data);
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
        const { email } = req.body;
        const User = require('../../model/userModels/userMode');
        let selectedBrandId = null;
        let selectedModelId = null;

        // Get all manufacturers with their car_models
        const allManufacturers = await Manufacturer.find().populate('car_models');
        let manufacturerList = allManufacturers.map(m => {
            let obj = { ...m.toObject() };
            obj.car_models = m.car_models || [];
            return obj;
        });

        // If email is provided and user found, set selectedBrandId and selectedModelId
        if (email) {
            const user = await User.findOne({ email });
            if (user) {
                // Use correct property names and ensure numbers are returned
                selectedBrandId = user.brand_id !== undefined ? user.brand_id : null;
                selectedModelId = user.model_id !== undefined ? user.model_id : null;
            }
        }

        return sendResponse(res, {
            message: 'Manufacturer list',
            data: {
                manufacturers: manufacturerList,
                selectedBrandId,
                selectedModelId
            },
            status: 200
        });
    } catch (err) {
        return sendResponse(res, {
            message: 'Manufacturer list',
            data: {
                manufacturers: [],
                selectedBrandId: null,
                selectedModelId: null
            },
            status: 200
        });
    }
}

module.exports = {
    manufacturer,
    carModelList,
    getAllManufacturers
    // ...existing code if you add more exports...
};