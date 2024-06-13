import asyncHandler from "express-async-handler";
import Post from "../models/post.schema.js";
import STATUS from "../utils/constants.js";
import ErrorResponse from "../utils/error.response.js";

const createPost = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    // Validate request body
    if (!title || !content) {
      return next(
        new ErrorResponse(
          "Please provide a title and content for the post",
          STATUS.BAD_REQUEST
        )
      );
    }
    const newPost = await Post.create({ title, content, author: userId });
    return res.status(STATUS.CREATED).json({ newPost });
  } catch (error) {
    return next(new ErrorResponse(error.message, STATUS.INTERNAL_SERVER_ERROR));
  }
});

const getAllPosts = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find();
    if (!posts || posts.length === 0) {
      return next(new ErrorResponse("No posts found", STATUS.NOT_FOUND));
    }
    res.status(STATUS.OK).json({
      posts,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, STATUS.INTERNAL_SERVER_ERROR));
  }
});

const getPosts = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  try {
    const posts = await Post.find({ author: userId });
    if (!posts || posts.length === 0) {
      return next(new ErrorResponse("No posts found", STATUS.NOT_FOUND));
    }
    res.status(STATUS.OK).json({
      posts,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, STATUS.INTERNAL_SERVER_ERROR));
  }
});

const getPostById = asyncHandler(async (req, res, next) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return next(new ErrorResponse("Post not found", STATUS.NOT_FOUND));
    }
    // No need for this conditional check because if post is null, the code has already entered the if (!post) block
    return res.status(STATUS.OK).json({ post });
  } catch (error) {
    return next(new ErrorResponse(error.message, STATUS.INTERNAL_SERVER_ERROR));
  }
});

const updatePost = asyncHandler(async (req, res, next) => {
  let { title, file, content } = req.body;

  const postId = req.params.id;
  const currentUserId = req.user.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return next(new ErrorResponse("Post not found", 404));
    }

    if (post.author.toString() !== currentUserId) {
      return next(
        new ErrorResponse(
          "You are not authorized to update this post",
          STATUS.FORBIDDEN
        )
      );
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        title,
        file,
        content,
      },
      { new: true, runValidators: true }
    );

    if (updatedPost) {
      res.status(STATUS.CREATED).json({ updatedPost });
    }
  } catch (error) {
    return next(new ErrorResponse(error.message, STATUS.INTERNAL_SERVER_ERROR));
  }
});

const deletePostById = asyncHandler(async (req, res, next) => {
  const postId = req.params.id;
  const currentUserId = req.user.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return next(new ErrorResponse("Post not found", 404));
    }

    if (post.author.toString() !== currentUserId) {
      return next(
        new ErrorResponse(
          "You are not authorized to delete this post",
          STATUS.FORBIDDEN
        )
      );
    }
    await Post.findByIdAndDelete(postId);
    res.status(STATUS.OK).json({
      message: `Post deleted: title ${post.title}`,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, STATUS.INTERNAL_SERVER_ERROR));
  }
});

export {
  createPost,
  getAllPosts,
  getPosts,
  getPostById,
  updatePost,
  deletePostById,
};
