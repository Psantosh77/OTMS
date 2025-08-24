const { sendResponse, sendError } = require('../../utils/response');
const axios = require("axios");
const FaqModel = require('../../model/homeModel/faqModel');

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
        `${process.env.NOMINATIM_API_URL || 'https://nominatim.openstreetmap.org'}/reverse?lat=${latitude}&lon=${longitude}&format=json`
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

async function getFaqs(req, res) {
  try {
    const faqs = await FaqModel.find({ isActive: true });
    return sendResponse(res, {
      message: 'FAQs fetched successfully',
      data: faqs,
      status: 200
    });
  } catch (err) {
    return sendError(res, {
      message: 'Failed to fetch FAQs',
      data: err.message,
      status: 500
    });
  }
}



async function addFaqs(req, res) {
  try {
    const { question, answer, category, _id } = req.body;
    if (!question || !answer) {
      return sendError(res, {
        message: 'Question and answer are required',
        data: null,
        status: 400
      });
    }
    let faq;
    if (_id) {
      // Update existing FAQ
      faq = await FaqModel.findByIdAndUpdate(
        _id,
        { question, answer, category },
        { new: true }
      );
      if (!faq) {
        return sendError(res, {
          message: 'FAQ not found for update',
          data: null,
          status: 404
        });
      }
      return sendResponse(res, {
        message: 'FAQ updated successfully',
        data: faq,
        status: 200
      });
    } else {
      // Add new FAQ
      faq = new FaqModel({ question, answer, category });
      await faq.save();
      return sendResponse(res, {
        message: 'FAQ added successfully',
        data: faq,
        status: 201
      });
    }
  } catch (err) {
    return sendError(res, {
      message: 'Failed to add/update FAQ',
      data: err.message,
      status: 500
    });
  }
}


async function updateFaqIsActive(req, res) {
  try {
    const { _id, isActive } = req.body;
    if (!_id || typeof isActive !== 'boolean') {
      return sendError(res, {
        message: 'FAQ _id and isActive(boolean) are required',
        data: null,
        status: 400
      });
    }
    const faq = await FaqModel.updateIsActive(_id, isActive);
    if (!faq) {
      return sendError(res, {
        message: 'FAQ not found',
        data: null,
        status: 404
      });
    }
    return sendResponse(res, {
      message: 'FAQ isActive updated successfully',
      data: faq,
      status: 200
    });
  } catch (err) {
    return sendError(res, {
      message: 'Failed to update FAQ isActive',
      data: err.message,
      status: 500
    });
  }
}

module.exports = { getConfig, getFaqs, addFaqs, updateFaqIsActive };
