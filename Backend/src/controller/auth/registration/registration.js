const { sendError, sendResponse } = require("../../../utils/response");
const User = require("../../../model/userModels/userMode");
const CommonUser = require("../../../models/CommonUser");
const yup = require("yup");
const axios = require("axios");

// ✅ Validation schema
const updateSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email().required("Email is required"),
  vehicleNo: yup.string().required("Vehicle number is required"),
  vehicleName: yup.string().required("Vehicle name is required"),
  vehicleBrand: yup.string().required("Vehicle brand is required"),
  concurrency: yup.date().required("Concurrency timestamp is required")
});

const updateUserByEmailController = async (req, res) => {
  try {
    const {
      fullName, email, vehicleNo, vehicleName, vehicleBrand, concurrency
    } = req.body;

    // ✅ Validate input
    await updateSchema.validate({ fullName, email, vehicleNo, vehicleName, vehicleBrand, concurrency });

    // ✅ Check in CommonUser table
    const isVerified = await CommonUser.findOne({ email, isVerify: true });
    if (!isVerified) {
      return sendError(res, {
        message: "Email is not verified. Please verify OTP first.",
        status: 401
      });
    }

    // ✅ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return sendError(res, {
        message: "User not found for the provided email",
        status: 404
      });
    }

    // ✅ Concurrency timestamp match
    if (new Date(concurrency).getTime() !== new Date(user.concurrency).getTime()) {
      return sendError(res, {
        message: "Data was updated elsewhere, please refresh",
        status: 409
      });
    }

    // ✅ All good, update user
    user.fullName = fullName;
    user.vehicleNo = vehicleNo;
    user.vehicleName = vehicleName;
    user.vehicleBrand = vehicleBrand;
    user.concurrency = new Date(); // Update timestamp

    await user.save();

    return sendResponse(res, {
      message: "User updated successfully",
      data: {
        fullName: user.fullName,
        email: user.email,
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

// Controller to get all car brands with their models and images
const getAllCarBrandsWithModels = async (req, res) => {
  try {
    // Example: MyCarSpecs free API for car brands and models
    // Replace with another API if needed
    const brandsRes = await axios.get("https://mycar.specsapi.com/api/v2/brands");
    const brands = brandsRes.data.data || [];

    // For each brand, fetch models (limit to first 5 brands for demo)
    const brandModelsPromises = brands.slice(0, 5).map(async (brand) => {
      const modelsRes = await axios.get(`https://mycar.specsapi.com/api/v2/models?brand_id=${brand.id}`);
      const models = (modelsRes.data.data || []).map(model => ({
        modelNo: model.name,
        image: model.image_url || null
      }));
      return {
        brand: brand.name,
        models
      };
    });

    const brandsWithModels = await Promise.all(brandModelsPromises);

    return sendResponse(res, {
      message: "Car brands and models fetched successfully",
      data: brandsWithModels,
      status: 200
    });
  } catch (err) {
    return sendError(res, {
      message: "Failed to fetch car brands and models",
      data: err.message,
      status: 500
    });
  }
};

module.exports = {
  updateUserByEmailController,
  getAllCarBrandsWithModels
};
