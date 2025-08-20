const Service = require('../../model/serviceModel/serviceModel');
const { sendResponse, sendError } = require('../../utils/response');

// Get all services with dynamic prices
const getCarServices = async (req, res) => {
  try {
    const services = await Service.find({ active: true }).lean();
    return sendResponse(res, {
      message: 'Car services fetched successfully',
      data: services,
      status: 200
    });
  } catch (error) {
    return sendError(res, 500, 'Failed to fetch car services', error);
  }
};

// Update service price (admin only)
const updateServicePrice = async (req, res) => {
  try {
    const { serviceId, price } = req.body;
    if (!serviceId || typeof price !== 'number') {
      return sendError(res, 400, 'serviceId and price are required');
    }
    const service = await Service.findByIdAndUpdate(serviceId, { price }, { new: true });
    if (!service) return sendError(res, 404, 'Service not found');
    return sendResponse(res, {
      message: 'Service price updated',
      data: service,
      status: 200
    });
  } catch (error) {
    return sendError(res, 500, 'Failed to update service price', error);
  }
};

// Update subService price (admin only)
const updateSubServicePrice = async (req, res) => {
  try {
    const { serviceId, subServiceId, price } = req.body;
    if (!serviceId || !subServiceId || typeof price !== 'number') {
      return sendError(res, 400, 'serviceId, subServiceId and price are required');
    }
    const service = await Service.findById(serviceId);
    if (!service) return sendError(res, 404, 'Service not found');
    const subService = service.subServices.id(subServiceId);
    if (!subService) return sendError(res, 404, 'SubService not found');
    subService.price = price;
    await service.save();
    return sendResponse(res, {
      message: 'SubService price updated',
      data: subService,
      status: 200
    });
  } catch (error) {
    return sendError(res, 500, 'Failed to update subService price', error);
  }
};

// Update service discount (admin only)
const updateServiceDiscount = async (req, res) => {
  try {
    const { serviceId, discount } = req.body;
    if (!serviceId || typeof discount !== 'number') {
      return sendError(res, 400, 'serviceId and discount are required');
    }
    const service = await Service.findByIdAndUpdate(serviceId, { discount }, { new: true });
    if (!service) return sendError(res, 404, 'Service not found');
    return sendResponse(res, {
      message: 'Service discount updated',
      data: service,
      status: 200
    });
  } catch (error) {
    return sendError(res, 500, 'Failed to update service discount', error);
  }
};

// Add or update coupon offer (admin only)
const addOrUpdateCouponOffer = async (req, res) => {
  try {
    const { serviceId, coupon } = req.body;
    if (!serviceId || !coupon || !coupon.code || typeof coupon.value !== 'number') {
      return sendError(res, 400, 'serviceId and valid coupon are required');
    }
    const service = await Service.findById(serviceId);
    if (!service) return sendError(res, 404, 'Service not found');
    // Check if coupon exists
    const idx = service.couponOffers.findIndex(c => c.code === coupon.code);
    if (idx > -1) {
      service.couponOffers[idx] = coupon;
    } else {
      service.couponOffers.push(coupon);
    }
    await service.save();
    return sendResponse(res, {
      message: 'Coupon offer updated',
      data: service.couponOffers,
      status: 200
    });
  } catch (error) {
    return sendError(res, 500, 'Failed to update coupon offer', error);
  }
};

module.exports = {
  getCarServices,
  updateServicePrice,
  updateSubServicePrice,
  updateServiceDiscount,
  addOrUpdateCouponOffer
};
