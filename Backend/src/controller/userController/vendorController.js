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

module.exports = { updateVendorProfile };
