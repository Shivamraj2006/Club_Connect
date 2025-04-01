import { User } from "../models/userModel.js";
import { ClubAdmin } from "../models/clubAdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_KEY;

// Club Admin Signup
export const registerClubAdmin = async (req, res) => {
  try {
    const { name, username, password, clubID } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    // Create a Club Admin entry
    const newClubAdmin = new ClubAdmin({
      userId: newUser._id,
      clubID,
    });

    await newClubAdmin.save();

    res.status(201).json({ message: "Club Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Club Admin Login
export const loginClubAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the user is a Club Admin
    const clubAdmin = await ClubAdmin.findOne({ userId: user._id });
    if (!clubAdmin) {
      return res.status(403).json({ message: "Access denied. Not a Club Admin." });
    }

    // Generate JWT
    const token = jwt.sign({ _id: user._id, clubID: clubAdmin.clubID }, secret, { expiresIn: "5h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { username, clubID: clubAdmin.clubID },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
