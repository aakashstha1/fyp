import React from "react";
import { FaChalkboardTeacher, FaLightbulb, FaGlobe, FaUsers, FaLaptopCode, FaAward } from "react-icons/fa";
import { Button } from "@/components/ui/button";

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
    description: "Start your learning journey with us today and unlock new opportunities.",
  },
};

export default function About() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen px-6 py-16 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            {aboutData.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            {aboutData.hero.subtitle}
          </p>
          <Button className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
            Explore Courses
          </Button>
        </div>
        <div className="md:w-1/2">
          <img
            src={aboutData.hero.image}
            alt="Empowering Education"
            className="rounded-lg shadow-lg w-full object-cover max-h-96"
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
      <section className="mt-20 bg-blue-600 rounded-xl p-12 text-center text-white max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">{aboutData.cta.title}</h2>
        <p className="mb-8 text-lg max-w-xl mx-auto">{aboutData.cta.description}</p>
        <Button className="px-10 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
          Get Started Now
        </Button>
      </section>
    </div>
  );
}
