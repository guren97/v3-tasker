import express from "express";
import authenticate from "../middlewares/auth.handler.js";

import {
  currentUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", authenticate, currentUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

export default router;
