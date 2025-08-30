import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import {
  ChevronLeft,
  Loader2,
  PlusCircle,
  Pencil,
  Trash,
  Upload,
  CheckCircle,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function CreateLecture() {
  const [lectureTitle, setLectureTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [loading, setLoading] = useState(false);

  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [assignmentUploading, setAssignmentUploading] = useState(false);
  const [assignmentProgress, setAssignmentProgress] = useState(0);

  const [removingLectureId, setRemovingLectureId] = useState(null);
  const [removingAssignment, setRemovingAssignment] = useState(false);

  const navigate = useNavigate();

  const API_URL = "http://localhost:8000/api";
  const { courseId } = useParams();

  const [lectures, setLectures] = useState([]);
  const [assignment, setAssignment] = useState("");

  // Fetch course lectures
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await axios.get(`${API_URL}/course/${courseId}/lectures`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setLectures(res.data.lectures);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const fetchAssignment = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/course/${courseId}/assignment`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setAssignment(res.data.assignment);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchLectures();
    fetchAssignment();
  }, [courseId]);

  // Upload Video
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMediaProgress(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${API_URL}/course/${courseId}/lecture/upload-video`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const rawPercent =
              (progressEvent.loaded * 100) / progressEvent.total;
            const smoothPercent = Math.floor(rawPercent / 10) * 10;

            setUploadProgress((prev) =>
              smoothPercent > prev ? Math.min(smoothPercent, 99) : prev
            );
          },
        }
      );

      setVideoUploaded(true);
      setVideo(file);
      setVideoInfo(res.data.data); // { videoUrl, publicId }
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload video!");
    } finally {
      setMediaProgress(false);
    }
  };

  // Create Lecture
  const createLectureHandler = async () => {
    if (!videoUploaded) return toast.error("Please upload a video first!");
    if (!lectureTitle.trim()) return toast.error("Lecture title required!");

    setLoading(true);
    try {
      const payload = {
        lectureTitle,
        isPreviewFree,
        videoInfo,
      };
      const res = await axios.post(
        `${API_URL}/course/${courseId}/lecture/create`,
        payload,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setLectures([...lectures, res.data.lecture]);
        setLectureTitle("");
        setVideo(null);
        setVideoInfo(null);
        setVideoUploaded(false);
        setIsPreviewFree(false);
        setUploadProgress(0);
        document.getElementById("video").value = "";
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create lecture!");
    } finally {
      setLoading(false);
    }
  };

  // Remove lecture
  const removeLectureHandler = async (lectureId) => {
    try {
      setRemovingLectureId(lectureId); // Start loader for this lecture
      await axios.delete(`${API_URL}/course/${courseId}/lecture/${lectureId}`, {
        withCredentials: true,
      });
      setLectures(lectures.filter((lec) => lec._id !== lectureId));
      toast.success("Lecture removed!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove lecture!");
    } finally {
      setRemovingLectureId(null); // Stop loader
    }
  };

  const editLectureHandler = (id) => {
    navigate(`${id}`);
  };

  //Assignment Handler
  const assignmentFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (
      ![
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(file.type)
    ) {
      toast.error("Only CSV or Excel files are allowed!");
      return;
    }
    setAssignmentFile(file);
  };

  const createAssignmentHandler = async () => {
    if (!assignmentTitle.trim())
      return toast.error("Assignment title required!");
    if (!assignmentFile) return toast.error("Please upload a CSV/Excel file!");

    setAssignmentUploading(true);
    const formData = new FormData();
    formData.append("title", assignmentTitle);
    formData.append("file", assignmentFile);

    try {
      const res = await axios.post(
        `${API_URL}/course/${courseId}/assignment/create`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setAssignmentProgress(percent);
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // reset form
        setAssignment(res.data.assignment);
        setAssignmentTitle("");
        setAssignmentFile(null);
        setAssignmentProgress(0);
        document.getElementById("assignmentFile").value = "";
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create assignment!");
    } finally {
      setAssignmentUploading(false);
    }
  };

  // Update Assignment
  const updateAssignmentHandler = async () => {
    if (!assignmentTitle.trim())
      return toast.error("Assignment title required!");
    if (!assignmentFile) return toast.error("Please upload a CSV/Excel file!");

    setAssignmentUploading(true);
    const formData = new FormData();
    formData.append("title", assignmentTitle);
    formData.append("file", assignmentFile);

    try {
      const res = await axios.put(
        `${API_URL}/course/${courseId}/assignment/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setAssignmentProgress(percent);
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setAssignment(res.data.assignment); // refresh assignment
        setAssignmentTitle("");
        setAssignmentFile(null);
        setAssignmentProgress(0);
        document.getElementById("assignmentFile").value = "";
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update assignment!");
    } finally {
      setAssignmentUploading(false);
    }
  };

  // Remove Assignment
  const removeAssignmentHandler = async () => {
    try {
      setRemovingAssignment(true); // Start loader for assignment
      const res = await axios.delete(
        `${API_URL}/course/${courseId}/assignment/remove`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setAssignment(null); // clear UI
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove assignment!");
    } finally {
      setRemovingAssignment(false); // Stop loader
    }
  };

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        </button>

        {/* Title and description */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Course Content Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Upload videos, add lectures, and manage assignments for this course.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Lecture adding Section */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6 w-full">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lectureTitle">Lecture Title</Label>
              <Input
                id="lectureTitle"
                value={lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
                placeholder="e.g. Introduction to React"
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="free"
                checked={isPreviewFree}
                onCheckedChange={setIsPreviewFree}
              />
              <Label htmlFor="free">This lecture is free to preview</Label>
            </div>
          </div>

          {/* Upload Video Section */}
          <div className="space-y-2">
            <Label htmlFor="video">Select Video File</Label>
            <Input
              id="video"
              type="file"
              accept="video/*"
              onChange={fileChangeHandler}
              disabled={mediaProgress}
            />

            {mediaProgress && (
              <div className="space-y-2">
                <Progress value={uploadProgress} />
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}

            {videoUploaded && (
              <>
                <p className="text-sm text-green-600 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Video uploaded: {video?.name || videoInfo?.display_name}
                </p>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 pt-4 border-t">
            <Button
              onClick={createLectureHandler}
              disabled={loading || !videoUploaded || !lectureTitle.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Lecture
                </>
              )}
            </Button>
          </div>
        </div>
        {/* Assignment adding Section  */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6 w-full">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="assignmetnTitle">Assignment Title</Label>
              <Input
                id="assignmetnTitle"
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)}
                placeholder="e.g. Introduction to React"
              />
            </div>
          </div>

          {/* Upload CSV/Excel */}
          <div className="space-y-2">
            <Label htmlFor="assignmentFile">Upload CSV/Excel File</Label>
            <Input
              id="assignmentFile"
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={assignmentFileChange}
            />

            {assignmentUploading && (
              <>
                <Progress value={assignmentProgress} />
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Upload className="w-4 h-4" /> Uploading...{" "}
                  {assignmentProgress}%
                </p>
              </>
            )}

            {assignmentFile && !assignmentUploading && (
              <p className="text-sm text-green-600 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Selected:{" "}
                {assignmentFile.name}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t">
            <Button
              onClick={
                assignment ? updateAssignmentHandler : createAssignmentHandler
              }
              disabled={
                assignmentUploading ||
                !assignmentTitle.trim() ||
                !assignmentFile
              }
            >
              {assignmentUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {assignment ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {assignment ? "Update Assignment" : "Add Assignment"}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Lecture List */}
      <div className="mt-10">
        <h2 className="text-lg font-medium mb-4">
          Lectures ({lectures.length})
        </h2>
        {lectures.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-muted-foreground">
              No lectures yet. Upload a video and add your first lecture!
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {lectures.map((lecture, index) => (
              <div
                key={lecture._id}
                className="flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-5 rounded-md border"
              >
                <div>
                  <h1 className="font-bold text-gray-800 dark:text-gray-100">
                    Lecture {index + 1}: {lecture.lectureTitle}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    📹 {lecture.videoName}{" "}
                    {lecture.isPreviewFree && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 ml-2">
                        Free Preview
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editLectureHandler(lecture._id)}
                  >
                    <Pencil className="mr-1 h-4 w-4" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeLectureHandler(lecture._id)}
                    disabled={removingLectureId === lecture._id}
                  >
                    {removingLectureId === lecture._id ? (
                      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="mr-1 h-4 w-4" />
                    )}
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        {assignment && (
          <div className="flex items-center justify-between bg-blue-50 dark:bg-[#1E293B] px-4 py-5 rounded-md border border-blue-300 mt-4">
            <div>
              <h1 className="font-bold text-blue-800 dark:text-blue-200">
                Assignment: {assignment.title}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="destructive"
                onClick={removeAssignmentHandler}
                disabled={removingAssignment}
              >
                {removingAssignment ? (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                ) : (
                  <Trash className="mr-1 h-4 w-4" />
                )}
                Remove
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateLecture;
