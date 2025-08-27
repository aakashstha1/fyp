import React, { useState } from "react";
import CourseFilter from "./CourseFilter";
import CourseCard from "./CourseCard";
import { courseList } from "../../assets/staticData";

const COURSES_PER_PAGE = 16;

function Courses() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(courseList.length / COURSES_PER_PAGE);

  const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
  const endIndex = startIndex + COURSES_PER_PAGE;
  const paginatedCourses = courseList.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col p-8 gap-5">
      <div className="flex gap-5">
        <CourseFilter />
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
            {paginatedCourses.map((course, idx) => (
              <CourseCard key={idx} course={course} />
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-gray-800 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
