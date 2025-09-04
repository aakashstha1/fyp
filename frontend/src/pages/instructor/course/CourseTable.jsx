// import CustomLoader from "@/components/CustomLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
// import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function CourseTable() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  // const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:8000/api";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_URL}/course/my-courses`, {
          withCredentials: true,
        });
        // console.log(res);
        setCourses(res.data?.courses);
      } catch (error) {
        console.error(error);
        toast.error(
          error?.response?.data?.message || "Failed to create course!"
        );
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`${API_URL}/course/${courseId}`, {
        withCredentials: true,
      });

      // Update local state to remove deleted course
      setCourses((prev) => prev.filter((c) => c._id !== courseId));

      toast.success("Course deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to delete course!");
    }
  };

  return (
    <div>
      <Button className="my-10" onClick={() => navigate("create")}>
        <Plus /> Add New Course
      </Button>
      <Table>
        <TableCaption>
          {courses.length <= 0 ? (
            <p> No courses added yet</p>
          ) : (
            <p> A list of course you have added.</p>
          )}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-100">Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Enrolled Students</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">{course?.title}</TableCell>
              <TableCell>
                {course?.category
                  ?.split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </TableCell>
              <TableCell>{course?.price || "NA"}</TableCell>
              <TableCell>{course?.enrolledStudents.length || "0"}</TableCell>
              <TableCell>{course?.averageRating.toFixed(1) || "0.0"}</TableCell>
              <TableCell>
                <Badge
                  className={`text-white py-1 rounded-md font-semibold border-1 border-gray-100 outline-1 w-20 text-center ${
                    course?.isPublished
                      ? "bg-green-500 outline-green-500 "
                      : "bg-gray-500  outline-gray-500"
                  }`}
                >
                  {course?.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    className="bg-blue-500 hover:bg-blue-500 cursor-pointer"
                    onClick={() => navigate(`edit/${course._id}`)}
                  >
                    <Edit />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="bg-red-500 hover:bg-red-600 cursor-pointer">
                        <Trash2 />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the course and remove all related lectures,
                          assignments, and enrolled students’ access.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => handleDelete(course._id)}
                        >
                          Yes, Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CourseTable;
