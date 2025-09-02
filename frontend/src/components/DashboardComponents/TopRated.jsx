import axios from "axios";
import React, { useEffect, useState } from "react";

function TopRatedCourses() {
  const API_URL = "http://localhost:8000/api";
  const [topRatedCourses, setTopRatedCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin/top-rated-courses`, {
          withCredentials: true,
        });
        setTopRatedCourses(res?.data?.topCourses || []);
      } catch (error) {
        console.error("Error fetching top-rated courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const getRankColor = (index) => {
    switch (index) {
      case 0:
        return "bg-yellow-400 text-white"; // Gold
      case 1:
        return "bg-gray-300 text-black"; // Silver
      case 2:
        return "bg-yellow-700 text-white"; // Bronze
      default:
        return "bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-200"; // Default
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Top Rated Courses
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                Rank
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                Course Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                Instructor
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                Rating
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                Reviews
              </th>
            </tr>
          </thead>
          <tbody>
            {topRatedCourses.map((course, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="py-3 px-4">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${getRankColor(
                      index
                    )}`}
                  >
                    {index + 1}
                  </div>
                </td>
                <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-100">
                  {course?.title}
                </td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                  {course?.creator?.name}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                      {course?.averageRating.toFixed(1)}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                  {course?.ratingsCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopRatedCourses;
