const errorHandler = (err, req, res, next) => {
  const statuscode = res.statuscode ? res.statuscode : 500;
  res.status(statuscode).json({
    message: err.message,
    stack: process.env.nodenv === "development" ? null : err.stack,
  });
};

module.exports = errorHandler;
