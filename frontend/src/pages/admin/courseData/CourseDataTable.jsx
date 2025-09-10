// components/CourseDataTable.jsx
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatText } from "@/utils/textFormat";

const CourseDataTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Slice data for current page
  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div>
      <div className="border rounded-lg shadow-md bg-white dark:bg-gray-900">
        <Table>
          <TableHeader className="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10 shadow-sm">
            <TableRow>
              <TableHead className="w-12 text-center">S.N</TableHead>
              <TableHead className="w-20">Thumbnail</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead>Enrolled</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentData.length > 0 ? (
              currentData.map((course, index) => (
                <TableRow
                  key={course._id || index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <TableCell className="text-center font-medium text-gray-600 dark:text-gray-300">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="w-14 h-10 overflow-hidden rounded-md shadow-sm border">
                      <img
                        src={course.thumbnail || ""}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-gray-800 dark:text-gray-100">
                    {course.title}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {formatText(course?.category)}
                  </TableCell>
                  <TableCell className="font-medium text-blue-600 dark:text-blue-400">
                    {course.price != null ? `Rs. ${course.price}` : "Free"}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-200">
                    {course.creator?.name || "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {course.enrolledStudents?.length || 0}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                      {course.averageRating
                        ? course.averageRating.toFixed(1)
                        : "N/A"}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No courses yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={goToPrevPage} disabled={currentPage === 1} size="sm">
            Previous
          </Button>
          <span className="flex items-center px-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            size="sm"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseDataTable;
