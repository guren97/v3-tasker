import express from "express";
import authenticate from "../middlewares/auth.handler.js";

import {
  currentUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/current", authenticate, currentUser);
userRoutes.put("/update/:id", authenticate, updateUser);
userRoutes.delete("/delete/:id", authenticate, deleteUser);

export default userRoutes;
