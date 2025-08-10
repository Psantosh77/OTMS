// Get order details by ID
exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// Backend/src/controller/orderController.js
const Order = require('../model/orderModel');

// Create a new order (for both pay now and pay later)
exports.createOrder = async (req, res) => {
  try {
    const { userId, vendorId, services, subServices, total, serviceType, timeSlot, address, paymentStatus } = req.body;
    const order = new Order({
      userId,
      vendorId,
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
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
