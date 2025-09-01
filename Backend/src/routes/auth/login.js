const express = require('express');
const router = express.Router();

const { 
  sendOtpController, 
  verifyOtpController, 
  logoutController, 
  checkTokenController, 
  getUserInfoController, 
  getUserRoleController 
} = require('../../controller/auth/login/login');
const { refreshTokenController } = require('../../middleware/jwtToken');
const { extractToken, verifyToken } = require('../../middleware/authMiddleware');


// Authentication routes (no token required)
router.post('/sendotp', sendOtpController);
router.post('/verifyOpt', verifyOtpController);

// Token management routes
router.post('/logout', logoutController);
router.post('/refresh-token', refreshTokenController);

// Token validation routes (requires extractToken middleware)
router.post('/check-token', verifyToken, checkTokenController);

// User info routes (requires extractToken middleware)
router.post('/get-user-info', verifyToken, getUserInfoController);
router.post('/get-user-role', verifyToken, getUserRoleController);


module.exports = router;