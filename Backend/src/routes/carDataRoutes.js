const express = require('express');
const router = express.Router();
const carDataController = require('../controller/carDataController/carDataController');

// Route to add manufacturer(s)
router.post('/addmanufacturer', carDataController.manufacturer);

// Route to add car model(s)
router.post('/addcarmodellist', carDataController.carModelList);

router.post('/getallmanufacturers', carDataController.getAllManufacturers);
// Route to get car models by brand_id (accepts brand_id in body or query)
router.post('/getcarmodelsbybrand', carDataController.getCarModelsByBrand);


module.exports = router;
