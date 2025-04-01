import { Comment } from "../models/commentModel.js";
import { Blog } from "../models/blogModel.js"; // FIX: Import the Blog model

export const commentBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { comment } = req.body;
    const userId = req.user._id;
    const username = req.user.username;

    // Find the blog post
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Create a new Comment document
    const newComment = new Comment({
      userId,
      username,
      comment,
    });

    // Save comment to the database
    const savedComment = await newComment.save();

    // Store reference (ObjectId) in blog.comments
    blog.comments.push(savedComment._id);
    await blog.save();

    res.status(200).json({ message: "Comment added", comment: savedComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
