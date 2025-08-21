const express = require('express');
const { getConfig, addFaqs, getFaqs } = require('../../controller/Home/index');
const decodeAndDetectRole = require('../../middleware/decodeAndDetectRole');

const router = express.Router();

// POST /api/auth/login
router.post('/config', decodeAndDetectRole,  getConfig);
router.post("/addfaq" , addFaqs);
router.post("/getfaq" , getFaqs)


module.exports = router;