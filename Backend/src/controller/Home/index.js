const { sendResponse } = require("../../utils/response");
const axios = require("axios");

async function getConfig(req, res) {
  const { latitude, longitude } = req.body;
  let clientIp =
    req.body.clientIp ||
    req.query.clientIp ||
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress ||
    null;

  let location = null;

  if (latitude && longitude) {
    try {
      const geoRes = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      if (geoRes.data && geoRes.data.address) {
        location = {
          country: geoRes.data.address.country,
          state: geoRes.data.address.state,
          city: geoRes.data.address.city || geoRes.data.address.town || geoRes.data.address.village,
          lat: latitude,
          lon: longitude
        };
      }
    } catch (e) {
      location = null;
    }
  }

  const config = {
    appName: process.env.APP_NAME || "OTGMS",
    environment: process.env.NODE_ENV || "development",
    apiVersion: "v1",
    supportEmail: process.env.SUPPORT_EMAIL || "support@example.com",
    clientIp,
    location,
    role: req.user?.role || null,
    user: req.user?.profile || null
  };

  return sendResponse(res, {
    message: "Config data fetched successfully",
    data: config,
    status: 200
  });
}

module.exports = { getConfig };
