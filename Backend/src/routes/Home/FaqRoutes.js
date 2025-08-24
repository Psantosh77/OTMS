const express = require('express');
const { getConfig, addFaqs, getFaqs, updateFaqIsActive } = require('../../controller/master/FAQ');
const decodeAndDetectRole = require('../../middleware/decodeAndDetectRole');

const router = express.Router();

// POST /api/auth/login


router.post("/addfaq" , addFaqs);
router.post("/getfaq" , getFaqs);
router.post("/deleteUndelete", updateFaqIsActive);


module.exports = router;