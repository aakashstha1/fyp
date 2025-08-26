import {
  PlayCircle,
  FileText,
  MessageCircle,
  CheckCircle,
  Download,
  Share2,
  ThumbsUp,
} from "lucide-react";
export default function StudyTopicList() {
  const lessons = [
    {
      type: "Video",
      title: "Welcome to the Google UX Design Certificate",
      duration: "5 min",
      active: true,
    },
    {
      type: "Reading",
      title: "Begin the Google UX Design Certificate",
      duration: "10 min",
    },
    {
      type: "Video",
      title: "Introduction to Course 1: Foundations of UX",
      duration: "2 min",
    },
    { type: "Reading", title: "Welcome to Course 1", duration: "10 min" },
    { type: "Discussion", title: "Introduce yourself", duration: "10 min" },
  ];

  return (
    <aside className="col-span-3 border-r bg-white overflow-y-auto p-4">
      <h2 className="font-semibold text-gray-800 mb-4">Start the program</h2>
      <ul className="space-y-2">
        {lessons.map((lesson, i) => (
          <li
            key={i}
            className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
              lesson.active
                ? "bg-indigo-100 text-indigo-700 font-medium"
                : "hover:bg-gray-100"
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
