import mongoose from "mongoose";

const threadModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    threadTitle: {
      type: String,
      required: true,
    },
    threadContect: {
      type: String,
      required: true,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Thread", threadModel);
