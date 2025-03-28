import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  isApproved: Boolean,
  title: String,
  blog: String,
  userId: String,
  token: String,
  message: String,
  likes: [{ type: String }], // Array of User IDs who liked the blog
  comments: [
    {
      userId: String,
      username: String,
      comment: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

const Blog = mongoose.model("Blog", blogSchema);

export { Blog };
