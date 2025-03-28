import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  isAdmin: Boolean,
  name: String,
  enrollment: String,
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

export { User };
