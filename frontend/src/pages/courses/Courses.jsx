import React, { useEffect, useState } from "react";
import CourseFilter from "./CourseFilter";
import CourseCard from "./CourseCard";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "react-router-dom";

const COURSES_PER_PAGE = 16;

function Courses() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("search") || "";

  const [searchText, setSearchText] = useState(initialSearch);
  const [courses, setCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortBy, setSortBy] = useState("price");
  const [order, setOrder] = useState("desc");
  const [category, setCategory] = useState("all");

  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:8000/api";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/course/filter-course`, {
          withCredentials: true,
          params: {
            search: searchText,
            sortBy,
            order,
            category,
            page: currentPage,
            limit: COURSES_PER_PAGE,
          },
        });

        setCourses(res.data.courses || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [searchText, sortBy, order, category, currentPage]);

  return (
    <div className="flex flex-col p-8 gap-5 ">
      <div className="flex gap-5">
        <CourseFilter
          searchText={searchText}
          setSearchText={setSearchText}
          sortBy={sortBy}
          setSortBy={setSortBy}
          order={order}
          setOrder={setOrder}
          category={category}
          setCategory={setCategory}
        />
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch ">
            {loading
              ? Array.from({ length: COURSES_PER_PAGE }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between w-full min-w-[300px] min-h-[360px] border rounded-lg p-3"
                  >
                    <Skeleton className="h-40 w-full rounded-md" />
                    <div className="flex flex-col gap-2 mt-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/4" />
                      <div className="flex justify-between mt-2">
                        <Skeleton className="h-5 w-1/4" />
                        <Skeleton className="h-5 w-1/4" />
                      </div>
                    </div>
                    <Skeleton className="h-10 w-full mt-3" />
                  </div>
                ))
              : courses.map((course, idx) => (
                  <CourseCard key={idx} course={course} />
                ))}
          </div>

          {/* Pagination */}
          {!loading && courses.length > 0 && (
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
          )}
        </div>
        {!loading && courses.length === 0 && (
          <div className="w-full h-full justify-center items-center py-20">
            <p className="text-gray-600 text-xl font-semibold text-center">
              No results match your search 😔
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
