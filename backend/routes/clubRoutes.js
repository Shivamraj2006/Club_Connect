import express from "express";
import { getAllClubs, getClubDetails, addClub, updateClub } from "../controllers/clubController.js";
import { authClubAdmin } from "../middlewares/authClubAdmin.js"; // Middleware for Club Admin authentication
import { authenticateAdmin } from "../middlewares/authenticateAdmin.js"; // Super Admin for adding clubs

const router = express.Router();

router.get("/getClubs", getAllClubs);
router.get("/clubInfo/:clubID", getClubDetails);
router.post("/addClub", authenticateAdmin, addClub); // Only a Super Admin can add a new club
router.patch("/updateClub/:clubID", authClubAdmin, updateClub); // Only a Club Admin can update their club

export default router;
