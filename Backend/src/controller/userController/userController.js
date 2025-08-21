const User = require("../../model/userModels/userMode");
const Manufacturer = require("../../model/carDataModel/manufacturerModel");
const CarModel = require("../../model/carDataModel/carModelListModel");
const yup = require("yup");
const { sendError, sendResponse } = require("../../utils/response");
const commonUserModel = require("../../model/userModels/commonUserModel");
const vendorModel = require("../../model/userModels/vendorModel");
const { setTokens } = require("../../middleware/jwtToken");

// validation schema
const updateSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  brand_id: yup.string().required("Brand ID is required"),
  model_id: yup.string().required("Model ID is required")
});

const updateUserController = async (req, res) => {
  try {
    const { email, brand_id, model_id, year, engine_size, vin_number, registration_expiry, insurance_expiry, role } = req.body;



    // validate input
    updateSchema.validateSync({
      email,
      brand_id: String(brand_id),
      model_id: String(model_id)
    });

    const isUserVerify = await commonUserModel.findOne({ email: email, isVerified: true });

    if (isUserVerify?.isVerified) {

      // Try to find by _id (MongoDB ObjectId) only if valid, else fallback to id (string/number)
      const mongoose = require('mongoose');
      let findManufacturer = null;
      if (mongoose.Types.ObjectId.isValid(brand_id)) {
        findManufacturer = await Manufacturer.findOne({ _id: brand_id });
      }
      if (!findManufacturer) {
        findManufacturer = await Manufacturer.findOne({ id: brand_id });
      }
      let findCarModel = null;
      if (mongoose.Types.ObjectId.isValid(model_id)) {
        findCarModel = await CarModel.findOne({ _id: model_id });
      }
      if (!findCarModel) {
        findCarModel = await CarModel.findOne({ id: model_id });
      }

      if (!findManufacturer || !findCarModel) {
        return sendError(res, {
          message: "Brand or Model not found",
          status: 404
        });
      }

      // Find user and update, then save
      let user = await User.findOne({ email: email });
      if (!user) {
        // Insert new user if not found
        user = new User({
          email: email,
          brand: findManufacturer.display_name,
          model: findCarModel.display_name,
          brand_id: findManufacturer.id,
          model_id: findCarModel.id,
          year: year || undefined,
          engine_size: engine_size || undefined,
          vin_number: vin_number || undefined,
          registration_expiry: registration_expiry || undefined,
          insurance_expiry: insurance_expiry || undefined,
          role: role || undefined
        });
        await user.save();
      } else {
        // Update existing user
        user.brand = findManufacturer.display_name;
        user.model = findCarModel.display_name;
        user.brand_id = findManufacturer.id;
        user.model_id = findCarModel.id;
        user.role =  req.body.role; // Update role if provided
        if (year !== undefined) user.year = year;
        if (engine_size !== undefined) user.engine_size = engine_size;
        if (vin_number !== undefined) user.vin_number = vin_number;
        if (registration_expiry !== undefined) user.registration_expiry = registration_expiry;
        if (insurance_expiry !== undefined) user.insurance_expiry = insurance_expiry;
        await user.save();
      }

      // 3. Detect role
      let role = null;
      const userExists = await User.findOne({ email });
      if (userExists) {
        role = "user";
      } else {
        const vendor = await vendorModel.findOne({ email });
        if (vendor) {
          role = "vendor";
        }
      }

      // 4. Generate JWT tokens & set in cookies
      const tokens = setTokens(res, { email });

      return sendResponse(res, {
        message: "User updated successfully",
        data: { user, email, role, ...tokens },
        status: 200
      });

    } else {
      return sendError(res, {
        message: "User is not verified",
        status: 400
      });
    }

  } catch (err) {
    return sendError(res, {
      message: "Update failed",
      data: err.errors || err.message,
      status: 400
    });
  }
};

module.exports = updateUserController;

