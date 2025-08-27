import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Introduction to Python",
    description: "Learn Python programming from basics to advanced concepts.",
    duration: "6 weeks",
    image: "https://source.unsplash.com/400x250/?python,code",
  },
  {
    id: 2,
    title: "Web Development with MERN",
    description:
      "Master full-stack development using MongoDB, Express, React, and Node.js.",
    duration: "8 weeks",
    image: "https://source.unsplash.com/400x250/?web,development",
  },
  {
    id: 3,
    title: "Cybersecurity Fundamentals",
    description:
      "Understand the principles of security, encryption, and defense mechanisms.",
    duration: "5 weeks",
    image: "https://source.unsplash.com/400x250/?cybersecurity,hacking",
  },
];

export default function CourseList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {courses.map((course) => (
        <Card
          key={course.id}
          className="rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden"
        >
          <img
            src={course.image}
            alt={course.title}
            className="h-40 w-full object-cover"
          />
          <CardContent className="p-4 space-y-3">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-600 text-sm">{course.description}</p>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={16} />
              <span>{course.duration}</span>
            </div>

            <Button className="w-full mt-2 rounded-xl flex items-center gap-2">
              <BookOpen size={18} /> Enroll Now
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
