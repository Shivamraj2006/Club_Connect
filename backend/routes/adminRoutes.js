import express from "express";
import {
  pending,
  approve,
  reject,
  adminDelete,
} from "../controllers/blogController.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.js";

const router = express.Router();

router.get("/pending", pending);
router.post("/approve", authenticateAdmin, approve);
router.post("/reject", authenticateAdmin, reject);
router.delete("/delete/:id", authenticateAdmin, adminDelete);

export default router;
