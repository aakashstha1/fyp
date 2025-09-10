import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "@/components/ui/button";
import { ChevronsRight, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LatestCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const API_URL = "http://localhost:8000/api";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/course/courses`, {
          withCredentials: true,
        });
        const allCourses = res?.data?.publishedCourses || [];
        setCourses(allCourses.slice(0, 4)); // Only take first 4 courses
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  const skeletonCards = Array(4).fill(0); // 4 placeholder cards

  return (
    <div className="m-10">
      <div className="flex items-center mb-8 gap-3">
        <span className="w-1 h-8 bg-amber-500 rounded-sm"></span>
        <h1 className="text-3xl font-bold text-gray-800">Latest Courses</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? skeletonCards.map((_, idx) => (
              <Card
                key={idx}
                className="w-full flex flex-col justify-between animate-pulse"
              >
                <CardHeader>
                  <div className="h-40 w-full bg-gray-200 rounded-md"></div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-5 w-1/4 bg-gray-200 rounded"></div>
                  <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-4 w-10 bg-gray-200 rounded-full"></div>
                    <div className="h-4 w-10 bg-gray-200 rounded-full"></div>
                    <div className="h-4 w-10 bg-gray-200 rounded-full"></div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="h-8 w-full bg-gray-200 rounded"></div>
                </CardFooter>
              </Card>
            ))
          : courses.map((course, idx) => (
              <Card key={idx} className="w-full flex flex-col justify-between">
                <CardHeader>
                  <img
                    src={
                      course.thumbnail || "https://via.placeholder.com/300x150"
                    }
                    alt={course.title}
                    className="h-40 w-full object-cover rounded-md"
                  />
                </CardHeader>

                <CardContent className="space-y-3">
                  <h1 className="font-semibold text-lg truncate">
                    {course.title}
                  </h1>

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

      {!loading && (
        <div className="flex items-center justify-center mt-8">
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => navigate("/courses")}
          >
            View more <ChevronsRight />
          </Button>
        </div>
      )}
    </div>
  );
}

export default LatestCourses;
