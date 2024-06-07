import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter task title"],
    },
    content: {
      type: String,
      required: [true, "Please put some contents"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// // REMOVE extra query information from documents
// TaskSchema.set("toJSON", {
//   transform: function (doc, ret) {
//     delete ret.createdAt;
//     delete ret.updatedAt;
//     delete ret.__v;
//   },
// });

const Post = mongoose.model("Post", PostSchema);
export default Post;
