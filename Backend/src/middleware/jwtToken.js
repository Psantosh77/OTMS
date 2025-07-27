const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

// Generate access and refresh tokens, set in cookies
function setTokens(res, payload) {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 15 * 60 * 1000
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return { accessToken, refreshToken };
}

// Middleware to get JWT token from cookies and verify
function verifyAccessToken(req, res, next) {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token missing', status: 401 });
  }
  try {
    req.user = jwt.verify(token, ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token', status: 403 });
  }
}

// Refresh token controller
function refreshTokenController(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ success: false, message: 'Refresh token missing', status: 401 });
  }

  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign({ id: payload.id, username: payload.username }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: 'Access token refreshed',
      status: 200,
      data: { accessToken: newAccessToken }
    });
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired refresh token', status: 403 });
  }
}

module.exports = { setTokens, verifyAccessToken, refreshTokenController };
