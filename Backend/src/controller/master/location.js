const Location = require('../../model/locationModel/locationModel');
const { uploadToCloudinary } = require('../../middleware/cloudaniry');
const { sendError, sendResponse } = require('../../utils/response');

// Add or update location
async function addLocation(req, res) {
  try {
    const {
      id, // If present, update
      locationName,
      locationCode,
      address,
      district,
      stateName,
      pinNo,
      description,
      isActive
    } = req.body;

    let imageUrl = '';
    if (req.file && req.file.path) {
      const result = await uploadToCloudinary(req.file.path);
      imageUrl = result.secure_url;
    }

    const locationData = {
      locationName,
      locationCode,
      address,
      district,
      stateName,
      pinNo,
      description,
      image: imageUrl,
      isActive
    };

    let location;
    if (id) {
      // Update existing location
      location = await Location.findByIdAndUpdate(id, locationData, { new: true });
      if (!location) {
        return sendError(res, {
          message: 'Location not found',
          status: 404
        });
      }
      return sendResponse(res, {
        message: 'Location updated successfully',
        data: location,
        status: 200
      });
    } else {
      // Add new location
      location = await Location.create(locationData);
      return sendResponse(res, {
        message: 'Location added successfully',
        data: location,
        status: 201
      });
    }
  } catch (err) {
    return sendError(res, {
      message: 'Failed to add/update location',
      data: err.message,
      status: 500
    });
  }
}

// Get all locations
async function getLocations(req, res) {
  try {
    const locations = await Location.find();
    return sendResponse(res, {
      message: 'Locations fetched successfully',
      data: locations,
      status: 200
    });
  } catch (err) {
    return sendError(res, {
      message: 'Failed to fetch locations',
      data: err.message,
      status: 500
    });
  }
}

// Update isActive status
async function updateLocationActiveStatus(req, res) {
  try {
    const { id, isActive } = req.body;
    if (typeof isActive !== 'boolean' || !id) {
      return sendError(res, {
        message: 'id and isActive(boolean) required',
        status: 400
      });
    }
    const location = await Location.findByIdAndUpdate(id, { isActive }, { new: true });
    if (!location) {
      return sendError(res, {
        message: 'Location not found',
        status: 404
      });
    }
    return sendResponse(res, {
      message: 'Location status updated',
      data: location,
      status: 200
    });
  } catch (err) {
    return sendError(res, {
      message: 'Failed to update status',
      data: err.message,
      status: 500
    });
  }
}

module.exports = { addLocation, getLocations, updateLocationActiveStatus };
