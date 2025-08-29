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
import axios from "axios";
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const API_URL = "http://localhost:8000/api";

function AddCourse() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSelectedCategory = (value) => setCategory(value);

  const createCourseHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const inputs = {
        title,
        category,
        tags,
      };

      const res = await axios.post(`${API_URL}/course/create`, inputs, {
        withCredentials: true,
      });

      toast.success(res?.data?.message || "Course created successfully");

      setTitle("");
      setCategory("");
      setTags([]);

      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to create course!");
    } finally {
      setLoading(false);
    }
  };

  const removeTag = (tagToRemove) =>
    setTags(tags.filter((tag) => tag !== tagToRemove));

  return (
    <div className="flex-1 mx-10">
      {/* Header */}
      <div className="mb-4">
        <h1 className="font-bold text-xl">Create a New Course</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details below to add your course.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={createCourseHandler} className="space-y-4 w-100">
        {/* Title */}
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your Course Title"
            className="focus-visible:ring-0"
            required
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
                  aria-label={`Remove ${tag}`}
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
          <Select value={category} onValueChange={getSelectedCategory}>
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
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="other">Others</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <Button variant="outline" type="button" onClick={() => navigate(-1)}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button type="submit" disabled={loading}>
            Create
            {loading ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <ChevronRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddCourse;
