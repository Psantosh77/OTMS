const Vendor = require("../models/Vendor");
const { sendResponse, sendError } = require("../../utils/response");

async function updateVendorProfile(req, res) {
  try {
    const { email } = req.user; // Email from JWT
    const updateData = req.body;

    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return sendError(res, {
        message: "Vendor not found",
        status: 404
      });
    }

    // Update fields
    Object.keys(updateData).forEach((key) => {
      vendor[key] = updateData[key];   
    });

    vendor.concurrency = new Date(); // Timestamp update
    await vendor.save();

    return sendResponse(res, {
      message: "Vendor profile updated successfully",
      data: vendor,
      status: 200
    });
  } catch (err) {
    return sendError(res, {
      message: "Something went wrong while updating vendor",
      data: err.message,
      status: 500
    });
  }
}

async function createVendor(req, res) {
  try {
    const { email, name, phone, businessName, address } = req.body;
    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return sendError(res, {
        message: "Vendor already exists",
        status: 400
      });
    }
    // Find max vendorId and increment
    const lastVendor = await Vendor.findOne({}, {}, { sort: { vendorId: -1 } });
    const nextVendorId = lastVendor ? lastVendor.vendorId + 1 : 1;
    const vendor = new Vendor({
      email,
      name,
      phone,
      businessName,
      address,
      vendorId: nextVendorId,
      role: "vendor",
      isActive: true,
      signupDate: new Date(),
      concurrency: new Date()
    });
    await vendor.save();
    return sendResponse(res, {
      message: "Vendor created successfully",
      data: vendor,
      status: 201
    });
  } catch (err) {
    return sendError(res, {
      message: "Failed to create vendor",
      data: err.message,
      status: 500
    });
  }
}

module.exports = { updateVendorProfile, createVendor };
