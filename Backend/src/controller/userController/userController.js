const { sendError, sendResponse } = require("../../../utils/response");
const User = require("../../../models/User");
const yup = require("yup");

// validation schema
const updateSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  vehicleNo: yup.string().required("Vehicle number is required"),
  vehicleName: yup.string().required("Vehicle name is required"),
  vehicleBrand: yup.string().required("Vehicle brand is required"),
  concurrency: yup.date().required("Concurrency timestamp is required")
});

const updateUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullName, vehicleNo, vehicleName, vehicleBrand, concurrency } = req.body;

    // ✅ validate input
    await updateSchema.validate({ fullName, vehicleNo, vehicleName, vehicleBrand, concurrency });

    // ✅ find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return sendError(res, {
        message: "User not found",
        status: 404
      });
    }

    // ✅ check concurrency timestamp
    if (new Date(concurrency).getTime() !== new Date(user.concurrency).getTime()) {
      return sendError(res, {
        message: "Data has been updated by someone else. Please refresh.",
        status: 409
      });
    }

    // ✅ update data
    user.fullName = fullName;
    user.vehicleNo = vehicleNo;
    user.vehicleName = vehicleName;
    user.vehicleBrand = vehicleBrand;
    user.concurrency = new Date(); // update timestamp

    await user.save();

    return sendResponse(res, {
      message: "User updated successfully",
      data: {
        fullName: user.fullName,
        vehicleNo: user.vehicleNo,
        vehicleName: user.vehicleName,
        vehicleBrand: user.vehicleBrand,
        concurrency: user.concurrency
      },
      status: 200
    });

  } catch (err) {
    return sendError(res, {
      message: "Update failed",
      data: err.errors || err.message,
      status: 400
    });
  }
};

module.exports = updateUserController;
