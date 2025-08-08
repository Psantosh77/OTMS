const User = require("../../model/userModels/userMode");
const Manufacturer = require("../../model/carDataModel/manufacturerModel");
const CarModel = require("../../model/carDataModel/carModelListModel");
const yup = require("yup");
const { sendError, sendResponse } = require("../../utils/response");
const commonUserModel = require("../../model/userModels/commonUserModel");

// validation schema
const updateSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  brand_id: yup.string().required("Brand ID is required"),
  model_id: yup.string().required("Model ID is required")
});

const updateUserController =  async (req, res) => {
  try {
    const { email, brand_id, model_id, year, engine_size, vin_number, registration_expiry, insurance_expiry } = req.body;

    // validate input
    updateSchema.validateSync({
      email,
      brand_id: String(brand_id),
      model_id: String(model_id)
    });

    const isUserVerify = await commonUserModel.findOne({ email : email , isVerified: true });

    if(isUserVerify?.isVerified){
      const findManufacturer = await Manufacturer.findOne({id:brand_id});
      const findCarModel = await CarModel.findOne({id:model_id});

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
          insurance_expiry: insurance_expiry || undefined
        });
        await user.save();
      } else {
        // Update existing user
        user.brand = findManufacturer.display_name;
        user.model = findCarModel.display_name;
        user.brand_id = findManufacturer.id;
        user.model_id = findCarModel.id;
        if (year !== undefined) user.year = year;
        if (engine_size !== undefined) user.engine_size = engine_size;
        if (vin_number !== undefined) user.vin_number = vin_number;
        if (registration_expiry !== undefined) user.registration_expiry = registration_expiry;
        if (insurance_expiry !== undefined) user.insurance_expiry = insurance_expiry;
        await user.save();
      }

      return sendResponse(res, {
        message: "User updated successfully",
        data: user,
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

