const express = require('express');
;const router = express.Router();

const { sendOtpController, verifyOtpController, logoutController } = require('../../controller/auth/login/login');


// POST /api/auth/login
router.post('/sendotp', sendOtpController);
router.post('/verifyOpt', verifyOtpController);
router.post('/logout', logoutController);

// Add update user/vendor route (JWT required)

module.exports = router;