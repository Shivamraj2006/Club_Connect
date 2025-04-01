import express from "express";
import { registerClubAdmin, loginClubAdmin } from "../controllers/clubAdminController.js";

const router = express.Router();

router.post("/register", registerClubAdmin);
router.post("/login", loginClubAdmin);

export default router;
