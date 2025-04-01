import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // Reference to User
  username: String,
  comment: String,
  date: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export { Comment };
