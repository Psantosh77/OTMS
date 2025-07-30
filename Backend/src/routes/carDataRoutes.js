const express = require('express');
const router = express.Router();
const carDataController = require('../controller/carDataController/carDataController');

// Route to add manufacturer(s)
router.post('/addmanufacturer', carDataController.manufacturer);

// Route to add car model(s)
router.post('/addcarmodellist', carDataController.carModelList);

router.post('/getallmanufacturers', carDataController.getAllManufacturers);


module.exports = router;
