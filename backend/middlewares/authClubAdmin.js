import jwt from "jsonwebtoken";
import { ClubAdmin } from "../models/clubAdminModel.js";
import { User } from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_KEY;

export const authClubAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, secret);
    req.user = decoded;

    // Find user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // Find club admin entry
    const clubAdmin = await ClubAdmin.findOne({ userId: user._id });
    if (!clubAdmin) {
      return res.status(403).json({ message: "Access denied. Not a Club Admin" });
    }

    // Check if admin is modifying their own club
    if (req.params.clubID && req.params.clubID !== clubAdmin.clubID) {
      return res.status(403).json({ message: "Access denied. You can only edit your own club" });
    }

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
