const CommonUser = require("../models/CommonUser");
const { sendError } = require("../utils/response");

const emailVerifyMiddleware = async (req, res, next) => {
  try {
    const email = req.body.email;

    if (!email) {
      return sendError(res, {
        message: "Email is required in request body",
        status: 400
      });
    }

    const commonUser = await CommonUser.findOne({ email, isVerify: true });

    if (!commonUser) {
      return sendError(res, {
        message: "Email not verified. Please verify OTP first.",
        status: 401
      });
    }

    // ✅ Verified — continue to next
    next();
  } catch (err) {
    return sendError(res, {
      message: "Email verification check failed",
      data: err.message,
      status: 500
    });
  }
};

module.exports = emailVerifyMiddleware;
