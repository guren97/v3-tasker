import jwt from "jsonwebtoken";
import ErrorResponse from "./error.response.js";

const generateToken = async (user, res, next) => {
  try {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day expiration
      path: "/",
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user.id,
        username: user.username,
        avatar: user.avatar,
        user_role: user.user_role,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    // Handle specific error types
    if (error.name === "TokenExpiredError") {
      return next(new ErrorResponse("Token expired", 401));
    }
    // Handle other possible errors
    return next(new ErrorResponse("Failed to generate token", 500));
  }
};

export default generateToken;
