import PurchasedCourse from "../models/purchasedCourse.model.js";
import Course from "../models/course.model.js";

export const getCreatorIncome = async (req, res) => {
  try {
    const creatorId = req.user.userId;

    // Check role
    if (req.user.role !== "instructor") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const courses = await Course.find({ creator: creatorId }).select("_id");
    const courseIds = courses.map((c) => c._id);

    // Daily aggregation
    const daily = await PurchasedCourse.aggregate([
      { $match: { course: { $in: courseIds }, status: "completed" } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$purchasedDate" },
          },
          totalIncome: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Weekly aggregation
    const weekly = await PurchasedCourse.aggregate([
      { $match: { course: { $in: courseIds }, status: "completed" } },
      {
        $group: {
          _id: { $isoWeek: "$purchasedDate" },
          totalIncome: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Monthly aggregation
    const monthly = await PurchasedCourse.aggregate([
      { $match: { course: { $in: courseIds }, status: "completed" } },
      {
        $group: {
          _id: { $month: "$purchasedDate" },
          totalIncome: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Format periods
    const formatDaily = daily.map((d) => ({
      period: new Date(d._id).toLocaleDateString("en-US", { weekday: "short" }), // Sun, Mon, ...
      income: d.totalIncome,
    }));

    const formatWeekly = weekly.map((w, i) => ({
      period: `Week ${i + 1}`,
      income: w.totalIncome,
    }));

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formatMonthly = monthly.map((m) => ({
      period: monthNames[m._id - 1],
      income: m.totalIncome,
    }));

    res.status(200).json({
      success: true,
      data: {
        daily: formatDaily,
        weekly: formatWeekly,
        monthly: formatMonthly,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllIncome = async (req, res) => {
  try {
    // Only allow admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    // Fetch all courses
    const courses = await Course.find().select("_id");
    const courseIds = courses.map((c) => c._id);

    // Daily aggregation
    const daily = await PurchasedCourse.aggregate([
      { $match: { course: { $in: courseIds }, status: "completed" } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$purchasedDate" },
          },
          totalIncome: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Weekly aggregation
    const weekly = await PurchasedCourse.aggregate([
      { $match: { course: { $in: courseIds }, status: "completed" } },
      {
        $group: {
          _id: { $isoWeek: "$purchasedDate" },
          totalIncome: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Monthly aggregation
    const monthly = await PurchasedCourse.aggregate([
      { $match: { course: { $in: courseIds }, status: "completed" } },
      {
        $group: {
          _id: { $month: "$purchasedDate" },
          totalIncome: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Format periods
    const formatDaily = daily.map((d) => ({
      period: new Date(d._id).toLocaleDateString("en-US", { weekday: "short" }),
      income: d.totalIncome,
    }));

    const formatWeekly = weekly.map((w, i) => ({
      period: `Week ${i + 1}`,
      income: w.totalIncome,
    }));

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formatMonthly = monthly.map((m) => ({
      period: monthNames[m._id - 1],
      income: m.totalIncome,
    }));

    res.status(200).json({
      success: true,
      data: {
        daily: formatDaily,
        weekly: formatWeekly,
        monthly: formatMonthly,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
