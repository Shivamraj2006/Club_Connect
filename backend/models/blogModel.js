import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  isApproved: Boolean,
  title: String,
  blog: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  token: String,
  message: String,
  likes: [{ type: String }], // Array of User IDs who liked the blog
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Blog = mongoose.model("Blog", blogSchema);

export { Blog };
