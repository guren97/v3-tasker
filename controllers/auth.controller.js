import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/error.response.js";
import User from "../models/user.schema.js";
import generateToken from "../utils/generate.token.js";
import STATUS from "../utils/constants.js";

import {
  validateEmail,
  validatePassword,
} from "../utils/credentials.validators.js";

const register = asyncHandler(async (req, res, next) => {
  let { username, user_role, first_name, last_name, email, password } =
    req.body;

  username = username.toLowerCase();
  first_name = first_name.toLowerCase();
  last_name = last_name.toLowerCase();

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      const message =
        existingUser.username === username
          ? "Username already exists"
          : "Email already exists";
      return next(new ErrorResponse(message, STATUS.UNAUTHORIZED));
    }
    if (!username || !first_name || !last_name || !email || !password) {
      return next(
        new ErrorResponse(
          "Please fill in all fields",
          STATUS.UNPROCESSABLE_ENTITY
        )
      );
    }

    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      return next(
        new ErrorResponse(emailValidationError, STATUS.UNPROCESSABLE_ENTITY)
      );
    }

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      return next(
        new ErrorResponse(passwordValidationError, STATUS.UNPROCESSABLE_ENTITY)
      );
    }

    const user = await User.create({
      username,
      user_role,
      first_name,
      last_name,
      email,
      password,
    });

    res.status(STATUS.CREATED).json({ user });
  } catch (error) {
    return next(new ErrorResponse(error.message, STATUS.INTERNAL_SERVER_ERROR));
  }
});

const login = asyncHandler(async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return next(
        new ErrorResponse("Invalid credentials", STATUS.UNAUTHORIZED)
      );
    }

    const matchPasswords = await bcrypt.compare(password, user.password);
    if (!matchPasswords) {
      return next(
        new ErrorResponse("Invalid credentials", STATUS.UNAUTHORIZED)
      );
    }

    generateToken(user, res);
  } catch (error) {
    return next(new ErrorResponse(error.message, STATUS.INTERNAL_SERVER_ERROR));
  }
});

const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token").json({
    message: "Loggedout successfully",
  });
});

export { register, login, logout };
