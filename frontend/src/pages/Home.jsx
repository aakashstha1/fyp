import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const instructors = [
  {
    name: "Alice Johnson",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    subject: "Data Science",
    bio: "Alice has 8+ years of experience teaching data analysis, machine learning, and Python programming.",
    rating: 4.8,
  },
  {
    name: "Mark Davis",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    subject: "Web Development",
    bio: "Mark specializes in full-stack development, including React, Node.js, and MongoDB.",
    rating: 4.7,
  },
  {
    name: "Sophie Lee",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    subject: "Graphic Design",
    bio: "Sophie brings creativity and experience in UI/UX, branding, and design tools like Figma and Adobe XD.",
    rating: 4.9,
  },
  {
    name: "John Smith",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    subject: "Cybersecurity",
    bio: "John teaches ethical hacking, network security, and data privacy with real-world experience.",
    rating: 4.6,
  },
];

const courses = [
  {
    title: "React for Beginners",
    thumbnail: "https://reactjs.org/logo-og.png",
    description: "Learn the basics of React, including components, hooks, and state management.",
  },
  {
    title: "Python Data Analysis",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    description: "Master data analysis with Python libraries like pandas and NumPy.",
  },
  {
    title: "UI/UX Design Fundamentals",
    thumbnail: "https://cdn-icons-png.flaticon.com/512/2948/2948035.png",
    description: "Get started with UI/UX design principles and popular tools like Figma.",
  },
  {
    title: "Node.js Backend",
    thumbnail: "https://nodejs.org/static/images/logo.svg",
    description: "Build scalable backend applications using Node.js and Express.",
  },
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const instructorRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % instructors.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (instructorRef.current) {
      const scrollWidth = instructorRef.current.scrollWidth;
      const childCount = instructors.length;
      const scrollPerItem = scrollWidth / childCount;
      instructorRef.current.scrollTo({
        left: scrollPerItem * currentIndex,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const prevInstructor = () => {
    setCurrentIndex((prev) => (prev - 1 + instructors.length) % instructors.length);
  };
  const nextInstructor = () => {
    setCurrentIndex((prev) => (prev + 1) % instructors.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between py-20 px-6 sm:px-10 max-w-7xl mx-auto">
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Learn Anytime, Anywhere
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
            Discover a world of knowledge with our curated e-learning courses designed for students, professionals, and enthusiasts.
          </p>
          <div className="flex gap-3 justify-center lg:justify-start max-w-md mx-auto lg:mx-0">
            <Input
              placeholder="Search courses..."
              className="w-full py-3 px-5 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white transition"
              aria-label="Search courses"
            />
            <Button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition">
              Search
            </Button>
          </div>
          <Link to="/courses" className="inline-block mt-6">
            <Button
              className="px-10 py-4 text-lg font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg transition"
            >
              Explore Courses
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
          <img
            src="https://images.freeimages.com/images/large-previews/b2c/book-1181637.jpg?fmt=webp&h=350"
            alt="eLearning Illustration"
            className="w-full max-w-lg rounded-3xl shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

      {/* Available Courses Section */}
      <section className="py-16 px-6 sm:px-10 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-white">
          Available Courses
        </h2>
        <div
          className="hide-scrollbar flex overflow-x-auto space-x-8 px-4 scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-1/3 min-w-[320px] bg-gradient-to-tr from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform cursor-pointer scroll-snap-align-start"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-36 object-contain rounded-lg mb-5"
              />
              <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {course.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Instructors Carousel Section */}
      <section className="relative py-20 px-6 sm:px-10 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
        <h2 className="text-4xl font-extrabold text-center mb-14 text-gray-900 dark:text-white">
          Meet Our Top Instructors
        </h2>

        <div className="max-w-6xl mx-auto relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevInstructor}
            aria-label="Previous Instructor"
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-indigo-700 text-white rounded-full p-4 hover:bg-indigo-800 shadow-lg transition z-20"
          >
            &#8592;
          </button>
          <button
            onClick={nextInstructor}
            aria-label="Next Instructor"
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-indigo-700 text-white rounded-full p-4 hover:bg-indigo-800 shadow-lg transition z-20"
          >
            &#8594;
          </button>

          {/* Scroll Container */}
          <div
            ref={instructorRef}
            className="hide-scrollbar flex overflow-x-auto scroll-smooth space-x-10 px-16"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {instructors.map((inst, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[360px] bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-2xl transform transition duration-500 hover:scale-105 hover:shadow-3xl scroll-snap-align-start"
              >
                <img
                  src={inst.photo}
                  alt={inst.name}
                  className="w-36 h-36 rounded-full mx-auto mb-6 border-4 border-indigo-500 shadow-lg"
                />
                <h3 className="text-2xl font-extrabold text-center text-gray-900 dark:text-white mb-1">
                  {inst.name}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 text-center font-semibold mb-3">
                  {inst.subject}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-center text-base leading-relaxed mb-5">
                  {inst.bio}
                </p>
                <div className="flex justify-center items-center space-x-2">
                  <span className="text-yellow-400 text-xl">⭐</span>
                  <span className="text-gray-900 dark:text-white font-semibold text-lg">
                    {inst.rating.toFixed(1)} / 5.0
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 px-6 sm:px-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-gray-900 dark:text-white">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Link to="/about">
            <Button
              variant="secondary"
              className="w-full text-lg py-4 rounded-lg border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
            >
              About
            </Button>
          </Link>
          <Link to="/my-docs">
            <Button
              variant="secondary"
              className="w-full text-lg py-4 rounded-lg border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
            >
              My Docs
            </Button>
          </Link>
          <Link to="/quiz">
            <Button
              variant="secondary"
              className="w-full text-lg py-4 rounded-lg border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
            >
              Quiz
            </Button>
          </Link>
          <Link to="/courses">
            <Button
              variant="secondary"
              className="w-full text-lg py-4 rounded-lg border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
            >
              Courses
            </Button>
          </Link>
          <Link to="/whiteboard">
            <Button
              variant="secondary"
              className="w-full text-lg py-4 rounded-lg border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
            >
              Whiteboard
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;
