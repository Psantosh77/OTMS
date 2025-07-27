const jwt = require("jsonwebtoken");
const User = require("../model/userModels/userMode");
const Vendor = require("../model/userModels/vendorModel");
const { sendResponse, sendError } = require("../utils/response");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';

async function decodeAndDetectRole(req, res, next) {
    const token = req?.cookies?.accessToken;

    console.log(token, "Access Token in decodeAndDetectRole");

    if (token) {
        try {
            const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
            const email = decoded.email;

            let role = null;
            let profile = null;

            const user = await User.findOne({ email });
            if (user) {
                role = "user";
                profile = user;
            } else {
                const vendor = await Vendor.findOne({ email });
                if (vendor) {
                    role = "vendor";
                    profile = vendor;
                }
            }

            if (!role) {
                return sendError(res, {
                    message: "User not found in any role",
                    data: null,
                    status: 404
                });
            }

            req.user = {
                email,
                role,
                profile
            };

            next();
        } catch (err) {
            return sendError(res, {
                message: "Invalid or expired token",
                data: err.message,
                status: 403
            });
        }

    }
    next();
}

module.exports = decodeAndDetectRole;
