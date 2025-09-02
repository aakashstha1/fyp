// components/UserTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { fromatText } from "@/utils/textFormat";

const CourseDataTable = ({ data }) => {
  return (
    <div className="border rounded-lg shadow-md bg-white dark:bg-gray-900">
      <Table>
        {/* Sticky header with shadow */}
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
            <TableHead className="text-right pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((course, index) => (
              <TableRow
                key={course._id || index}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {/* Serial Number */}
                <TableCell className="text-center font-medium text-gray-600 dark:text-gray-300">
                  {index + 1}
                </TableCell>

                {/* Thumbnail */}
                <TableCell>
                  <div className="w-14 h-10 overflow-hidden rounded-md shadow-sm border">
                    <img
                      src={course.thumbnail || ""}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TableCell>

                {/* Title */}
                <TableCell className="font-semibold text-gray-800 dark:text-gray-100">
                  {course.title}
                </TableCell>

                {/* Category */}
                <TableCell className="text-gray-600 dark:text-gray-300">
                  {fromatText(course?.category)}
                </TableCell>

                {/* Price */}
                <TableCell className="font-medium text-blue-600 dark:text-blue-400">
                  {course.price != null ? `Rs. ${course.price}` : "Free"}
                </TableCell>

                {/* Creator */}
                <TableCell className="text-gray-700 dark:text-gray-200">
                  {course.creator?.name || "N/A"}
                </TableCell>

                {/* Enrolled */}
                <TableCell className="text-gray-600 dark:text-gray-300">
                  {course.enrolledStudents?.length || 0}
                </TableCell>

                {/* Rating */}
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                    {course.averageRating
                      ? course.averageRating.toFixed(1)
                      : "N/A"}
                  </span>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right space-x-2">
                  <Link to={`/admin/course/${course._id}`}>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      View
                    </Button>
                  </Link>
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
  );
};

export default CourseDataTable;
