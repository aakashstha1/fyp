// import CustomLoader from "@/components/CustomLoader";
// import TextEditor from "@/components/TextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import { Loader2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
// import { toast } from "sonner";

function CourseTab() {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [preview, setPreview] = useState(null);
  const API_URL = "http://localhost:8000/api";
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    subtitle: "",
    // description: "",
    tags: [],
    category: "",
    price: "",
    thumbnail: "",
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${API_URL}/course/detail/${courseId}`, {
          withCredentials: true,
        });

        const fetchedCourse = res?.data?.course;
        setCourse(fetchedCourse);

        if (fetchedCourse) {
          setInput({
            title: fetchedCourse.title || "",
            subtitle: fetchedCourse.subtitle || "",
            tags: fetchedCourse.tags || [],
            category: fetchedCourse.category || "",
            price: fetchedCourse.price || "",
            thumbnail: "",
          });
          setTags(fetchedCourse.tags || []);
        }
        if (fetchedCourse.thumbnail) {
          setPreview(fetchedCourse.thumbnail);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [courseId, API_URL]);
  // console.log(course);

  const publishStatusHandler = async (newStatus) => {
    try {
      const res = await axios.patch(
        `${API_URL}/course/${courseId}?publish=${newStatus}`,
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message || "Status updated!");
      setCourse({ ...course, isPublished: newStatus === "true" });
    } catch (error) {
      console.log(error);
      toast.error("Action failed!");
    }
  };

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectedCategory = (value) => {
    setInput({ ...input, category: value });
  };

  //getFile
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, thumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourse = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("subtitle", input.subtitle);
      input.tags.forEach((tag) => formData.append("tags", tag));
      formData.append("category", input.category);
      formData.append("price", input.price);

      if (input.thumbnail) {
        formData.append("thumbnail", input.thumbnail); // file
      }

      const res = await axios.put(
        `${API_URL}/course/update/${courseId}`,
        formData,
        {
          withCredentials: true, // ensures cookies (JWT) are sent
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message || "Course updated!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error?.response?.data?.message || "Failed to update course!");
    } finally {
      setLoading(false);
    }
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    setInput({ ...input, tags: updatedTags }); // <-- sync here too
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Course Information</CardTitle>
          <CardDescription>Make changes</CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            className="cursor-pointer"
            disabled={!course?.lectures?.length}
            onClick={() =>
              publishStatusHandler(course.isPublished ? "false" : "true")
            }
          >
            {course.isPublished ? "Unpublish" : "Publish"}
          </Button>

          <Button
            className="cursor-pointer"
            onClick={() => navigate("lecture")}
          >
            Go to Lecture
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div className="space-y-1">
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              placeholder="Eg. Full Stack Developer"
            />
          </div>
          <div className="space-y-1">
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subtitle"
              value={input.subtitle}
              onChange={changeEventHandler}
              placeholder="Eg. Become a Full Stack developer "
            />
          </div>
          {/* <div className="space-y-1">
            <Label>Description</Label>
            <TextEditor input={input} setInput={setInput} />
            <Textarea
              type="text"
              name="subtitle"
              placeholder="Give short description about the course... "
            />
          </div> */}
          <div className="space-y-1">
            <Label>Tags</Label>
            <Input
              name="tags"
              type="text"
              placeholder="Press Enter or , after each tag"
              className="focus-visible:ring-0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  const value = e.currentTarget.value.trim().replace(",", "");
                  if (value && !tags.includes(value)) {
                    const updatedTags = [...tags, value];
                    setTags(updatedTags);
                    setInput({ ...input, tags: updatedTags }); // <-- sync to input state
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

          <div className="flex  items-center gap-5">
            {/* Category  */}
            <div className="space-y-1">
              <Label>Category</Label>
              <Select value={input.category} onValueChange={selectedCategory}>
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
            <div className="space-y-1">
              <Label>Price</Label>
              <Input
                type="number"
                name="price"
                value={input.price}
                onChange={changeEventHandler}
                placeholder="Eg. 499"
                className="w-fit"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {preview && (
              <img
                src={preview}
                className="w-64 my-2 border border-gray"
                alt="course"
              />
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button onClick={updateCourse}>
              {loading ? (
                <>
                  <Loader2 />
                  <p>Saving</p>
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseTab;
