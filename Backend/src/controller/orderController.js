// Backend/src/controller/orderController.js
const { sendResponse, sendError } = require('../utils/response');
const Order = require('../model/orderModel');

// Get order details by ID
exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return sendResponse(res, {
        message: 'Order not found',
        data: null,
        status: 404
      });
    }
    return sendResponse(res, {
      message: 'Order fetched successfully',
      data: order,
      status: 200
    });
  } catch (err) {
    return sendError(res, 500, 'Failed to fetch order', err);
  }
};

// Create a new order (for both pay now and pay later)
exports.createOrder = async (req, res) => {
  try {
    const { userId, services, subServices, total, serviceType, timeSlot, address, paymentStatus } = req.body;
    const order = new Order({
      userId,
      services,
      subServices,
      total,
      serviceType,
      timeSlot,
      address,
      paymentStatus: paymentStatus || 'pending',
      createdAt: new Date()
    });
    await order.save();
    return sendResponse(res, {
      message: 'Order created successfully',
      data: order,
      status: 201
    });
  } catch (err) {
    return sendError(res, 500, 'Failed to create order', err);
  }
};
