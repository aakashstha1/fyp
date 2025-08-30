import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    csvFileUrl: { type: String },
    csvFileName: { type: String },
    csvFilePublicId: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Assignment", assignmentSchema);
