const express = require('express');
const router = express.Router();
const { adminLoginController } = require('../../controller/userController/adminController');

// Admin login route
router.post('/admin-login', adminLoginController);

module.exports = router;
