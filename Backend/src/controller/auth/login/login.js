const { sendError, sendResponse } = require("../../../utils/response");
const yup = require("yup");
const Otp = require("../../../model/authModel/optModel");
const sendOtpMail = require("../../../utils/mailer");
const commonUserModel = require("../../../model/userModels/commonUserModel");
const User = require("../../../model/userModels/userMode");
const Vendor = require("../../../model/userModels/vendorModel");
const { setTokens } = require("../../../middleware/jwtToken");


// Yup schema for email validation
const emailSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required")
});

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}


async function sendOtpController(req, res) {
    try {
        await emailSchema.validate(req.body, { abortEarly: false });
    } catch (validationError) {
        return sendError(res, {
            message: "Validation failed",
            data: validationError.errors,
            status: 400
        });
    }

    const { email } = req.body;
    const otp = generateOtp();

    try {
        await sendOtpMail({
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`
        });
        await Otp.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000) // expires in 5 mins
        });

        return sendResponse(res, {
            message: 'OTP sent successfully',
            data: { email, otp }, // Do not send OTP in production response!
            status: 200
        });
    } catch (error) {
        return sendError(res, {
            message: 'Failed to send OTP',
            data: error.message,
            status: 500
        });
    }
}




const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 1. Find OTP
    const record = await Otp.findOne({ email, otp });
    if (!record) {
      return sendError(res, {
        message: "Invalid or expired OTP",
        status: 400
      });
    }

    // Optional: Expiry check
    // if (record.expiresAt < new Date()) { ... }

    // 2. Insert/update CommonUser with isVerify: true
    await commonUserModel.findOneAndUpdate(
      { email },
      { isVerified: true },
      { upsert: true, new: true }
    );

    // 3. Detect role
    let role = null;
    const user = await User.findOne({ email });
    if (user) {
      role = "user";
    } else {
      const vendor = await Vendor.findOne({ email });
      if (vendor) {
        role = "vendor";
      }
    }

    // 4. Generate JWT tokens & set in cookies
    const tokens = setTokens(res, { email });

    return sendResponse(res, {
      message: "OTP verified and tokens set",
      data: { email, role, ...tokens },
      status: 200
    });

  } catch (err) {
    return sendError(res, {
      message: "OTP verification failed",
      data: err.message,
      status: 500
    });
  }
};

const logoutController = async (req, res) => {
  try {
    // Clear authentication cookies
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return sendResponse(res, {
      message: "Logged out successfully",
      data: null,
      status: 200
    });

  } catch (err) {
    return sendError(res, {
      message: "Logout failed",
      data: err.message,
      status: 500
    });
  }
};

module.exports = { sendOtpController, verifyOtpController, logoutController };