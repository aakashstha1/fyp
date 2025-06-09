import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    questionText: {
      type: String,
      require: true,
    },
    options: [
      {
        type: String,
        require: true,
      },
    ],
    correctAnswer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
