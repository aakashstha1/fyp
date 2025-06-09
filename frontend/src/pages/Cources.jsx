import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const allCourses = [
  {
    id: 1,
    title: "React for Beginners",
    category: "Web Development",
    description:
      "Learn the basics of React, including components, hooks, and state management.",
    thumbnail: "https://reactjs.org/logo-og.png",
    views: 2100,
    subscribers: 900,
    isFree: true,
  },
  {
    id: 2,
    title: "Advanced Python for Data Analysis",
    category: "Data Science",
    description:
      "Master data analysis with Python libraries like pandas and NumPy.",
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    views: 3250,
    subscribers: 1500,
    isFree: false,
    price: 49.99,
  },
  {
    id: 3,
    title: "UI/UX Design Bootcamp",
    category: "Design",
    description: "Get started with UI/UX design principles and tools like Figma.",
    thumbnail: "https://cdn-icons-png.flaticon.com/512/2948/2948035.png",
    views: 1800,
    subscribers: 700,
    isFree: true,
  },
  {
    id: 4,
    title: "Cybersecurity Fundamentals",
    category: "Cybersecurity",
    description: "Understand ethical hacking, network security, and risk management.",
    thumbnail: "https://cdn-icons-png.flaticon.com/512/1042/1042333.png",
    views: 1450,
    subscribers: 680,
    isFree: false,
    price: 39.99,
  },
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" ? true : course.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-sm"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Web Development">Web Development</SelectItem>
            <SelectItem value="Data Science">Data Science</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <CardContent className="flex flex-col flex-grow p-4">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-contain rounded-md mb-4 bg-gray-100 dark:bg-gray-800"
              />
              <div className="flex-grow flex flex-col">
                <h3 className="text-lg font-semibold mb-1 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
                  {course.description}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 flex justify-between">
                  <span>👁️ {course.views}</span>
                  <span>📚 {course.subscribers}</span>
                </p>
                {!course.isFree && (
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                    Price: ${course.price.toFixed(2)}
                  </p>
                )}
              </div>

              <div>
                {course.isFree ? (
                  <Link to={`/course/${course.id}`}>
                    <Button className="w-full" size="sm">
                      Start Course
                    </Button>
                  </Link>
                ) : (
                  <Link to={`/payment/${course.id}`}>
                    <Button variant="outline" className="w-full" size="sm">
                      Buy Now
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;
