import express from "express";
import {
  getUserInfo,
  myblogs,
  register,
  login,
  resetPassword,
  newuserCreated,
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
router.post('/clerk-webhook', newuserCreated);
router.post('/save-post', savedPosts);
router.post('/like-post', likedPosts);
router.post('/add-comment',addComment );

export default router;
