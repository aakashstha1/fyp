import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-white">


      {/* Hero */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between py-20 px-6 sm:px-10 max-w-7xl mx-auto">
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
            Learn Anytime, Anywhere
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300">
            Discover curated courses for students, professionals, and enthusiasts.
          </p>
          <div className="flex gap-3 justify-center lg:justify-start">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full max-w-sm py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md">
              Search
            </button>
          </div>
          <Link to="/courses">
            <button className="mt-4 py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-lg shadow-lg">
              Explore Courses
            </button>
          </Link>
        </div>
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <img
            src="https://images.freeimages.com/images/large-previews/b2c/book-1181637.jpg?fmt=webp&h=350"
            alt="Learning"
            className="rounded-3xl shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Available Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-36 w-full object-contain mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Instructors */}
      <section className="bg-indigo-50 dark:bg-indigo-900 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Meet Our Top Instructors</h2>
        <div className="relative max-w-6xl mx-auto px-4">
          <button
            onClick={prevInstructor}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-indigo-700 text-white p-3 rounded-full shadow-md z-10"
          >
            ←
          </button>
          <button
            onClick={nextInstructor}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-indigo-700 text-white p-3 rounded-full shadow-md z-10"
          >
            →
          </button>
          <div
            ref={instructorRef}
            className="overflow-x-auto flex gap-8 px-12 scroll-smooth hide-scrollbar"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {instructors.map((inst, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 min-w-[300px] shadow-xl scroll-snap-align-start"
              >
                <img
                  src={inst.photo}
                  alt={inst.name}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-indigo-500 mb-4"
                />
                <h3 className="text-xl font-bold text-center">{inst.name}</h3>
                <p className="text-center text-indigo-600 dark:text-indigo-300 font-semibold">{inst.subject}</p>
                <p className="text-center text-gray-700 dark:text-gray-300 mt-2">{inst.bio}</p>
                <p className="text-center text-yellow-400 mt-2">⭐ {inst.rating}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { label: "About", to: "/about" },
            { label: "My Docs", to: "/my-docs" },
            { label: "Quiz", to: "/quiz" },
            { label: "Courses", to: "/courses" },
            { label: "Whiteboard", to: "/my-board" },
          ].map(({ label, to }, i) => (
            <Link to={to} key={i}>
              <button className="w-full py-4 px-6 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-600 hover:text-white transition">
                {label}
              </button>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;
