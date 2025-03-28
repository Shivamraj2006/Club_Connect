import express from "express";
import {
  getUserInfo,
  myblogs,
  register,
  login,
  resetPassword,
} from "../controllers/userController.js";
import { authenticateLogin } from "../middlewares/authenticateLogin.js";

const router = express.Router();

router.get("/getUserInfo", getUserInfo);
router.get("/myblogs", authenticateLogin, myblogs);
router.post("/register", register);
router.post("/login", login);
router.post("/resetPassword", resetPassword);

export default router;
