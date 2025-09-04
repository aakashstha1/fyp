import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    score: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Leaderboard", leaderboardSchema);
