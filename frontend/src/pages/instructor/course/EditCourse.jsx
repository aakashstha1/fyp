import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import CourseTab from "./CourseTab";

function EditCourse() {
  const navigate = useNavigate();
  return (
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        </button>
        <h1 className="font-bold text-xl">Add detail of Course:</h1>
      </div>
      <CourseTab />
    </div>
  );
}

export default EditCourse;
