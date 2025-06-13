import mongoose from "mongoose";

const commentModel = new mongoose.Schema(
  {
    comments: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", commentModel);
