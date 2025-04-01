import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  isAdmin: Boolean,
  name: String,
  enrollment: String,
  username: String,
  password: String,
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], 
});


const User = mongoose.model("User", userSchema);

export { User };
