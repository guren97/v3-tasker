import express from "express";
import authenticate from "../middlewares/auth.handler.js";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePostById,
} from "../controllers/post.controller.js";

const router = express.Router();

// Define routes
router.post("/", authenticate, createPost);
router.get("/", authenticate, getPosts);
router.get("/:id", authenticate, getPostById);
router.put("/:id", authenticate, updatePost);
router.delete("/:id", authenticate, deletePostById);

export default router;
