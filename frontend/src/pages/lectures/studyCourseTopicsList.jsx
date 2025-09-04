import { useState, useEffect } from "react";
import { PlayCircle, FileText, MessageCircle, CheckCircle } from "lucide-react";
import { useParams } from "react-router-dom";

export default function StudyTopicList({
  lectures = [],
  onSelectLesson,
  handleAssignment,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { courseId } = useParams();

  // Automatically select the first lecture when lectures prop changes
  useEffect(() => {
    if (lectures.length > 0) {
      setActiveIndex(0);
      onSelectLesson(lectures[0]);
    }
  }, [lectures, onSelectLesson]);

  const handleClick = (lesson, i) => {
    handleAssignment("lecture");
    setActiveIndex(i);
    onSelectLesson(lesson);
  };

  return (
    <aside className="col-span-3 border-r bg-white dark:bg-gray-900 overflow-y-auto p-4 transition-colors">
      <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Course Topics
      </h2>
      <ul className="space-y-2">
        {lectures.map((lesson, i) => (
          <li
            onClick={() => handleClick(lesson, i)}
            key={lesson._id}
            className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
              i === activeIndex
                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 font-medium"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            <span className="flex items-center gap-2">
              {lesson.type === "Video" && <PlayCircle size={18} />}
              {lesson.type === "Reading" && <FileText size={18} />}
              {lesson.type === "Discussion" && <MessageCircle size={18} />}
              {lesson.type === "Commit" && <CheckCircle size={18} />}
              {lesson.lectureTitle}
            </span>
          </li>
        ))}
      </ul>
      <button
        className="w-full mt-4 p-2 rounded-md cursor-pointer bg-indigo-600 text-white dark:bg-indigo-700 dark:hover:bg-indigo-600 transition"
        onClick={() => handleAssignment("assignment")}
      >
        Assignment
      </button>
    </aside>
  );
}
