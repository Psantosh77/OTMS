const express = require('express');
const { sendOtpController, verifyOtpController, logoutController } = require('../../controller/auth/login/login');


const router = express.Router();

// POST /api/auth/login
router.post('/sendotp', sendOtpController);
router.post("/verifyOpt" ,  verifyOtpController)

// POST /api/auth/logout
router.post('/logout', logoutController);

module.exports = router;