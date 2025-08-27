import { useState } from "react";
import {
  PlayCircle,
  FileText,
  MessageCircle,
  CheckCircle,
  Download,
  Share2,
  ThumbsUp,
} from "lucide-react";
import MainContent from "./mainContent";
import StudyTopicList from "./studyCourseTopicsList";

export default function studyContainer() {
  const [selectedLesson, setSelectedLesson] = useState(null);

  return (
    <div className="grid grid-cols-12 h-screen bg-gray-100">
      {/* Sidebar */}
      <StudyTopicList onSelectLesson={setSelectedLesson} />

      {/* Main Content */}
      <MainContent lesson={selectedLesson} />

      {/* Notes Sidebar */}
      <aside className="col-span-3 border-l bg-white p-4">
        <h2 className="font-semibold mb-3">Notes</h2>
        <ul className="text-sm text-gray-600 space-y-2 mb-4">
          <li>➕ Click “Save Note” below the video</li>
          <li>➕ Highlight transcript lines</li>
          <li>➕ Or click below for free note</li>
        </ul>
        <button className="w-full py-2 bg-indigo-600 text-white rounded-lg">
          Add a note
        </button>
      </aside>
    </div>
  );
}
