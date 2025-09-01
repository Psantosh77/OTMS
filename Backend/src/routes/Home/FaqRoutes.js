const express = require('express');
const { getConfig, addFaqs, getFaqs, updateFaqIsActive, getAllFaqs } = require('../../controller/master/FAQ');
const { verifyAccessToken } = require('../../middleware/jwtToken');
const decodeAndDetectRole = require('../../middleware/decodeAndDetectRole');

const router = express.Router();

// POST /api/auth/login


router.post("/addfaq", verifyAccessToken, addFaqs);
router.post("/getfaq", verifyAccessToken, getFaqs);
router.post("/getallfaqs", verifyAccessToken, getAllFaqs);
router.post("/deleteUndelete", verifyAccessToken, updateFaqIsActive);


module.exports = router;