import React from "react";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaComments,
  FaGlobe,
  FaLaptop,
  FaNoteSticky,
  FaUserPlus,
} from "react-icons/fa6";
import pic from "../assets/images/pic.webp";

const aboutData = {
  hero: {
    descp:
      "EduPal is an innovative e-learning platform designed to make education accessible, engaging, and practical for everyone. Whether you're a student, professional, or lifelong learner, EduPal empowers you to learn at your own pace with expert-driven courses and interactive tools.",
    image: pic,
  },
  mission: {
    title: "Our Mission",
    description:
      "Our mission is to make learning simple, personal, and impactful by connecting learners with educators through quality courses, discussions, and progress tracking.",
  },
  values: [
    {
      icon: <FaComments className="text-teal-500 w-12 h-12" />,
      title: "Discussion Forum",
      description:
        "Engage with instructors and peers to ask questions, discuss concepts, and share insights.",
    },
    {
      icon: <FaChartLine className="text-orange-500 w-12 h-12" />,
      title: "Progress Tracking",
      description:
        "Track your learning progress and see how far you’ve come in each course.",
    },
    {
      icon: <FaNoteSticky className="text-pink-500 w-12 h-12" />,
      title: "Self Notes",
      description:
        "Take personal notes while learning to better retain information and review key points.",
    },
    {
      icon: <FaUserPlus className="text-gray-700 w-12 h-12" />,
      title: "Apply as Instructor",
      description:
        "Share your expertise by creating courses and helping others learn while growing your career.",
    },
    {
      icon: <FaLaptop className="text-blue-600 w-12 h-12" />,
      title: "User-Friendly UI",
      description:
        "Enjoy a clean, intuitive interface designed to make navigation and learning effortless.",
    },
    {
      icon: <FaGlobe className="text-green-600 w-12 h-12" />,
      title: "Localized Content",
      description:
        "Access courses in your preferred language and learn with culturally relevant examples.",
    },
  ],
  cta: {
    title: "Discuss Your Doubts",
    description:
      "Connect with learners and educators, get answers, and collaborate through meaningful discussions.",
  },
};

function About() {
  const navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-10 ">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Welcome to <span className="text-slate-900">Edu</span>
            <span className="text-amber-500">Pal</span> – Your Learning
            Companion
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 text-justify">
            {aboutData.hero.descp}
          </p>
          <button
            className="flex items-center justify-center text-slate-900 text-sm sm:text-lg font-semibold gap-2 px-4 py-2 hover:scale-105 cursor-pointer ease-in-out duration-150 bg-amber-400 rounded-lg"
            onClick={() => navigate("/courses")}
          >
            Explore Courses
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src={aboutData.hero.image}
            alt="EduPal illustration"
            className=" max-h-[400px] object-cover"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="mt-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{aboutData.mission.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          {aboutData.mission.description}
        </p>
      </section>

      {/* Values / Features Grid */}
      <section className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {aboutData.values.map(({ icon, title, description }, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{description}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="flex justify-between items-end mt-20 bg-slate-900 rounded-xl p-6  text-white">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-3xl font-bold">{aboutData.cta.title}</h2>
          <p className=" text-lg ">{aboutData.cta.description}</p>
        </div>
        <Button
          onClick={() => navigate("/discussion")}
          className="px-10 py-3 bg-white border-2 border-amber-500 text-amber-600 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Get Started Now
        </Button>
      </section>
    </div>
  );
}

export default About;
