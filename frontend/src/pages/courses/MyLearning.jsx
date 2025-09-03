import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function MyLearning() {
  // const [loading, setLoading] = useState(false);
  const API_URL = "http://localhost:8000/api";

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const res = await axios.get(`${API_URL}/enroll/enrolled-courses`, {
        withCredentials: true,
      });
      

      setCourses(res?.data?.enrolledCourses);
    };
    fetchEnrolledCourses();
  }, []);
  return (
    <div className="max-w-7xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-bold text-3xl">My Learning</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
        {courses.length === 0 ? (
          <div className="col-span-full flex flex-col gap-5 justify-center items-center h-40">
            <p className="text-xl text-center text-gray-600">
              You have not enrolled in any course yet.
            </p>
            <Link to={"/courses"}>
              <Button>
                Enroll now
                <ArrowRight />
              </Button>
            </Link>
          </div>
        ) : (
          courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))
        )}
      </div>
    </div>
  );
}

export default MyLearning;

// // My Learning Courses Skeleton
// function MyCourseSkeleton() {
//   return (
//     <Card className="overflow-hidden rounded-xl shadow-md w-full max-w-sm p-0">
//       {/* Thumbnail Skeleton */}
//       <Skeleton className="w-full h-40" />

//       {/* Content Skeleton */}
//       <CardContent className="space-y-3 pb-5">
//         {/* Title */}
//         <Skeleton className="h-4 " />

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2 mt-2">
//           <Skeleton className="h-5 w-18 rounded-md" />
//           <Skeleton className="h-5 w-18 rounded-md" />
//           <Skeleton className="h-5 w-18 rounded-md" />
//         </div>

//         {/* Instructor & Review */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Skeleton className="h-8 w-8 rounded-full" />
//             <Skeleton className="h-4 w-24" />
//           </div>
//         </div>

//         {/* Price */}
//         <Skeleton className="h-6 mx-auto" />
//       </CardContent>
//     </Card>
//   );
// }
