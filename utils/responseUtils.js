const successResponse = (data, message = "Success") => {
  return {
    status: "success",
    message: message,
    data: data,
  };
};

const errorResponse = (message, statusCode = 500) => {
  return {
    status: "error",
    message: message,
    statusCode: statusCode,
  };
};

module.exports = { successResponse, errorResponse };
