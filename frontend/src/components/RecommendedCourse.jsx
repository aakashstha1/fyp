import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import { ChevronsRight, ShoppingCart, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const courseList = [
  {
    title: "Full Stack Web Development with MERN",
    price: 199.99,
    rating: 4.7,
    tags: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
    level: "Intermediate",
    thumbnail:
      "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?cs=srgb&dl=pexels-thatguycraig000-1563356.jpg&fm=jpg",
  },
  {
    title: "Introduction to Data Science",
    price: 149.99,
    rating: 4.5,
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Jupyter"],
    level: "Beginner",
    thumbnail:
      "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?cs=srgb&dl=pexels-thatguycraig000-1563356.jpg&fm=jpg",
  },
  {
    title: "Advanced UI/UX Design",
    price: 129.0,
    rating: 4.8,
    tags: ["Figma", "Wireframing", "Prototyping", "User Research"],
    level: "Advanced",
    thumbnail:
      "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?cs=srgb&dl=pexels-thatguycraig000-1563356.jpg&fm=jpg",
  },
  {
    title: "Advanced UI/UX Design",
    price: 129.0,
    rating: 4.8,
    tags: ["Figma", "Wireframing", "Prototyping", "User Research"],
    level: "Advanced",
    thumbnail:
      "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?cs=srgb&dl=pexels-thatguycraig000-1563356.jpg&fm=jpg",
  },
];

const levelClassName = {
  Beginner: "bg-green-200 text-green-800",
  Intermediate: "bg-yellow-200 text-yellow-800",
  Advanced: "bg-red-200 text-red-800",
};

function RecommendedCourse() {
  return (
    <div className="m-10">
      <div className="flex items-center mb-8 gap-3">
        <span className="w-1 h-8 bg-amber-500 rounded-sm"></span>
        <h1 className="text-3xl font-bold text-gray-800">Suggested Course</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {courseList.map((course, idx) => (
          <Card key={idx} className="w-full flex flex-col jutify-between">
            <CardHeader>
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-40 w-full object-cover rounded-md"
              />
            </CardHeader>
            <CardContent className="space-y-3">
              <h1 className=" font-semibold text-lg truncate">
                {course.title}
              </h1>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Owner name</span>
              </div>
              <h2 className="font-semibold text-xl">
                ${course.price.toFixed(2)}
              </h2>
              <div className="flex items-center justify-between">
                <Badge className={`${levelClassName[course.level]}`}>
                  {course.level}
                </Badge>

                <p className="flex items-center gap-2">
                  <Star
                    className="h-5 w-5 text-amber-500"
                    fill="currentColor"
                  />{" "}
                  {course.rating}
                </p>
              </div>
              <p className="flex flex-wrap gap-2">
                {course.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="inline-block text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </p>
            </CardContent>

            <CardFooter className="flex gap-2">
              <Button className="w-3/4">Buy Now</Button>
              <Button className="w-1/4 bg-red-600 hover:bg-red-500 ">
                Add
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-center mt-8">
        <Button variant="ghost">
          View more <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}

export default RecommendedCourse;
