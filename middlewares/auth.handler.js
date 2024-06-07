import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user.schema.js";
import ErrorResponse from "../utils/error.response.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return next(new ErrorResponse("Unauthorized: Token not provided", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return next(new ErrorResponse("Unauthorized: User not found", 401));
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ErrorResponse("Token expired", 401));
    }

    // Log token verification errors
    console.error("Token verification error:", error);
    return next(new ErrorResponse("Unauthorized: Invalid Token", 401));
  }
});

export default authenticate;
