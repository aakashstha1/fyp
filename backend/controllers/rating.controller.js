import mongoose from "mongoose";
import Rating from "../models/rating.model.js";
import Course from "../models/course.model.js";

// Submit a rating
export const submitRating = async (req, res) => {
  try {
    const { courseId, stars } = req.body;
    const userId = req.user.userId;

    if (!stars || stars < 1 || stars > 5) {
      return res.status(400).json({ message: "Stars must be between 1 and 5" });
    }

    let course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Check if user already rated this course
    let rating = await Rating.findOne({ course: courseId, rater: userId });

    if (rating) {
      // Update previous rating
      const difference = stars - rating.stars;
      rating.stars = stars;
      await rating.save();

      // Update course average
      course.averageRating =
        (course.averageRating * course.ratingsCount + difference) /
        course.ratingsCount;
      await course.save();
    } else {
      // Create new rating
      rating = await Rating.create({ course: courseId, rater: userId, stars });

      // Update course average
      course.averageRating =
        (course.averageRating * course.ratingsCount + stars) /
        (course.ratingsCount + 1);
      course.ratingsCount += 1;
      await course.save();
    }

    res.json({
      message: "Rating submitted",
      averageRating: course.averageRating,
      ratingsCount: course.ratingsCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all ratings for a course
export const getCourseRatings = async (req, res) => {
  try {
    const { courseId } = req.params;

    const ratings = await Rating.find({ course: courseId }).populate(
      "rater",
      "name email"
    );

    res.json({ ratings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get average rating for a course
export const getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.params;

    const result = await Rating.aggregate([
      { $match: { course: new mongoose.Types.ObjectId(courseId) } },
      {
        $group: {
          _id: "$course",
          averageStars: { $avg: "$stars" },
          count: { $sum: 1 },
        },
      },
    ]);

    if (result.length === 0) return res.json({ averageStars: 0, count: 0 });

    res.json({ averageStars: result[0].averageStars, count: result[0].count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
