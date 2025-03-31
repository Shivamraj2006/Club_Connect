import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import { Blog } from "../models/blogModel.js";
import md5 from "md5";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_KEY;

// Get logged-in user's info
const getUserInfo = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      isLoggedin: false,
      user: { isAdmin: false },
      message: "No token provided",
    });
  }

  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return res.status(401).json({
        isLoggedin: false,
        user: { isAdmin: false },
        message: "Invalid token",
      });
    }

    res.status(200).json({
      isLoggedin: true,
      user: data,
    });
  });
};

// User registration
const register = (req, res) => {
  const { name, username } = req.body;
  const password = md5(req.body.password);
  const enrollment = req.body.enrollment.toUpperCase();

  const newUser = new User({
    isAdmin: false,
    name,
    username,
    password,
    enrollment,
  });

  User.find({ username }, (err, user) => {
    if (err) {
      console.log(err);
      res.send({ message: 0 });
    } else {
      if (user.length > 0) {
        res.send({ message: 4 }); // Username already exists
      } else {
        newUser.save();
        res.send({ message: 1 });
      }
    }
  });
};

// User login
const login = (req, res) => {
  const { username } = req.body;
  const password = md5(req.body.password);

  User.find({ username, password }, (err, user) => {
    if (err) {
      console.log(err);
      res.send({
        message: 0,
        isLoggedin: false,
        user: { isAdmin: false },
      });
    } else {
      if (user.length > 0) {
        const currentUser = {
          isAdmin: user[0].isAdmin,
          name: user[0].name,
          _id: user[0]._id,
        };

        const token = jwt.sign(currentUser, secret, { expiresIn: "5h" });

        res.cookie("authToken", token, {
          httpOnly: true,
          maxAge: 5 * 60 * 60 * 1000,
          path: "/",
          sameSite: "lax",
          // secure: true, // enable in production
        });

        res.send({
          message: 1,
          isLoggedin: true,
          user: currentUser,
          token,
        });
      } else {
        res.send({
          message: 0,
          isLoggedin: false,
          user: { isAdmin: false },
        });
      }
    }
  });
};

// Reset password
const resetPassword = (req, res) => {
  const { username } = req.body;
  const enrollment = req.body.enrollment.toUpperCase();
  const newPassword = md5(req.body.password);

  User.updateOne(
    { username, enrollment },
    { password: newPassword },
    (err, users) => {
      if (err) {
        console.log(err);
        res.send({ message: 3 });
      } else {
        if (users.matchedCount === 1) {
          res.send({ message: 4 }); // Password updated
        } else {
          res.send({ message: 0 });
        }
      }
    }
  );
};

// Get blogs of a user
const myblogs = (req, res) => {
  const userid = req.body.userid;
  Blog.find({ userId: userid }, (err, blogs) => {
    if (err) {
      console.log(err);
      res.send({ message: 0 });
    } else {
      res.send({ data: blogs });
    }
  });
};


const newuserCreated = async (req, res) => {
  const event = req.body;
  if (event.type === 'user.created' || event.type === 'user.updated') {
    await User.upsert({
      clerk_id: event.data.id,
      email: event.data.email_addresses[0].email_address,
      name: `${event.data.first_name} ${event.data.last_name}`,
      image_url: event.data.image_url
    });
  }
  
  res.status(200).end();
};

const savedPosts = async (req, res) => {
  try {
    const { postId, action } = req.body;
    const userId = req.user.id;
    
    const update = action === 'save' 
      ? { $addToSet: { savedPosts: postId } }
      : { $pull: { savedPosts: postId } };
    
    await User.findByIdAndUpdate(userId, update);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likedPosts =  async (req, res) => {
  try {
    const { postId, action } = req.body;
    const userId = req.user.id;
    
    const update = action === 'like' 
      ? { $addToSet: { likedPosts: postId } }
      : { $pull: { likedPosts: postId } };
    
    await User.findByIdAndUpdate(userId, update);
    
    // Also update the post's like count
    const postUpdate = action === 'like' 
      ? { $inc: { likes: 1 } }
      : { $inc: { likes: -1 } };
    
    await Post.findByIdAndUpdate(postId, postUpdate);
    
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;
    
    await User.findByIdAndUpdate(userId, {
      $addToSet: { commentedPosts: postId }
    });
    
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { getUserInfo, register, login, resetPassword, myblogs , newuserCreated,savedPosts , likedPosts , addComment};
