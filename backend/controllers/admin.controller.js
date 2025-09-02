import Course from "../models/course.model.js";

//  Top 10 Courses by Rating
export const topRatedCourses = async (req, res) => {
  try {
    const query = {};
    // console.log("user", req.user);
    // If logged-in user is an instructor -> only fetch their courses
    if (req.user.role === "instructor") {
      query.creator = req.user.userId;
    }
    // console.log("query", query);
    const topCourses = await Course.find(query)
      .sort({ averageRating: -1 }) // use correct field
      .limit(10)
      .populate("creator", "name");

    res.status(200).json({ success: true, topCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//  Top 10 Courses by Enrollment
export const mostEnrolledCourses = async (req, res) => {
  try {
    const query = {};

    if (req.user.role === "instructor") {
      query.creator = req.user.userId;
    }

    const topCourses = await Course.find(query)
      // enrollment is an array, so we sort by length
      .sort({ "enrolledStudents.length": -1 })
      .limit(10)
      .populate("creator", "name");

    res.status(200).json({ success: true, topCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Top 10 Contributors (Instructors)
export const topContributors = async (req, res) => {
  try {
    // Aggregate courses grouped by creator
    const contributors = await Course.aggregate([
      { $match: { isPublished: true } }, // only published courses
      {
        $group: {
          _id: "$creator", // group by creator
          coursesCreated: { $sum: 1 },
        },
      },
      { $sort: { coursesCreated: -1 } }, // sort descending
      { $limit: 10 }, // top 10
    ]);

    // Populate creator details
    const populatedContributors = await Course.populate(contributors, {
      path: "_id",
      select: "name imageUrl", // include name and optional image
      model: "User",
    });

    // Map to frontend-friendly structure
    const result = populatedContributors.map((c) => ({
      userId: c._id._id, // user ID
      name: c._id.name, // user name
      imageUrl: c._id.imageUrl || null, // optional image
      coursesCreated: c.coursesCreated,
    }));

    res.status(200).json({ success: true, contributors: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
