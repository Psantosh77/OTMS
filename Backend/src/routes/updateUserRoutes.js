const express = require('express');
const router = express.Router();
const updateUserController = require('../controller/userController/userController');
const { verifyAccessToken } = require('../middleware/jwtToken');

// POST /api/user/updateuser
router.post('/updateuser' ,  updateUserController);

module.exports = router;
