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

const CourseDataTable = ({ data }) => {
  return (
    <div className="border rounded shadow max-h-[600px] overflow-y-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-white dark:bg-gray-900 z-10">
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Enrolled Students</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((course, index) => (
              <TableRow key={course._id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="w-12 h-8 overflow-hidden rounded-sm">
                    <img
                      src={course.thumbnail || ""}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.category || "N/A"}</TableCell>
                <TableCell>
                  {course.price != null ? `$${course.price}` : "Free"}
                </TableCell>
                <TableCell>{course.creator?.name || "N/A"}</TableCell>
                <TableCell>{course.enrolledStudents?.length || 0}</TableCell>
                <TableCell>
                  {course.averageRating?.toFixed(1) || "N/A"}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Link to={`/admin/course/${course._id}`}>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 ">
                      View Detail
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
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
