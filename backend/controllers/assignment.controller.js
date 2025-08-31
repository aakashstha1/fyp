import Assignment from "../models/assignment.model.js";
import Course from "../models/course.model.js";
import fs from "fs";
import { uploadMedia, deleteMedia } from "../utils/cloudinary.js";
import { parseCsvFile } from "../utils/parseCsvFile.js";
// Create Assignment (single per course)
export const createAssignment = async (req, res) => {
  try {
    const { title } = req.body;
    const { courseId } = req.params;

    if (!title)
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });

    const course = await Course.findById(courseId);
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found!" });

    // Optional CSV or Excel upload
    let fileData = {};
    if (req.file) {
      const result = await uploadMedia(req.file.path);
      const questions = await parseCsvFile(req.file.path);
      fileData = {
        csvFileUrl: result.url,
        csvFileName: req.file.originalname,
        csvFilePublicId: result.public_id,
        questions,
      };
      fs.unlinkSync(req.file.path); // remove local file
    }

    const assignment = await Assignment.create({
      title,
      ...fileData,
    });

    // Set single assignment for course
    course.assignment = assignment._id;
    await course.save();

    res.status(201).json({
      success: true,
      assignment,
      message: "Assignment created successfully!",
    });
  } catch (error) {
    console.error("Create Assignment Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create assignment!" });
  }
};

// Update Assignment
export const updateAssignment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title } = req.body;

    // Fetch course with assignment
    const course = await Course.findById(courseId).populate("assignment");
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found!" });

    const assignment = course.assignment;
    if (!assignment)
      return res
        .status(404)
        .json({ success: false, message: "No assignment found to update!" });

    // Update title if provided
    if (title) assignment.title = title;

    // Handle new file upload
    if (req.file) {
      // Delete old file if exists
      if (assignment.csvFilePublicId) {
        await deleteMedia(assignment.csvFilePublicId);
      }

      const result = await uploadMedia(req.file.path);
      assignment.csvFileUrl = result.url;
      assignment.csvFileName = req.file.originalname;
      assignment.csvFilePublicId = result.public_id;

      fs.unlinkSync(req.file.path);
    }

    // Save updated assignment
    await assignment.save();

    res.status(200).json({
      success: true,
      assignment,
      message: "Assignment updated successfully!",
    });
  } catch (error) {
    console.error("Update Assignment Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update assignment!" });
  }
};

// Remove Assignment

export const removeAssignment = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate("assignment");
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found!" });

    if (!course.assignment)
      return res
        .status(404)
        .json({ success: false, message: "No assignment for this course!" });

    const assignment = course.assignment;

    if (assignment.csvFilePublicId) {
      await deleteMedia(assignment.csvFilePublicId);
    }

    await Assignment.findByIdAndDelete(assignment._id);

    // Unlink from course
    course.assignment = undefined;
    await course.save();

    res.status(200).json({
      success: true,
      message: "Assignment removed successfully!",
    });
  } catch (error) {
    console.error("Remove Assignment Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to remove assignment!" });
  }
};
// Get single assignment for course
export const getCourseAssignment = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate("assignment");
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found!" });

    res.status(200).json({ success: true, assignment: course.assignment });
  } catch (error) {
    console.error("Get Assignment Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get assignment!" });
  }
};
