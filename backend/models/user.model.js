import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["enrollee", "instructor", "admin"],
      default: "enrollee",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    documents: {
      citizenshipFront: { type: String },
      citizenshipBack: { type: String },
      resume: { type: String },
      educationPdf: { type: String },
    },
    verificationStatus: {
      type: String,
      enum: ["none", "pending", "approved", "rejected"],
      default: "none",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
