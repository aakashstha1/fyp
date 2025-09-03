import React, { useEffect, useMemo, useState } from "react";
import CourseFilter from "./CourseFilter";
import CourseCard from "./CourseCard";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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
  const [debouncedSearch] = useDebounce(searchText, 700);
  const [loading, setLoading] = useState(false);

  const [filterOpen, setFilterOpen] = useState(false); // ✅ mobile toggle

  const API_URL = "http://localhost:8000/api";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${API_URL}/course/filter-course`, {
          withCredentials: true,
          params: {
            search: debouncedSearch,
            sortBy,
            order,
            category,
            page: currentPage,
            limit: COURSES_PER_PAGE,
          },
        });

        setCourses(res.data.courses || []);
        setTotalPages(res.data.totalPages || 1);

        if (!res.data.courses) {
          const defaultCourses = await axios.get(`${API_URL}/course/courses`, {
            withCredentials: true,
          });
          setCourses(defaultCourses.data.publishedCourses || []);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [debouncedSearch, sortBy, order, category, currentPage]);

  const paginationButtons = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 border rounded ${
            currentPage === i + 1 ? "bg-gray-800 text-white" : ""
          }`}
        >
          {i + 1}
        </button>
      )),
    [totalPages, currentPage]
  );

  return (
    <div className="flex flex-col p-2 sm:p-8 gap-5">
      {/* Mobile filter toggle */}
      <div className="sm:hidden flex justify-end">
        <Button
          variant="outline"
          onClick={() => setFilterOpen(true)}
          className="mb-4"
        >
          Filters
        </Button>
      </div>

      <div className="flex gap-5">
        {/* Desktop Filter */}
        <div className="hidden sm:block w-64 shrink-0">
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
        </div>

        {/* Courses grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
            {loading
              ? Array.from({ length: COURSES_PER_PAGE }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between w-full min-w-[280px] min-h-[360px] border rounded-lg p-3"
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
              : courses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
          </div>

          {/* Pagination */}
          {!loading && courses.length > 0 && (
            <div className="flex justify-center mt-8 gap-2 flex-wrap">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              {paginationButtons}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}

          {/* No results */}
          {!loading && courses.length === 0 && (
            <div className="w-full h-full flex justify-center items-center py-20">
              <p className="text-gray-600 text-xl font-semibold text-center">
                No results match your search 😔
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div className="w-4/5 max-w-xs bg-white h-full shadow-lg p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setFilterOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
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
          </div>
          <div className="flex-1" onClick={() => setFilterOpen(false)}></div>
        </div>
      )}
    </div>
  );
}

export default Courses;
