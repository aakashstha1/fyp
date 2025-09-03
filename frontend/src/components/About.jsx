import React from "react";
import {
  FaChalkboardTeacher,
  FaLightbulb,
  FaGlobe,
  FaUsers,
  FaLaptopCode,
  FaAward,
} from "react-icons/fa";

const aboutData = {
  hero: {
    title: "Empowering Education for Everyone",
    subtitle:
      "We provide accessible, practical, and high-quality courses designed by experts to help you thrive in the digital world.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  },
  mission: {
    title: "Our Mission",
    description:
      "To democratize education by connecting learners with expert educators, delivering engaging and practical content that prepares you for real-world challenges.",
  },
  values: [
    {
      icon: <FaChalkboardTeacher className="text-blue-600 w-12 h-12" />,
      title: "Educator-Driven Content",
      description:
        "Courses are designed and curated by industry professionals and educators with deep expertise.",
    },
    {
      icon: <FaLightbulb className="text-yellow-500 w-12 h-12" />,
      title: "Innovative & Interactive",
      description:
        "We use quizzes, projects, and multimedia content to make learning immersive and enjoyable.",
    },
    {
      icon: <FaGlobe className="text-green-500 w-12 h-12" />,
      title: "Accessible Anywhere",
      description:
        "Learn on your schedule, from any device, anywhere in the world.",
    },
    {
      icon: <FaUsers className="text-purple-600 w-12 h-12" />,
      title: "Community & Support",
      description:
        "Join a growing community of learners to share knowledge, collaborate, and get help.",
    },
    {
      icon: <FaLaptopCode className="text-indigo-500 w-12 h-12" />,
      title: "Up-to-Date Tech",
      description:
        "Stay current with courses on latest technologies, programming languages, and tools.",
    },
    {
      icon: <FaAward className="text-red-500 w-12 h-12" />,
      title: "Certifications & Career Growth",
      description:
        "Earn certificates that showcase your skills and boost your career prospects.",
    },
  ],
  cta: {
    title: "Join thousands of learners worldwide",
    description:
      "Start your learning journey with us today and unlock new opportunities.",
  },
};

export default function About() {
  return (
    <div
      className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen m-10"
      id="about"
    >
      {/* Mission Section */}
      <section className="mt-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{aboutData.mission.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          {aboutData.mission.description}
        </p>
      </section>

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
    </div>
  );
}
