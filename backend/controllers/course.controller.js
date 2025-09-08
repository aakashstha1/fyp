import Course from "../models/course.model.js";
import User from "../models/user.model.js";
import PurchasedCourse from "../models/purchasedCourse.model.js";
import Lecture from "../models/lecture.model.js";
import Assignment from "../models/assignment.model.js";

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
      .populate("creator", "name imageUrl");

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

//Get course by Creator Id for creator
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
    const { title, description, category, tags, price } = req.body;
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
    course.description = description || course.description;
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

//Get single  published course by Id
export const getPublishedCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId)
      .populate("lectures")
      .populate("creator", "name imageUrl")
      .populate("assignment")
      .lean();

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Course fetched succesfully!", course });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update status!" });
  }
};

//get Searched Courses
export const getSearchedCourses = async (req, res) => {
  try {
    const {
      search = "",
      category = "all",
      sortBy = "price",
      order = "desc",
      page = 1,
      limit = 16,
    } = req.query;

    const skip = (page - 1) * limit;

    // Build filter
    const filter = { isPublished: true };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } }, // search in title
        { tags: { $regex: search, $options: "i" } }, // search in tags
      ];
    }
    if (category !== "all") {
      filter.category = category;
    }
    // console.log(filter);

    // Build sort
    let sort = {};
    if (sortBy === "price") sort.price = order === "asc" ? 1 : -1;
    else if (sortBy === "rating") sort.averageRating = order === "asc" ? 1 : -1;

    // Query courses
    const courses = await Course.find(filter)
      .sort(sort)
      .skip(Number(skip))
      .limit(Number(limit))
      .populate("creator", "name imageUrl");

    const total = await Course.countDocuments(filter);

    res.status(200).json({
      success: true,
      totalCourses: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      courses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Check if user exists and is admin
    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admins only." });
    }

    // Fetch all published courses
    const courses = await Course.find({ isPublished: true })
      .populate("creator", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Error in getAllCourses:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//get recommended course
export const getRecommendedCourses = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const userNiches = user.niches.filter(Boolean);
    if (!userNiches.length) {
      return res.status(400).json({
        success: false,
        message: "No niches selected for this user",
      });
    }

    const nicheRegexes = userNiches.map((n) => new RegExp(n, "i"));

    const recommendedCourses = await Course.aggregate([
      {
        $match: {
          isPublished: true,
          $or: [
            { tags: { $elemMatch: { $in: nicheRegexes } } },
            { category: { $in: nicheRegexes } },
            { title: { $in: nicheRegexes } },
          ],
        },
      },
      { $sample: { size: 10 } },
      {
        $lookup: {
          from: "users", // collection name
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: "$creator" },
      {
        $project: {
          title: 1,
          price: 1,
          category: 1,
          tags: 1,
          thumbnail: 1,
          averageRating: 1,
          enrolledStudents: 1,
          "creator.name": 1,
          "creator.imageUrl": 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      total: recommendedCourses.length,
      courses: recommendedCourses,
    });
  } catch (error) {
    console.error("Error fetching recommended courses:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getCourseLectures = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.userId;

    // Fetch the course with lectures & assignments
    const course = await Course.findById(courseId)
      .populate("lectures")
      .populate("assignment");

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // Check if user is creator
    if (course.creator.toString() === userId) {
      return res.status(200).json({ success: true, course });
    }

    // Check if user purchased the course
    const purchase = await PurchasedCourse.findOne({
      enrollee: userId,
      course: courseId,
    });

    if (!purchase) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this course",
      });
    }

    return res.status(200).json({ success: true, course });
  } catch (error) {
    console.error("Error fetching course lectures:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Remove Course
export const deleteCourse = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { courseId } = req.params;

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // Verify authorization (creator or admin)
    const user = await User.findById(userId);
    if (course.creator.toString() !== userId && user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this course",
      });
    }

    // Delete related lectures
    if (course.lectures?.length) {
      await Lecture.deleteMany({ _id: { $in: course.lectures } });
    }

    // Delete related assignments
    if (course.assignment?.length) {
      await Assignment.deleteMany({ _id: { $in: course.assignment } });
    }

    // Delete purchases of this course
    await PurchasedCourse.deleteMany({ course: courseId });

    // Finally delete the course itself
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course and related data deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
