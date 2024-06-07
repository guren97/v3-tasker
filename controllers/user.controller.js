import asyncHandler from "express-async-handler";
import User from "../models/user.schema.js";
import ErrorResponse from "../utils/error.response.js";
import STATUS from "../utils/constants.js";

const currentUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return next(new ErrorResponse("No user found", STATUS.NOT_FOUND));
    }

    res.status(STATUS.OK).json({ user: user.username, id: user._id });
  } catch (error) {
    return next(new ErrorResponse(error.message, STATUS.INTERNAL_SERVER_ERROR));
  }
});

const updateUser = asyncHandler(async (req, res, next) => {
  let { first_name, last_name, email } = req.body;

  const currentUserId = req.params.id;
  const userId = req.user.id;

  first_name = first_name.toLowerCase();
  last_name = last_name.toLowerCase();

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorResponse("User not found", STATUS.NOT_FOUND));
    }

    if (user._id.toString() !== currentUserId) {
      return next(
        new ErrorResponse(
          "You are not authorized to update this profile",
          STATUS.UNAUTHORIZED
        )
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        first_name,
        last_name,
        email,
      },
      { new: true, runValidators: true }
    );

    if (updateUser) {
      res.status(STATUS.CREATED).json({ updatedUser });
    }
  } catch (error) {
    return next(new ErrorResponse(error.message, STATUS.INTERNAL_SERVER_ERROR));
  }
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const currentUserId = req.params.id;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorResponse("User not found", STATUS.NOT_FOUND));
    }

    if (user._id.toString() !== currentUserId) {
      return next(
        new ErrorResponse(
          "You are not authorized to delete this profile",
          STATUS.UNAUTHORIZED
        )
      );
    }

    const deleteUser = await User.findByIdAndDelete(userId);
    if (deleteUser) {
      return res
        .status(STATUS.OK)
        .json({ message: "User deleted successfully" });
    }
  } catch (error) {
    return next(new ErrorResponse(error.message, STATUS.INTERNAL_SERVER_ERROR));
  }
});

export { currentUser, updateUser, deleteUser };
