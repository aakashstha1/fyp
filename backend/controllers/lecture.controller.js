import Lecture from "../models/lecture.model.js";
import Course from "../models/course.model.js";
import { deleteVideo, uploadMedia } from "../utils/cloudinary.js";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import path from "path";
import fs from "fs";
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

//Create new lecture
export const createLecture = async (req, res) => {
  try {
    const { lectureTitle, isPreviewFree, videoInfo } = req.body;
    // console.log(lectureTitle, isPreviewFree, videoInfo);
    const { courseId } = req.params;

    if (!courseId) {
      return res
        .status(400)
        .json({ success: false, message: "Course ID is required!" });
    }
    if (!lectureTitle) {
      return res
        .status(400)
        .json({ success: false, message: "Lecture title is required!" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found!" });
    }

    const lecture = await Lecture.create({
      lectureTitle,
      isPreviewFree: isPreviewFree ?? false,
      videoUrl: videoInfo?.url || null,
      publicId: videoInfo?.public_id || null,
    });

    course.lectures.push(lecture._id);
    await course.save();

    return res.status(201).json({
      success: true,
      lecture,
      message: "Lecture created successfully!",
    });
  } catch (error) {
    console.error("Error creating lecture:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create lecture!",
    });
  }
};

// Upload media
// export const uploadVideo = async (req, res) => {
//   try {
//     const result = await uploadMedia(req.file.path);
//     res.status(200).json({
//       success: true,
//       message: "File uploaded successfully!",
//       data: result,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Error occured!",
//     });
//   }
// };

export const uploadVideo = async (req, res) => {
  try {
    const inputPath = req.file.path; // multer file path
    const outputPath = path.join("uploads", `compressed-${Date.now()}.mp4`);

    // Compress or re-encode with ffmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          "-c:v libx264", // H.264 encoding
          "-crf 18", // quality (lower = better, 18–23 is visually lossless)
          "-preset veryfast",
          "-c:a copy", // keep audio untouched
        ])
        .save(outputPath)
        .on("end", resolve)
        .on("error", reject);
    });

    // Upload processed video instead of raw
    const result = await uploadMedia(outputPath);

    // cleanup local files
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);
    // console.log(result);

    // console.log(result);
    res.status(200).json({
      success: true,
      message: "File uploaded successfully!",
      data: result, // { url, public_id }
    });
  } catch (error) {
    console.error("FFmpeg error:", error);
    res.status(500).json({
      message: "Error while processing video!",
    });
  }
};

//Get lectures
export const getCourseLectures = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Cannot find the course!",
      });
    }

    return res.status(200).json({
      success: true,
      lectures: course?.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get lectures!",
    });
  }
};

// Update Lecture
export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, isPreviewFree, videoInfo } = req.body;
    const { courseId, lectureId } = req.params;

    // 1. Find the lecture
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found!",
      });
    }
    // console.log(videoInfo);
    // 2. Delete previous video if a new video is uploaded
    if (
      videoInfo?.publicId &&
      lecture.publicId &&
      lecture.publicId !== videoInfo.publicId
    ) {
      await deleteVideo(lecture.publicId);
    }

    // 3. Update lecture fields if provided
    if (lectureTitle !== undefined) lecture.lectureTitle = lectureTitle;
    if (typeof isPreviewFree === "boolean")
      lecture.isPreviewFree = isPreviewFree;
    if (videoInfo) {
      if (videoInfo.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
      if (videoInfo.publicId) lecture.publicId = videoInfo.publicId;
      if (videoInfo.videoName) lecture.videoName = videoInfo.videoName;
    }

    // 4. Save lecture
    await lecture.save();

    // 5. Ensure the course contains this lecture
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(200).json({
      success: true,
      lecture,
      message: "Lecture updated successfully!",
    });
  } catch (error) {
    console.error("Edit Lecture Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update lecture!",
    });
  }
};

//Remove lecture
export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }

    // Delete lecture from cloudinary
    if (lecture.publicId) {
      await deleteVideo(lecture.publicId);
    }

    //Remove the lecture refrence from associated course
    await Course.updateOne(
      { lectures: lectureId }, //find course that contain lectureId
      { $pull: { lectures: lectureId } } //Remove the lectureId from lectures array
    );

    return res.status(200).json({
      message: "Lecture removed successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove lecture!",
    });
  }
};

//Get single Lecture
export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }

    return res.status(200).json({
      success: true,
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get lecture!",
    });
  }
};
