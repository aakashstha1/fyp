// pages/CreatorCoursesPage.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { formatText } from "@/utils/textFormat";

function CreatorCourses() {
  const { creatorId } = useParams();
  const [courses, setCourses] = useState([]);
  const [creatorName, setCreatorName] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = "http://localhost:8000/api";

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/course/creator/${creatorId}`, {
        withCredentials: true,
      });
      const fetchedCourses = res.data.courses || [];
      setCourses(fetchedCourses);

      if (fetchedCourses.length > 0 && fetchedCourses[0].creator?.name) {
        setCreatorName(fetchedCourses[0].creator.name);
      } else {
        setCreatorName("Unknown Creator");
      }
      //   console.log(res);
    } catch (error) {
      console.error("Error fetching creator courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (creatorId) fetchCourses();
  }, [creatorId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <Loader2 className="animate-spin h-6 w-6 mr-2" /> Loading courses...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-2">
        Courses by <span className="font-bold">"{creatorName}"</span>
      </h1>
      <div className="border rounded-lg shadow-md bg-white dark:bg-gray-900">
        <Table>
          <TableHeader className="sticky top-0 bg-gray-50 dark:bg-gray-800 z-10 shadow-sm">
            <TableRow>
              <TableHead>S.N</TableHead>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Enrolled</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <TableRow key={course._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div className="w-14 h-10 overflow-hidden rounded-md border">
                      <img
                        src={course?.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{formatText(course?.category)}</TableCell>
                  <TableCell>
                    {course.price != null ? `Rs. ${course.price}` : "Free"}
                  </TableCell>
                  <TableCell>{course?.enrolledStudents?.length || 0}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                      {course?.averageRating
                        ? course?.averageRating.toFixed(1)
                        : "N/A"}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  No courses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default CreatorCourses;
