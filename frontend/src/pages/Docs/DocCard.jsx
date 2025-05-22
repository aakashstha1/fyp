// CreateDocCard.jsx
import axios from "axios";
import { format, formatDistanceToNow, isToday } from "date-fns";
import { MoreVertical, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import parse from "html-react-parser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const API_URL = "http://localhost:8000/api";

export function CreateDocCard() {
  const navigate = useNavigate();
  const handleCreateDoc = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/doc/create`,
        {},
        {
          withCredentials: true,
        }
      );
      const newDoc = res.data.doc;
      navigate(`/editor/${newDoc._id}`);
    } catch (error) {
      toast.error("Failed to create document");
      console.error(error);
    }
  };

  return (
    <div
      onClick={handleCreateDoc}
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

export function DocCard({ title, updatedAt, preview, id, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await axios.delete(`${API_URL}/doc/${id}`, { withCredentials: true });
      onDelete();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={(e) => {
        // Prevent navigate if dropdown was clicked
        if (e.target.closest("[data-no-nav]")) return;
        navigate(`/editor/${id}`);
      }}
      className="cursor-pointer w-48 h-60 border rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition p-3 flex flex-col justify-between"
    >
      <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden text-xs text-gray-500 p-2">
        {preview ? parse(preview) : "No content preview available."}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate mb-2">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Last edited:{" "}
            {isToday(new Date(updatedAt))
              ? format(new Date(updatedAt), "h:mm a")
              : formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button data-no-nav>
                <MoreVertical size={18} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30">
              <DropdownMenuGroup>
                <DropdownMenuItem className="text-xs" onClick={handleDelete}>
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`/editor/${id}`, "_blank");
                  }}
                >
                  Open in New Tab
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
