import Course from "../models/course.model.js";
import { uploadMedia } from "../utils/cloudinary.js";
//Create new course
export const createCourse = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, category, tags } = req.body;

    if (!title || !category || !tags?.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = new Course({
      title,
      category,
      tags,
      creator: userId,
    });

    await course.save();

    return res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get all published courses
export const getPublishedCourse = async (req, res) => {
  try {
    const publishedCourses = await Course.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .select("title subtitle tags category price thumbnail rating creator")
      .populate("creator", "name");

    return res.status(200).json({
      success: true,
      message: "Fetched published courses successfully",
      publishedCourses,
    });
  } catch (error) {
    console.error("Get Published Courses Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//Getcourse by Course Id
export const getCourseById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { courseId } = req.params;

    // Find course and ensure it belongs to the logged-in user
    const course = await Course.findOne({ _id: courseId, creator: userId });

    if (!course) {
      return res
        .status(404)
        .json({ message: "Course not found or not authorized" });
    }

    return res.status(200).json({
      message: "Course fetched successfully",
      course,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

//Get course by Creator Id
export const getCourseByUserId = async (req, res) => {
  try {
    const userId = req.user.userId;
    const courses = await Course.find({ creator: userId });
    return res.status(200).json({
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses by user:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

//Update course
export const updateCourse = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { courseId } = req.params;
    const { title, subtitle, category, tags, price } = req.body;
    const imageFile = req.file;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.creator.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this course" });
    }

    // Update fields
    course.title = title || course.title;
    course.subtitle = subtitle || course.subtitle;
    course.category = category || course.category;
    course.tags = tags || course.tags;
    course.price = price || course.price;

    if (imageFile) {
      const uploadResponse = await uploadMedia(imageFile.path);
      course.thumbnail = uploadResponse.secure_url;
    }

    await course.save();

    return res.status(200).json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

//Publish unpublish logic
export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    course.isPublished = publish === "true";
    await course.save();

    const statusMsg = course.isPublished ? "published" : "unpublished";
    return res.status(200).json({ message: `Course is ${statusMsg}.` });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update status!" });
  }
};
