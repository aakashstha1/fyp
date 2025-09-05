import { PlayCircle, Download, Share2, ThumbsUp } from "lucide-react";
import Assignment from "../assignment/assignment";

import { toast } from "sonner";

export default function MainContent({ lesson, isAssignment }) {
  const handleSaveNote = () => {
    if (!lesson) return;
    localStorage.setItem(`note-${lesson._id}`, notes);
    alert("✅ Note saved locally!");
  };
  const handleShare = async () => {
    if (!lesson) return;
    const shareData = {
      title: lesson.lectureTitle,
      text: "Check out this lesson!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        toast("Something went wrong cannot Share Post");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("📋 Link copied to clipboard!");
    }
  };
  return (
    <main className="col-span-6 p-6 overflow-y-auto  dark:bg-gray-900">
      {/* Title */}

      {isAssignment ? (
        <Assignment />
      ) : (
        <>
          <h1 className="text-xl font-semibold mb-4">
            {lesson ? lesson.lectureTitle : ""}
          </h1>

          {/* Video / Reading / Discussion */}

          <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
            {lesson && lesson.videoUrl ? (
              <video
                src={lesson.videoUrl}
                alt="lecture/video"
                controls
                className="w-full h-full rounded-lg"
              />
            ) : (
              <button className="text-white">
                <PlayCircle size={64} />
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-6 ">
            <button
              className="flex items-center gap-1 text-sm bg-gray-200  dark:bg-gray-900 px-3 py-1 rounded"
              onClick={handleSaveNote}
            >
              Save Note
            </button>
            <button className="flex items-center gap-1 text-sm bg-gray-200 dark:bg-gray-900 px-3 py-1 rounded">
              <Download size={16} /> Download
            </button>
            <button
              className="flex items-center gap-1 text-sm bg-gray-50 dark:bg-gray-900 px-3 py-1 rounded"
              onClick={handleShare}
            >
              <Share2 size={16} /> Share
            </button>
            {/* <button className="flex items-center gap-1 text-sm bg-gray-200 px-3 py-1 rounded">
              <ThumbsUp size={16} /> Like
            </button> */}
          </div>

          {/* Transcript */}
          <div className="p-4 bg-gray-50 rounded border text-sm leading-relaxed bg-gray-50 dark:bg-gray-900">
            <p>
              {lesson
                ? lesson.transcript ||
                  "Transcript not available for this lesson."
                : "Companies of all types and sizes rely on user experience designers to help make their technology easier and more enjoyable to use. The demand for UX designers is so high..."}
            </p>
          </div>
        </>
      )}
    </main>
  );
}
