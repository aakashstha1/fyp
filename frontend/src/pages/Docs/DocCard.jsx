// CreateDocCard.jsx
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function CreateDocCard() {
  const navigate = useNavigate();

  // const handleCreateDoc = async () => {
  //   try {
  //     const res = await axios.post("/api/my-docs", {
  //       title: "Untitled Document",
  //       content: ""
  //     });

  //     const docId = res.data.doc._id;
  //     navigate(`/my-docs/${docId}`);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to create document.");
  //   }
  // };

  return (
    <div
      // onClick={handleCreateDoc}
      className="flex flex-col items-center justify-center w-48 h-60 border border-dashed border-gray-400 rounded-xl hover:shadow-md hover:border-blue-500 transition-colors cursor-pointer bg-white dark:bg-gray-800"
    >
      <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
        <Plus size={32} />
      </div>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
        Create New Doc
      </p>
    </div>
  );
}

export function DocCard({ title, updatedAt, preview }) {
  return (
    <div className="w-48 h-60 border rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition p-3 flex flex-col justify-between">
      <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden text-xs text-gray-500 p-2">
        {preview || "No content preview available."}
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
          {title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Last edited: {updatedAt}
        </p>
      </div>
    </div>
  );
}
