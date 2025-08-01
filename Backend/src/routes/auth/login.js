const express = require('express');
const router = express.Router();

const { sendOtpController, verifyOtpController, logoutController, checkTokenController } = require('../../controller/auth/login/login');
const { refreshTokenController } = require('../../middleware/jwtToken');


// POST /api/auth/login
router.post('/sendotp', sendOtpController);
router.post('/verifyOpt', verifyOtpController);
router.post('/logout', logoutController);
router.post('/refresh', refreshTokenController);
// Add update user/vendor route (JWT required)

// Add token check route
router.post('/check-token', checkTokenController);

module.exports = router;