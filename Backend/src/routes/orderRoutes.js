// Backend/src/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');


// Create order (pay now or pay later)
router.post('/create', orderController.createOrder);

// Get order details by ID
router.get('/details/:orderId', orderController.getOrderDetails);

module.exports = router;
