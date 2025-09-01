const Admin = require("../../model/userModels/adminModel");
const jwt = require("jsonwebtoken");
const { sendError, sendResponse } = require("../../utils/response");

// POST /api/admin/login
async function adminLoginController(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendError(res, {
      message: "Email and password are required",
      status: 400
    });
  }
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return sendError(res, {
        message: "Admin not found",
        status: 404
      });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return sendError(res, {
        message: "Invalid password",
        status: 401
      });
    }
    // Generate tokens
    const accessToken = jwt.sign(
      { email: admin.email, role: "admin" },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { email: admin.email, role: "admin" },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    return sendResponse(res, {
      message: "Admin login successful",
      data: {
        accessToken,
        refreshToken,
        admin: {
          email: admin.email,
          name: admin.name
        }
      },
      status: 200
    });
  } catch (err) {
    return sendError(res, {
      message: "Login failed",
      data: err.message,
      status: 500
    });
  }
}

module.exports = { adminLoginController };
