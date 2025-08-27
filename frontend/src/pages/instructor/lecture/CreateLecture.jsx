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
  const navigate = useNavigate();

  const API_URL = "http://localhost:8000/api";
  const { courseId } = useParams();

  const [lectures, setLectures] = useState([]);

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
    fetchLectures();
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
      await axios.delete(`${API_URL}/course/${courseId}/lecture/${lectureId}`, {
        withCredentials: true,
      });
      setLectures(lectures.filter((lec) => lec._id !== lectureId));
      toast.success("Lecture removed!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove lecture!");
    }
  };

  const editLectureHandler = (id) => {
    navigate(`${id}`);
  };

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Manage Lectures
        </h1>
        <p className="text-sm text-muted-foreground">
          Upload your video and add lecture details below.
        </p>
      </div>

      {/* Form Section */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
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
          <Button variant="outline" onClick={() => window.history.back()}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
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
                  >
                    <Trash className="mr-1 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateLecture;
