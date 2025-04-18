import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  likeBlog,
  // commentBlog,
  blogInteractions
} from "../controllers/blogController.js";
import { authenticateLogin } from "../middlewares/authenticateLogin.js";

const router = express.Router();

// Blog routes
router.post("/create", authenticateLogin, createBlog);
router.get("/all", getAllBlogs);
router.get("/:id", getBlogById);
router.delete("/:id", authenticateLogin, deleteBlog);

// Like and Comment routes
router.post("/like/:blogId", authenticateLogin, likeBlog);
// router.post("/comment/:blogId", authenticateLogin, commentBlog);
// router.get('/blog-interactions', blogInteractions);
router.get('/blog-interactions', authenticateLogin, blogInteractions);

export default router;
