import mongoose from "mongoose";

const clubAdminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clubID: { type: String, required: true }, // Club the admin manages
});

const ClubAdmin = mongoose.model("ClubAdmin", clubAdminSchema);

export { ClubAdmin };

