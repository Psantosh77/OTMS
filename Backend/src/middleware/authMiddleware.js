const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/response');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';

// Middleware to extract and validate token from request
const extractToken = (req, res, next) => {
  try {
    const cookies = req.cookies || {};
    let token = null;

    // Try to get token from cookies (in order of preference)
    token = cookies.accessToken || cookies.access_token || cookies.token;

    // Fallback: try Authorization header
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Store token in req for use by next middleware/controller
    req.token = token;
    req.refreshToken = cookies.refreshToken;

    // Continue to next middleware even if no token (let controller handle)
    next();
  } catch (error) {
    return sendError(res, {
      message: "Token extraction failed",
      data: error.message,
      status: 500
    });
  }
};

// Middleware to verify access token and decode user info
const verifyToken = (req, res, next) => {
  if (!req.token) {
    return sendError(res, {
      message: "No token provided",
      status: 401
    });
  }

  jwt.verify(req.token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // Token is invalid or expired
      return sendError(res, {
        message: "Invalid or expired token",
        status: 401
      });
    }

    // Store decoded token data in request
    req.user = decoded;
    next();
  });
};

// Optional middleware to verify token but continue if no token
const optionalVerifyToken = (req, res, next) => {
  if (!req.token) {
    req.user = null;
    return next();
  }

  jwt.verify(req.token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      req.user = null;
    } else {
      req.user = decoded;
    }
    next();
  });
};

module.exports = {
  extractToken,
  verifyToken,
  optionalVerifyToken
};
