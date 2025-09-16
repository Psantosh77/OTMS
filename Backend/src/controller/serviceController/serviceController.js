// Update active status for a service or subService (soft delete/undelete)
const updateServiceActive = async (req, res) => {
  try {
    const { serviceId, active, subServiceId } = req.body;
    if (!serviceId || typeof active !== 'boolean') {
      return sendError(res, 400, 'serviceId and active(boolean) are required');
    }
    if (subServiceId) {
      // Update subService active status
      const service = await Service.findById(serviceId);
      if (!service) return sendError(res, 404, 'Service not found');
      const subService = service.subServices.id(subServiceId);
      if (!subService) return sendError(res, 404, 'SubService not found');
      subService.isActive = active;
      await service.save();
      return sendResponse(res, {
        message: `SubService ${active ? 'restored' : 'deleted'} successfully`,
        data: subService,
        status: 200
      });
    } else {
      // Update service active status
      const service = await Service.findByIdAndUpdate(serviceId, { active }, { new: true });
      if (!service) return sendError(res, 404, 'Service not found');
      return sendResponse(res, {
        message: `Service ${active ? 'restored' : 'deleted'} successfully`,
        data: service,
        status: 200
      });
    }
  } catch (error) {
    return sendError(res, 500, 'Failed to update active status', error);
  }
};
// Get all services (active and inactive)
const Service = require('../../model/serviceModel/serviceModel');
const { sendResponse, sendError } = require('../../utils/response');
const { uploadToCloudinary } = require('../../middleware/cloudaniry');

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({}).lean();
    return sendResponse(res, {
      message: 'All services fetched successfully',
      data: services,
      status: 200
    });
  } catch (error) {
    return sendError(res, 500, 'Failed to fetch all services', error);
  }
};

// Get only active services
const getActiveServices = async (req, res) => {
  try {
    const services = await Service.find({ active: true }).lean();
    return sendResponse(res, {
      message: 'Active services fetched successfully',
      data: services,
      status: 200
    });
  } catch (error) {
    return sendError(res, 500, 'Failed to fetch active services', error);
  }
};
// Add or update a service
const addService = async (req, res) => {
  try {
    // Support both JSON body and multipart/form-data where fields are strings
    const body = req.body || {};
    const serviceId = body.serviceId || body.id || body.serviceId;
    const name = body.name;
    const description = body.description || '';
    // price may come as string when sent via FormData
    const price = body.price != null ? Number(body.price) : undefined;
    // image may be provided as a URL or uploaded file (req.file)
    let image = body.image || '';
    if (req.file && req.file.path) {
      // upload file to cloudinary and use returned secure URL
      try {
        const result = await uploadToCloudinary(req.file.path);
        image = result?.secure_url || req.file.path;
      } catch (err) {
        // fallback to local path if upload fails
        image = req.file.path;
      }
    }

  // parse booleans and numbers from strings
    const active = body.active !== undefined ? (String(body.active) === 'true' || body.active === true) : true;
    const discount = body.discount != null ? Number(body.discount) : 0;
    const showInHome = body.showInHome !== undefined ? (String(body.showInHome) === 'true' || body.showInHome === true) : false;
    const showInService = body.showInService !== undefined ? (String(body.showInService) === 'true' || body.showInService === true) : false;
  const serviceType = body.serviceType ? String(body.serviceType).toLowerCase() : 'garage';

    // Parse arrays which may be JSON strings when coming from FormData
    let subServices = [];
    try {
      if (body.subServices) {
        subServices = typeof body.subServices === 'string' ? JSON.parse(body.subServices) : body.subServices;
      }
    } catch (e) {
      // ignore parse error, default to empty
      subServices = [];
    }

    let couponOffers = [];
    try {
      if (body.couponOffers) {
        couponOffers = typeof body.couponOffers === 'string' ? JSON.parse(body.couponOffers) : body.couponOffers;
      }
    } catch (e) {
      couponOffers = [];
    }

    if (!name || price === undefined || Number.isNaN(price)) {
      return sendError(res, 400, 'Service name and numeric price are required');
    }

    const serviceData = {
      name,
      description,
      price,
      image,
      active: active !== undefined ? active : true,
      discount: discount || 0,
      subServices: subServices || [],
      couponOffers: couponOffers || [],
  serviceType,
      showInHome: showInHome !== undefined ? showInHome : false,
      showInService: showInService !== undefined ? showInService : false
    };

    let service;
    if (serviceId) {
      service = await Service.findByIdAndUpdate(serviceId, serviceData, { new: true });
      if (!service) return sendError(res, 404, 'Service not found');
      return sendResponse(res, {
        message: 'Service updated successfully',
        data: service,
        status: 200
      });
    } else {
      service = new Service(serviceData);
      await service.save();
      return sendResponse(res, {
        message: 'Service added successfully',
        data: service,
        status: 201
      });
    }
  } catch (error) {
    return sendError(res, 500, 'Failed to add/update service', error);
  }
};

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
  addOrUpdateCouponOffer,
  addService,
  getAllServices,
  getActiveServices,
  updateServiceActive
};
