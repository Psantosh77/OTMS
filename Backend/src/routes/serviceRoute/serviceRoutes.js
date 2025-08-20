const express = require('express');
const router = express.Router();
const serviceController = require('../../controller/serviceController/serviceController');


// Get all car services
router.post('/', serviceController.getCarServices);

// Update service price (admin only)
router.post('/price',  serviceController.updateServicePrice);

// Update subService price (admin only)
router.post('/subservice/price',  serviceController.updateSubServicePrice);

// Update service discount (admin only)
router.post('/discount',  serviceController.updateServiceDiscount);

// Add or update coupon offer (admin only)
router.post('/coupon', serviceController.addOrUpdateCouponOffer);

module.exports = router;
