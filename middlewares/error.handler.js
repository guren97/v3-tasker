import ErrorResponse from "../utils/error.response.js"; // Assuming ErrorResponse.js is in the same directory

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Duplicate key error (MongoDB error code 11000)
  if (err.code === 11000) {
    const message = "Duplication Error";
    error = new ErrorResponse(message, 400);
  }

  // Validation error (Mongoose ValidationError)
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", "); // Join error messages into a single string
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Internal server error",
  });
};

export default errorHandler;
