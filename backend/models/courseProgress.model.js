// import mongoose from "mongoose";

// const lectureProgressSchema = new mongoose.Schema({
//   lectureId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Lecture",
//     required: true,
//   },
//   viewed: {
//     type: Boolean,
//     default: false,
//   },
// });

// const CourseProgressSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     courseId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Course",
//       required: true,
//     },
//     completed: {
//       type: Boolean,
//       default: false,
//     },
//     lectureProgress: [lectureProgressSchema],
//   },
//   {
//     timestamps: true,
//   }
// );

// export const CourseProgress = mongoose.model(
//   "CourseProgress",
//   CourseProgressSchema
// );

import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedLectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    completedAssignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
    },
  },

  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);
