const express = require("express");
const router = express.Router();
const {
  updateUserByEmailController,
  getAllCarBrandsWithModels
} = require("../../controller/auth/registration/registration");

// Route to update user by email
router.put("/updateuser", updateUserByEmailController);

// Route to get all car brands with their models and images
router.get("/carbrandsmodels", getAllCarBrandsWithModels);

module.exports = router;