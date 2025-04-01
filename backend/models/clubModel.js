import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
  clubName: { type: String, required: true },
  clubID: { type: String, required: true, unique: true },
  clubInfo: { type: String, required: true }, // Detailed description of the club
  clubCouncil: [
    {
      name: String,
      role: String,
    },
  ], // Array of council members
  clubNews: [
    {
      title: String,
      description: String,
      date: { type: Date, default: Date.now },
    },
  ], // Array of club news posts
});

const Club = mongoose.model("Club", clubSchema);

export { Club };
