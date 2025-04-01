import express from "express";
import { commentBlog } from "../controllers/commentController.js";
import { authenticateLogin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/comment/:blogId", authenticateLogin, commentBlog);

export default router;
