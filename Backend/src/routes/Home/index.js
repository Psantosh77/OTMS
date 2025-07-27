const express = require('express');
const { getConfig } = require('../../controller/Home/index');
const decodeAndDetectRole = require('../../middleware/decodeAndDetectRole');

const router = express.Router();

// POST /api/auth/login
router.post('/config', decodeAndDetectRole,  getConfig);


module.exports = router;