import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  score: {
    type: Number,
  },
  total: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("Leaderboard", leaderboardSchema);
