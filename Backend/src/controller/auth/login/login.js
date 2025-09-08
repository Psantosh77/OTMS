// --- Admin Seeder ---
const mongoose = require('mongoose');
const Admin = require("../../../model/userModels/adminModel");

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/otms');
  const email = 'admin@otms.com';
  const password = 'StrongPassword123';
  const name = 'Super Admin';
  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log('Admin already exists.');
    return mongoose.disconnect();
  }
  await Admin.create({ email, password, name });
  console.log('Admin seeded successfully.');
  mongoose.disconnect();
}

// Uncomment to run once:
//  seedAdmin();

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
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.string().oneOf(["customer", "vendor", "admin"], "Role must be customer, vendor, or admin").required("Role is required")
});

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


async function sendOtpController(req, res) {
  try {
    console.log(req.body.email)
    await emailSchema.validate(req.body, { abortEarly: false });
  } catch (validationError) {
    return sendError(res, {
      message: "Validation failed",
      data: validationError.errors,
      status: 400
    });
  }

  const { email, role } = req.body;
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
      role,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000) // expires in 5 mins
    });

    return sendResponse(res, {
      message: 'OTP sent successfully',
      data: { email, role, otp }, // Do not send OTP in production response!
      status: 200
    });
  } catch (error) {
    console.log(error)
    return sendError(res, {
      message: 'Failed to send OTP',
      data: error.message,
      status: 500
    });
  }
}


const verifyOtpController = async (req, res) => {
  try {
    const { email, otp, role } = req.body;

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
    const updatedCommonUser = await commonUserModel.findOneAndUpdate(
      { email },
      { isVerified: true, role: role },
      { upsert: true, new: true }
    );

    // If vendor, find vendor record and issue tokens + return isProfileComplete
    if (role === 'vendor') {
      const vendorRecord = await Vendor.findOne({ email: email.toLowerCase() });

      // create/set tokens (cookies) and also return them in response body
      const tokens = setTokens(res, { email, role: 'vendor' });

      const isProfileComplete = vendorRecord ? !!vendorRecord.isProfileComplete : false;

      return sendResponse(res, {
        message: "OTP verified successfully",
        data: {
          email,
          role,
          tokens,
          isProfileComplete,
          commonUser: updatedCommonUser
        },
        status: 200
      });
    }

    return sendResponse(res, {
      message: "OTP verified successfully",
      data: { email, role, commonUser: updatedCommonUser },
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

// API to check if token in cookies or Authorization header is valid
const checkTokenController = async (req, res) => {
  try {
    let token = req.token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return sendError(res, {
        message: "No token provided",
        status: 401
      });
    }

    // Verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return sendError(res, {
          message: "Invalid or expired token",
          status: 401
        });
      }

      return sendResponse(res, {
        message: "Token is valid",
        data: { valid: true, email: decoded.email },
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

// API to get user info (email and role) from valid token (supports Authorization header)
const getUserInfoController = async (req, res) => {
  try {
    let token = req.token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return sendError(res, {
        message: "No token provided",
        status: 401
      });
    }

    // Verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return sendError(res, {
          message: "Invalid or expired token",
          status: 401
        });
      }

      try {
        const email = decoded.email;

        // Detect user role by checking different collections
        let role = null;
        let userDetails = null;

        // Check if user exists in User collection
        const user = await User.findOne({ email });
        if (user) {
          role = "customer";
          userDetails = {
            name: user.name,
            phone: user.phone,
            address: user.address
          };
        } else {
          // Check if user exists in Vendor collection
          const vendor = await Vendor.findOne({ email });
          if (vendor) {
            role = "vendor";
            userDetails = {
              name: vendor.name,
              phone: vendor.phone,
              businessName: vendor.businessName,
              address: vendor.address
            };
          } else {
            // Check if it's an admin (you might have a separate admin collection or logic)
            // For now, we'll assume admin if the email matches certain criteria
            const adminEmails = ['admin@otgms.com', 'support@otgms.com']; // Add your admin emails
            if (adminEmails.includes(email)) {
              role = "admin";
              userDetails = {
                name: "Administrator",
                type: "admin"
              };
            }
          }
        }

        // If no role found, default to customer (for newly registered users)
        if (!role) {
          role = "customer";
          userDetails = {
            name: email.split('@')[0], // Use email prefix as default name
            isNewUser: true
          };
        }

        return sendResponse(res, {
          message: "User info retrieved successfully",
          data: {
            email,
            role,
            userDetails,
            isAuthenticated: true
          },
          status: 200
        });

      } catch (dbError) {
        return sendError(res, {
          message: "Failed to retrieve user info",
          data: dbError.message,
          status: 500
        });
      }
    });

  } catch (err) {
    return sendError(res, {
      message: "Failed to get user info",
      data: err.message,
      status: 500
    });
  }
};

// API to get user role only (supports Authorization header)
const getUserRoleController = async (req, res) => {
  try {
    let token = req.token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return sendError(res, {
        message: "No token provided",
        status: 401
      });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return sendError(res, {
          message: "Invalid or expired token",
          status: 401
        });
      }

      try {
        const email = decoded.email;
        let role = null;

        // Check user role
        const user = await User.findOne({ email });
        if (user) {
          role = "customer";
        } else {
          const vendor = await Vendor.findOne({ email });
          if (vendor) {
            role = "vendor";
          } else {
            const adminEmails = ['admin@otgms.com', 'support@otgms.com'];
            if (adminEmails.includes(email)) {
              role = "admin";
            } else {
              role = "customer"; // Default role
            }
          }
        }

        return sendResponse(res, {
          message: "User role retrieved successfully",
          data: { role },
          status: 200
        });

      } catch (dbError) {
        return sendError(res, {
          message: "Failed to retrieve user role",
          data: dbError.message,
          status: 500
        });
      }
    });

  } catch (err) {
    return sendError(res, {
      message: "Failed to get user role",
      data: err.message,
      status: 500
    });
  }
};

module.exports = {
  sendOtpController,
  verifyOtpController,
  logoutController,
  checkTokenController,
  getUserInfoController,
  getUserRoleController
};