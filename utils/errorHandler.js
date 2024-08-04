exports.globalErrorHandler = (err, req, res, next) => {
  console.error(err, "in global err");

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV === "development") {
    res.status(statusCode).json({
      status: "Error",
      message: message,
      stack: err.stack,
    });
  } else {
    res.status(statusCode).json({
      status: "Error",
      message: message,
    });
  }
};
