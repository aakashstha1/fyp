import { useEffect, useState } from "react";

import MainContent from "./mainContent";
import StudyTopicList from "./studyCourseTopicsList";

import axios from "axios";
import { useParams } from "react-router-dom";
const API = "http://localhost:8000/api/course";

export default function StudyContainer() {
  const { courseId } = useParams();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [isAssignment, setAssignment] = useState(false);

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const res = await axios.get(`${API}/${courseId}/lectures`, {
          withCredentials: true,
        });
        const lectures = res.data.lectures || [];
        setLectures(lectures);
        if (lectures.length > 0) setSelectedLesson(lectures[0]); // default first lecture
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    };
    if (courseId) fetchLecture();
  }, [courseId]);
  const handleAssignment = (type) => {
    if (type === "assignment") {
      setAssignment(true);
    } else {
      setAssignment(false);
    }
  };
  return (
    <div className="grid grid-cols-12 h-screen bg-gray-100">
      {/* Sidebar */}
      <StudyTopicList
        onSelectLesson={setSelectedLesson}
        lectures={lectures}
        handleAssignment={handleAssignment}
      />

      {/* Main Content */}
      <MainContent lesson={selectedLesson} isAssignment={isAssignment} />

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
