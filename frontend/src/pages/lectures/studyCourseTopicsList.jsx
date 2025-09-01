import { useState, useEffect } from "react";
import { PlayCircle, FileText, MessageCircle, CheckCircle } from "lucide-react";

export default function StudyTopicList({ lectures = [], onSelectLesson }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Automatically select the first lecture when lectures prop changes
  useEffect(() => {
    if (lectures.length > 0) {
      setActiveIndex(0);
      onSelectLesson(lectures[0]);
    }
  }, [lectures, onSelectLesson]);

  const handleClick = (lesson, i) => {
    setActiveIndex(i);
    onSelectLesson(lesson);
  };

  return (
    <aside className="col-span-3 border-r bg-white overflow-y-auto p-4">
      <h2 className="font-semibold text-gray-800 mb-4">Course Topics</h2>
      <ul className="space-y-2">
        {lectures.map((lesson, i) => (
          <li
            onClick={() => handleClick(lesson, i)}
            key={lesson._id}
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
              {lesson.lectureTitle}
            </span>
            {lesson.duration && (
              <span className="text-sm text-gray-500">{lesson.duration}</span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
