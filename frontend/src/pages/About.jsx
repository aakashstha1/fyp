import React, { useState, useEffect } from "react";

function About() {
  const sections = [
    {
      title: "About Us",
      shortDesc: "Built by learners for learners.",
      fullDesc:
        " Our e-learning platform was developed by students and educators at Godawari College with the mission to democratize education. We strive to make quality learning resources accessible to all, regardless of location or background, by leveraging digital technology that bridges the gap between traditional classrooms and modern educational needs.",
    },
    {
      title: "Our Vision",
      shortDesc: "Bridging tradition and technology.",
      fullDesc:
        " We envision a future where education transcends physical boundaries, enabling every learner in Nepal and beyond to access comprehensive, personalized, and culturally relevant digital content. By combining Godawari College’s academic excellence with innovative e-learning tools, we aim to empower lifelong learners to achieve their full potential anytime, anywhere.",
    },
    {
      title: "Our Mission",
      shortDesc: "Accessible & meaningful education.",
      fullDesc:
        " Our mission is to deliver engaging, interactive, and high-quality educational experiences tailored to diverse learner needs. We focus on user-friendly interfaces, multimedia content, and community-driven learning that fosters collaboration, critical thinking, and practical skill development in an inclusive digital environment.",
    },
    {
  title: "Our Vision",
  shortDesc: "Bridging tradition and technology.",
  fullDesc:
    " We envision a future where every learner—regardless of geography, background, or resources—can access quality education through innovative digital platforms. Our goal is to transform conventional teaching into a more flexible, inclusive, and scalable system that supports self-paced learning, promotes digital literacy, and fosters a culture of continuous improvement across Nepal and beyond.",
},

  ];

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
    }, 20);

    return () => clearInterval(interval);
  }, [selectedIndex]);

  return (
    <div className="min-h-[calc(100vh-150px)] w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 flex flex-col">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:space-x-10">
        {/* Left Side: Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:w-1/2">
          {sections.map(({ title, shortDesc }, i) => (
            <div
              key={i}
              onClick={() => {
                if (i !== selectedIndex) setSelectedIndex(i);
              }}
              className="rounded-xl p-6 sm:p-8 bg-gray-100 dark:bg-gray-800 text-inherit shadow-none cursor-default transition-none hover:scale-100 focus:outline-none"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{title}</h3>
              <p className="text-sm sm:text-base leading-relaxed">{shortDesc}</p>
            </div>
          ))}
        </div>

        {/* Right Side: Typing Effect Bubble */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="bg-blue-600 dark:bg-blue-800 text-white rounded-2xl p-6 sm:p-8 shadow-lg max-w-full mx-auto whitespace-pre-wrap leading-relaxed text-base sm:text-lg select-text">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
              {sections[selectedIndex].title}
            </h2>
            <p>{displayedText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
