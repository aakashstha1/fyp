import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "@/components/ui/button";
import { ChevronsRight, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LatestCourses() {
  const [courses, setCourses] = useState([]);
  const API_URL = "http://localhost:8000/api";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_URL}/course/courses`, {
          withCredentials: true,
        });
        const allCourses = res?.data?.publishedCourses || [];
        setCourses(allCourses.slice(0, 4)); // Only take first 4 courses
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="m-10">
      <div className="flex items-center mb-8 gap-3">
        <span className="w-1 h-8 bg-amber-500 rounded-sm"></span>
        <h1 className="text-3xl font-bold text-gray-800">Latest Courses</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course, idx) => (
          <Card key={idx} className="w-full flex flex-col justify-between">
            <CardHeader>
              <img
                src={course.thumbnail || "https://via.placeholder.com/300x150"}
                alt={course.title}
                className="h-40 w-full object-cover rounded-md"
              />
            </CardHeader>

            <CardContent className="space-y-3">
              <h1 className="font-semibold text-lg truncate">{course.title}</h1>

              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={course?.creator?.imageUrl}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {course?.creator?.name
                      ? course.creator.name.charAt(0)
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <span>{course?.creator?.name || "Instructor"}</span>
              </div>

              <h2 className="font-semibold text-xl">
                Rs. {course?.price?.toFixed(2) || "N/A"}
              </h2>

              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2">
                  <Star
                    className="h-5 w-5 text-amber-500"
                    fill="currentColor"
                  />
                  {course?.averageRating
                    ? course.averageRating.toFixed(1)
                    : "N/A"}
                </p>
              </div>

              <p className="flex flex-wrap gap-2">
                {(course.tags || []).slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="inline-block text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </p>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full cursor-pointer"
                onClick={() => navigate(`/course/${course._id}`)}
              >
                Course Overview
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center mt-8">
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() => navigate("/courses")}
        >
          View more <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}

export default LatestCourses;
