const express = require('express');
const router = express.Router();
const upload = require('../../middleware/imageMulter');
const { addLocation, getLocations, updateLocationActiveStatus } = require('../../controller/master/location');

// Add new location (with image upload)

router.post('/add', upload.single('image'), addLocation);
router.post('/getlocation', getLocations);
// Update isActive status
router.post('/update-active', updateLocationActiveStatus);

module.exports = router;
