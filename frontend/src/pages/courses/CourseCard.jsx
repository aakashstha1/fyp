import React from "react";
import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const levelClassName = {
  Beginner: "bg-green-200 text-green-800",
  Intermediate: "bg-yellow-200 text-yellow-800",
  Advanced: "bg-red-200 text-red-800",
};

function CourseCard({ course }) {
  return (
    <Card className="w-full min-w-[290px] min-h-[360px] flex flex-col justify-between text-sm">
      <CardHeader className="p-3 h-28">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover rounded-md"
        />
      </CardHeader>

      <CardContent className="space-y-2 px-3 pb-2">
        <h1 className="font-semibold text-base truncate">{course.title}</h1>

        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-xs">{course.ownerName ?? "Instructor"}</span>
        </div>

        <h2 className="font-semibold">${course.price.toFixed(2)}</h2>

        <div className="flex items-center justify-between">
          <Badge className={`text-xs px-2 ${levelClassName[course.level]}`}>
            {course.level}
          </Badge>
          <p className="flex items-center gap-1 text-xs">
            <Star className="h-4 w-4 text-amber-500" fill="currentColor" />
            {course.rating}
          </p>
        </div>

        <div className="flex flex-wrap gap-1">
          {course.tags.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex gap-1 px-3">
        <Button className="w-1/2 h-8 text-xs">Buy</Button>
        <Button className="w-1/2 h-8 text-xs bg-red-600 hover:bg-red-500">
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CourseCard;
