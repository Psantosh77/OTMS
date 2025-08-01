const { sendError, sendResponse } = require("../../../utils/response");
const yup = require("yup");
const Otp = require("../../../model/authModel/optModel");
const sendOtpMail = require("../../../utils/mailer");
const commonUserModel = require("../../../model/userModels/commonUserModel");
const User = require("../../../model/userModels/userMode");
const Vendor = require("../../../model/userModels/vendorModel");
const { setTokens } = require("../../../middleware/jwtToken");
const jwt = require("jsonwebtoken"); // Add at the top if not already imported


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

// API to check if token in cookies is valid
const checkTokenController = async (req, res) => {
  try {
    // Only check the first valid token found (avoid fallback to refreshToken if accessToken is present)
    const cookies = req.cookies || {};
    let token =
      cookies.accessToken ||
      cookies.access_token ||
      cookies.token;

    // If token is undefined/null/empty, return error immediately
    if (!token) {
      return sendError(res, {
        message: "No token provided",
        status: 404
      });
    }

    // Fallback: try to get from Authorization header (Bearer token)
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If still no token, as a last resort, try refreshToken
    if (!token && cookies.refreshToken) {
      token = cookies.refreshToken;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      // ...existing code...
      return sendResponse(res, {
        message: "Token is valid",
        data: {},
        status: 200
      });
    });
  } catch (err) {
    return sendError(res, {
      message: "Token check failed",
      data: err.message,
      status: 500
    });
  }
};

module.exports = { sendOtpController, verifyOtpController, logoutController, checkTokenController };