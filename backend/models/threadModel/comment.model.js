import mongoose from "mongoose";

const commentModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    threadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", commentModel);
