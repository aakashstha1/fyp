import { useState } from "react";
import { PlayCircle, FileText, MessageCircle, CheckCircle } from "lucide-react";

export default function StudyTopicList({ onSelectLesson }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const lessons = [
    {
      type: "Video",
      title: "Welcome to the Google UX Design Certificate",
      duration: "5 min",
      transcript:
        "This video introduces you to the Google UX Design Certificate program...",
    },
    {
      type: "Reading",
      title: "Begin the Google UX Design Certificate",
      duration: "10 min",
      transcript:
        "In this reading, you’ll learn about the goals of the UX Design Certificate...",
    },
    {
      type: "Video",
      title: "Introduction to Course 1: Foundations of UX",
      duration: "2 min",
      transcript:
        "This short video gives you a preview of what you’ll learn in Course 1...",
    },
    {
      type: "Reading",
      title: "Welcome to Course 1",
      duration: "10 min",
      transcript:
        "This reading will help you understand the learning objectives of Course 1...",
    },
    {
      type: "Discussion",
      title: "Introduce yourself",
      duration: "10 min",
      transcript:
        "Use this discussion space to introduce yourself to fellow learners...",
    },
  ];

  const handleClick = (lesson, i) => {
    setActiveIndex(i);
    onSelectLesson(lesson);
  };

  return (
    <aside className="col-span-3 border-r bg-white overflow-y-auto p-4">
      <h2 className="font-semibold text-gray-800 mb-4">Course Topics</h2>
      <ul className="space-y-2">
        {lessons.map((lesson, i) => (
          <li
            onClick={() => handleClick(lesson, i)}
            key={i}
            className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
              i === activeIndex
                ? "bg-indigo-100 text-indigo-700 font-medium"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <span className="flex items-center gap-2">
              {lesson.type === "Video" && <PlayCircle size={18} />}
              {lesson.type === "Reading" && <FileText size={18} />}
              {lesson.type === "Discussion" && <MessageCircle size={18} />}
              {lesson.type === "Commit" && <CheckCircle size={18} />}
              {lesson.title}
            </span>
            <span className="text-sm text-gray-500">{lesson.duration}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
