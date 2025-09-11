const express = require('express');
const router = express.Router();
const { createVendor, updateVendorProfile } = require('../controller/userController/vendorController');
const { verifyAccessToken } = require('../middleware/jwtToken');

// Public: create vendor (used by frontend registration)
router.post('/create', createVendor);

// Protected: update vendor (requires JWT)
router.put('/update', verifyAccessToken, updateVendorProfile);

module.exports = router;
