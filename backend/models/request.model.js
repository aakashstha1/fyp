import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    documents: {
      frontImage: { type: String },
      backImage: { type: String },
      resumePdf: { type: String },
      qualificationsPdf: { type: String },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    rejectionDate: { type: Date },
    expiresAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Request", RequestSchema);
