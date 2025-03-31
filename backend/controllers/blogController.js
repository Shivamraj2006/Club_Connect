import { Blog } from "../models/blogModel.js";

// Create a blog
export const createBlog = async (req, res) => {
  try {
    const blog = new Blog({ ...req.body, userId: req.user._id });
    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.userId !== req.user._id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Like or Unlike a blog
export const likeBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const userId = req.user._id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.likes.includes(userId)) {
      blog.likes = blog.likes.filter((id) => id !== userId); // Unlike
    } else {
      blog.likes.push(userId); // Like
    }

    await blog.save();
    res.status(200).json({ message: "Like status updated", totalLikes: blog.likes.length });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Comment on a blog
export const commentBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { comment } = req.body;
    const userId = req.user._id;
    const username = req.user.username;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const newComment = {
      userId,
      username,
      comment,
    };

    blog.comments.push(newComment);
    await blog.save();

    res.status(200).json({ message: "Comment added", comments: blog.comments });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const pending = async (req, res) => {
  try {
    const blogs = await Blog.find({ isApproved: false }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Approve a blog
export const approve = async (req, res) => {
  try {
    const { blogId } = req.body;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.isApproved = true;
    await blog.save();
    res.status(200).json({ message: "Blog approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Reject a blog
export const reject = async (req, res) => {
  try {
    const { blogId } = req.body;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    await blog.deleteOne();
    res.status(200).json({ message: "Blog rejected and deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Admin delete any blog
export const adminDelete = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted by Admin" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const blogInteractions =  async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .populate('savedPosts')
      .populate('likedPosts')
      .populate('commentedPosts');
    
    res.json({
      savedPosts: user.savedPosts,
      likedPosts: user.likedPosts,
      commentedPosts: user.commentedPosts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};