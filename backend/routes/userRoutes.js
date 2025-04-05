import express from "express";
import {
  getUserInfo,
  myblogs,
  register,
  login,
  resetPassword,
  savedPosts,
  likedPosts,
  addComment,
} from "../controllers/userController.js";
import { authenticateLogin } from "../middlewares/authenticateLogin.js";

const router = express.Router();

router.get("/getUserInfo", getUserInfo);
router.get("/myblogs", authenticateLogin, myblogs);
router.post("/register", register);
router.post("/login", login);
router.post("/resetPassword", resetPassword);
router.get('/save-post', savedPosts);
router.get('/like-post', likedPosts);
router.post('/add-comment',addComment );

export default router;
