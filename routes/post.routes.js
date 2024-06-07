import express from "express";
import authenticate from "../middlewares/auth.handler.js";

import {
  deletePost,
  getUserPost,
  setPost,
  updatePost,
} from "../controllers/post.controller.js";

const postRoutes = express.Router();

postRoutes.post("/new", authenticate, setPost);
postRoutes.get("/posts", authenticate, getUserPost);
postRoutes.put("/:id", authenticate, updatePost);
postRoutes.delete("/:id", authenticate, deletePost);

export default postRoutes;
