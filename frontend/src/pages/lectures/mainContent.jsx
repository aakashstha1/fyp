import { PlayCircle, Download, Share2, ThumbsUp } from "lucide-react";

export default function MainContent({ lesson }) {
  return (
    <main className="col-span-6 p-6 overflow-y-auto">
      {/* Title */}
      <h1 className="text-xl font-semibold mb-4">
        {lesson ? lesson.title : "Welcome to the Google UX Design Certificate"}
      </h1>

      {/* Video / Reading / Discussion placeholder */}
      <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
        <button className="text-white">
          <PlayCircle size={64} />
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-6">
        <button className="flex items-center gap-1 text-sm bg-gray-200 px-3 py-1 rounded">
          Save Note
        </button>
        <button className="flex items-center gap-1 text-sm bg-gray-200 px-3 py-1 rounded">
          <Download size={16} /> Download
        </button>
        <button className="flex items-center gap-1 text-sm bg-gray-200 px-3 py-1 rounded">
          <Share2 size={16} /> Share
        </button>
        <button className="flex items-center gap-1 text-sm bg-gray-200 px-3 py-1 rounded">
          <ThumbsUp size={16} /> Like
        </button>
      </div>

      {/* Transcript */}
      <div className="p-4 bg-gray-50 rounded border text-sm leading-relaxed text-gray-700">
        <p>
          {lesson
            ? lesson.transcript || "Transcript not available for this lesson."
            : "Companies of all types and sizes rely on user experience designers to help make their technology easier and more enjoyable to use. The demand for UX designers is so high..."}
        </p>
      </div>
    </main>
  );
}
