import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "About Us",
    shortDesc: "Built by learners for learners.",
    fullDesc:
      "  Our e-learning platform was developed by students and educators at Godawari College with the mission to democratize education. We strive to make quality learning resources accessible to all, regardless of location or background, by leveraging digital technology that bridges the gap between traditional classrooms and modern educational needs.",
  },
  {
    title: "Our Vision",
    shortDesc: "Bridging tradition and technology.",
    fullDesc:
      "  We envision a future where education transcends physical boundaries, enabling every learner in Nepal and beyond to access comprehensive, personalized, and culturally relevant digital content. By combining Godawari College’s academic excellence with innovative e-learning tools, we aim to empower lifelong learners to achieve their full potential anytime, anywhere.",
  },
  {
    title: "Our Mission",
    shortDesc: "Accessible & meaningful education.",
    fullDesc:
      "  Our mission is to deliver engaging, interactive, and high-quality educational experiences tailored to diverse learner needs. We focus on user-friendly interfaces, multimedia content, and community-driven learning that fosters collaboration, critical thinking, and practical skill development in an inclusive digital environment.",
  },
];

function About() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const fullText = sections[selectedIndex].fullDesc;
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(i));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval);
  }, [selectedIndex]);

  return (
    <div className="min-h-[calc(100vh-150px)] w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 flex flex-col">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:space-x-10">
        {/* Left Side: Cards */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:w-1/2" layout>
          {sections.map(({ title, shortDesc }, i) => (
            <motion.div
              key={i}
              role="button"
              tabIndex={0}
              onClick={() => {
                if (i !== selectedIndex) setSelectedIndex(i);
              }}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && i !== selectedIndex) {
                  setSelectedIndex(i);
                }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.12)" }}
              className={`relative rounded-xl p-6 sm:p-8 cursor-pointer transition-all
                ${
                  selectedIndex === i
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300"
                }`}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{title}</h3>
              <p className="text-sm sm:text-base leading-relaxed">{shortDesc}</p>

              {/* Underline bar */}
              {selectedIndex === i && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-6 right-6 bottom-4 h-1 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Right Side: Typing Effect Bubble */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 overflow-y-auto max-h-[calc(100vh-200px)]">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="bg-blue-600 dark:bg-blue-800 text-white rounded-2xl p-6 sm:p-8 shadow-lg max-w-full mx-auto whitespace-pre-wrap leading-relaxed text-base sm:text-lg select-text"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
              {sections[selectedIndex].title}
            </h2>
            <p>{displayedText}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
