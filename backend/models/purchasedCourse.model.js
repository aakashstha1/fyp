import mongoose from "mongoose";
const purchasedCourseSchema = new mongoose.Schema(
  {
    enrollee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    purchasedDate: { type: Date, default: Date.now },
    paymentMethod: {
      type: String,
      enum: ["esewa", "khalti"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("PurchasedCourse", purchasedCourseSchema);

// import mongoose from "mongoose";
// const purchasedCourseSchema = new mongoose.Schema(
//   {
//     enrollee: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     course: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Course",
//       required: true,
//     },
//     totalPrice: {
//       type: Number,
//       required: true,
//     },
//     purchasedDate: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("PurchasedCourse", purchasedCourseSchema);
