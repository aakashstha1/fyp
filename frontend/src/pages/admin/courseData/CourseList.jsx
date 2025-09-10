// components/CourseList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CourseDataTable from "./courseDataTable";
import { Loader2 } from "lucide-react";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sortBy, setSortBy] = useState("none");
  const [sortOrder, setSortOrder] = useState("high");
  const [totalCourses, setTotalCourses] = useState(0);

  const API_URL = "http://localhost:8000/api";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/admin/course-list`, {
          withCredentials: true,
        });
        setCourses(res.data.courses || []);
        setFilteredCourses(res.data.courses || []);
        setTotalCourses(res.data.courses.length || 0);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    let sorted = [...courses];
    const multiplier = sortOrder === "high" ? -1 : 1;

    if (sortBy === "enrolled") {
      sorted.sort(
        (a, b) =>
          multiplier *
          ((a.enrolledStudents?.length || 0) -
            (b.enrolledStudents?.length || 0))
      );
    } else if (sortBy === "rating") {
      sorted.sort(
        (a, b) => multiplier * ((a.averageRating || 0) - (b.averageRating || 0))
      );
    } else if (sortBy === "price") {
      sorted.sort((a, b) => multiplier * ((a.price || 0) - (b.price || 0)));
    }

    setFilteredCourses(sorted);
  }, [sortBy, sortOrder, courses]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <Loader2 className="animate-spin h-6 w-6 mr-2" /> Loading courses...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Title & Count */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          All Courses
        </h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Total:{" "}
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {totalCourses}
          </span>
        </span>
      </div>

      {/* Sorting Controls */}
      <div className="mb-4 flex flex-wrap items-center gap-10 text-sm">
        {/* Sort by */}
        <div>
          <h2 className="font-semibold text-lg">Sort by:</h2>
          <RadioGroup
            defaultValue="none"
            onValueChange={setSortBy}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <label htmlFor="none">Default</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="enrolled" id="enrolled" />
              <label htmlFor="enrolled">Enrolled</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rating" id="rating" />
              <label htmlFor="rating">Rating</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price" id="price" />
              <label htmlFor="price">Price</label>
            </div>
          </RadioGroup>
        </div>

        {/* Order */}
        <div>
          <h2 className="font-semibold text-lg">Order:</h2>
          <RadioGroup
            defaultValue="high"
            onValueChange={setSortOrder}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="high" />
              <label htmlFor="high">High → Low</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="low" />
              <label htmlFor="low">Low → High</label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Table */}
      <CourseDataTable data={filteredCourses} />
    </div>
  );
}

export default CourseList;
