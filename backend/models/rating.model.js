import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    rater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    stars: { type: Number, required: true, min: 1, max: 5 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Rating", ratingSchema);
