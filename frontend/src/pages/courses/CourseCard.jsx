import React, { useEffect, useState } from "react";
import { Star, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

// const levelClassName = {
//   Beginner: "bg-green-200 text-green-800",
//   Intermediate: "bg-yellow-200 text-yellow-800",
//   Advanced: "bg-red-200 text-red-800",
// };

function CourseCard({ course }) {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;
    setIsEnrolled(
      course?.enrolledStudents?.some((id) => id === currentUser._id)
    );
  }, [course, currentUser]);

  return (
    <Card className="w-full min-w-[300px] min-h-[360px] flex flex-col justify-between text-sm">
      <CardHeader className="px-3">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-40 w-full object-cover rounded-md"
        />
      </CardHeader>

      <CardContent className="space-y-2 px-3 pb-2">
        <h1 className=" font-semibold text-lg truncate">{course.title}</h1>

        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={course.creator?.imageUrl || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>IN</AvatarFallback>
          </Avatar>
          <span className="text-xs">
            {course?.creator?.name || "Instructor"}
          </span>
        </div>

        <h2 className="font-semibold">${course.price?.toFixed(2) || "N/A"}</h2>

        <div className="flex items-center justify-between py-2">
          {/* <Badge
            className={`text-xs px-2 ${levelClassName[course.level] || ""}`}
          >
            {course.level || "N/A"}
          </Badge> */}
          <Badge className={"text-xs px-2"}>
            <Users /> {course?.enrolledStudents.length || "0"}
          </Badge>
          <p className="flex items-center gap-1 text-xs">
            <Star className="h-4 w-4 text-amber-500" fill="currentColor" />
            {course?.averageRating.toFixed(1) || "N/A"}
          </p>
        </div>

        <div className="flex flex-wrap gap-1">
          {(course.tags || []).slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full">
          {isEnrolled ? "Go To Lesson" : "Enroll Now"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CourseCard;
