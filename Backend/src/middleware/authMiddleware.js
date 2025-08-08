const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/response');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';

// Middleware to extract and validate token from request
const extractToken = (req, res, next) => {
  try {
    const cookies = req.cookies || {};
    let token = null;


    // Try to get token from Authorization header first
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    // Fallback: try cookies (in order of preference)
    if (!token) {
      token = cookies.accessToken || cookies.access_token || cookies.token;
    }

    // Store token in req for use by next middleware/controller
    req.token = token;

    // Also support refreshToken in Authorization header (for refresh endpoints)
    let refreshToken = null;
    if (req.headers['x-refresh-token']) {
      refreshToken = req.headers['x-refresh-token'];
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      // If refresh endpoint uses Bearer for refreshToken
      refreshToken = req.headers.authorization.split(" ")[1];
    } else {
      refreshToken = cookies.refreshToken;
    }
    req.refreshToken = refreshToken;

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
  // Check Authorization header for Bearer token first
  let token = req.token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log(token)

  if (!token) {
    return sendError(res, {
      message: "No token provided",
      status: 401
    });
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log(decoded)

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
