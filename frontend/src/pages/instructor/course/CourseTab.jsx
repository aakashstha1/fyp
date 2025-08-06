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

import { X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
const course = [
  {
    _id: "1",
    courseTitle: "React for Beginners",
    category: "web-development",
    coursePrice: 49.99,
    isPublished: true,
    // lectures: [
    //   {
    //     id: 1,
    //     lectureTitle: "A",
    //   },
    // ],
  },
];
function CourseTab() {
  // const params = useParams();
  // const courseId = params.courseId;
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [preview, setPreview] = useState(null);

  const [input, setInput] = useState({
    courseTitle: "",
    subtitle: "",
    // description: "",
    tags: [],
    category: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  // useEffect(() => {
  //   if (courseData?.course) {
  //     const course = courseData.course;

  //     setInput({
  //       courseTitle: course.courseTitle || "",
  //       subtitle: course.subtitle || "",
  //       description: course.description || "",
  //       tags: course.tags || [],
  //       category: course.category || "",
  //       coursePrice: course.coursePrice || "",
  //       courseThumbnail: "",
  //     });
  //     setTags(course.tags || []);
  //   }
  // }, [courseData]);

  // const publishStatusHandler = async (action) => {
  //   try {
  //     const response = await publishCourse({ courseId, query: action });
  //     if (response?.data) {
  //       refetch();
  //       toast.success(response.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Action failed!");
  //   }
  // };

  // const [editCourse, { data, isLoading, isSuccess, error }] =
  //   useEditCourseMutation();

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
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // const updateCourse = async () => {
  //   const formData = new FormData();
  //   formData.append("courseTitle", input.courseTitle);
  //   formData.append("subtitle", input.subtitle);
  //   formData.append("description", input.description);
  //   input.tags.forEach((tag) => {
  //     formData.append("tags", tag);
  //   });
  //   formData.append("category", input.category);
  //   formData.append("coursePrice", input.coursePrice);
  //   formData.append("courseThumbnail", input.courseThumbnail);

  //   await editCourse({ formData, courseId });
  //   // console.log(input);
  // };

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success(data?.message || "Course updated!");
  //   }
  //   if (error) {
  //     toast.error(error.data?.message || "Failed to update!");
  //   }
  // }, [isSuccess, error, data?.message]);

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    setInput({ ...input, tags: updatedTags }); // <-- sync here too
  };
  // if (isFetching) return <CustomLoader />;

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
            // disabled={course.lectures.length === 0}
            // onClick={() =>
            //   publishStatusHandler(
            //     courseData?.course.isPublished ? "false" : "true"
            //   )
            // }
          >
            {course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button className="cursor-pointer">Go to Lecture</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div className="space-y-1">
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
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
                    <SelectItem value="frontend-development">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="backend-development">
                      Backend Development
                    </SelectItem>
                    <SelectItem value="fullstack-development">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="mern-stack">MERN Stack</SelectItem>
                    <SelectItem value="python-development">
                      Python Development
                    </SelectItem>
                    <SelectItem value="reactjs">React.js</SelectItem>
                    <SelectItem value="nodejs-development">
                      Node.js Development
                    </SelectItem>
                    <SelectItem value="database-management">
                      Database Management
                    </SelectItem>
                    <SelectItem value="cloud-computing">
                      Cloud Computing
                    </SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Price</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
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
              <img src={preview} className="w-64 my-2" alt="course" />
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => navigate("/admin/course")}>
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseTab;
