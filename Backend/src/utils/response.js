function sendResponse(res, { success = true, message = '', data = null, status = 200 }) {
  res.status(status).json({
    success,
    message,
    status,
    data
  });
}

function sendError(res, { message = 'An error occurred', data = null, status = 500 }) {
  res.status(status).json({
    success: false,
    message,
    status,
    data
  });
}

module.exports = { sendResponse  , sendError};