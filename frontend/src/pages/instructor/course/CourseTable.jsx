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
// import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit, Plus, Trash2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    _id: "1",
    courseTitle: "React for Beginners",
    category: "web-development",
    coursePrice: 49.99,
    isPublished: true,
  },
  {
    _id: "2",
    courseTitle: "Advanced Python",
    category: "programming",
    coursePrice: 59.99,
    isPublished: false,
  },
  {
    _id: "3",
    courseTitle: "UI/UX Design Fundamentals",
    category: "design",
    coursePrice: null,
    isPublished: true,
  },
];

function CourseTable() {
  const navigate = useNavigate();
  //   const { data, isLoading } = useGetCreatorCourseQuery();

  //   if (isLoading) return <CustomLoader />;
  return (
    <div>
      <Button className="my-10" onClick={() => navigate("create")}>
        <Plus /> Add New Course
      </Button>
      <Table>
        <TableCaption>A list of course you have added.</TableCaption>
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
              <TableCell className="font-medium">
                {course?.courseTitle}
              </TableCell>
              <TableCell>
                {course?.category
                  ?.split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </TableCell>
              <TableCell>{course?.coursePrice || "NA"}</TableCell>
              <TableCell>{"NA"}</TableCell>
              <TableCell>{"NA"}</TableCell>
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
                  <Button className="bg-red-500 hover:bg-red-500 cursor-pointer">
                    <Trash2 />
                  </Button>
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
