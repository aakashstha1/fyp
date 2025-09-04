import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: { type: String, required: true },
    csvFileUrl: { type: String },
    csvFileName: { type: String },
    csvFilePublicId: { type: String },

    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        answer: { type: String }, // e.g., "A", "B", "C"
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Question", questionSchema);
