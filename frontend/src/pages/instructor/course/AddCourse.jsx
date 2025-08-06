import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useCreateCourseMutation } from "@/features/api/courseApi";
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

function AddCourse() {
  const navigate = useNavigate();
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);

  //   const [createCourse, { data, isLoading, error, isSuccess }] =
  //     useCreateCourseMutation();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  //   const createCourseHandler = async () => {
  //     // console.log(courseTitle, category, tags);
  //     if (!courseTitle.trim()) {
  //       toast.error("Course title is required.");
  //       return;
  //     }

  //     if (!category.trim()) {
  //       toast.error("Category is required.");
  //       return;
  //     }

  //     if (!tags.length) {
  //       toast.error("At least one tag is required.");
  //       return;
  //     }
  //     await createCourse({ courseTitle, tags, category });
  //     navigate("/admin/course");
  //   };

  //   useEffect(() => {
  //     if (isSuccess) {
  //       toast.success(data?.message || "Course added successfully!");
  //     }
  //     if (error) {
  //       toast.error(error.data?.message || "Failed to add course!");
  //     }
  //   }, [isSuccess, error, data?.message]);

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  return (
    <div className="flex-1 mx-10">
      {/* Header */}
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
          accusamus.
        </h1>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          doloremque quo laboriosam minima eligendi quae officia maiores a in
          cum!
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Title */}
        <div className="space-y-1">
          <Label htmlFor="courseTitle">Title</Label>
          <Input
            id="courseTitle"
            name="courseTitle"
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Title"
            className="focus-visible:ring-0"
          />
        </div>

        {/* Tags */}
        <div className="space-y-1">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            name="tags"
            type="text"
            placeholder="e.g. JavaScript, Web Dev, React"
            className="focus-visible:ring-0"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                const value = e.currentTarget.value.trim().replace(",", "");
                if (value && !tags.includes(value)) {
                  setTags([...tags, value]);
                  e.currentTarget.value = "";
                }
              }
            }}
          />
          {/* Tag Preview */}
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center"
              >
                {tag}
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => removeTag(tag)}
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="space-y-1">
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="information-technology">
                  Information Technology
                </SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="language-communication">
                  Language & Communication
                </SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="arts-hobbies">Arts & Hobbies</SelectItem>
                <SelectItem value="other">Others</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button>
            Create
            {/* {isLoading ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <ChevronRight className="ml-2 h-4 w-4" />
            )} */}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
