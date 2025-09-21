const express = require('express');
const router = express.Router();

const locationController = require('../../controller/master/location');

// Create a new location (accepts multipart/form-data with optional 'icon' file)
router.post('/add', locationController.addLocation);

// List locations
router.post('/list', locationController.listLocations);



// Search by payload (POST body) for { type: 'onsite' }
router.post('/search', locationController.searchByType);

module.exports = router;
