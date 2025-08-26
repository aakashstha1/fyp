import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { ChevronLeft, Loader2, CheckCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function EditLecture() {
  const navigate = useNavigate();
  const { lectureId, courseId } = useParams(); // ensure courseId is available
  const API_URL = "http://localhost:8000/api";

  const [lecture, setLecture] = useState({});
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null); // { videoUrl, publicId }
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [originalLecture, setOriginalLecture] = useState({});

  // Fetch lecture data
  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const res = await axios.get(`${API_URL}/course/lecture/${lectureId}`, {
          withCredentials: true,
        });
        const lec = res?.data?.lecture;
        // console.log(lec);
        setLecture(lec || {});
        setOriginalLecture(lec || {});
        setTitle(lec?.lectureTitle || "");
        setVideo(lec?.videoName || null);
        setIsPreviewFree(lec?.isPreviewFree ?? false);
        setVideoInfo({ videoUrl: lec?.videoUrl, publicId: lec?.publicId });
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch lecture!");
      }
    };
    fetchLecture();
  }, [lectureId]);

  // Upload video
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMediaProgress(true);
    setUploadProgress(0);
    setVideo(file);
    console.log("file", file);

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
            const percent = Math.floor(
              (progressEvent.loaded * 99) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );

      // Make sure response includes both videoUrl and publicId
      const uploadedVideo = {
        videoUrl: res.data.data.url,
        publicId: res.data.data.public_id,
        videoName: file.name,
      };
      // console.log("uploaded video", uploadedVideo);

      setVideoInfo(uploadedVideo);
      toast.success(res.data.message || "Video uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload video!");
    } finally {
      setMediaProgress(false);
    }
  };

  // Update lecture
  const updateLectureHandler = async () => {
    setLoading(true);
    try {
      const payload = {};

      if (title.trim() && title.trim() !== originalLecture.lectureTitle) {
        payload.lectureTitle = title.trim();
      }

      if (
        typeof isPreviewFree === "boolean" &&
        isPreviewFree !== originalLecture.isPreviewFree
      ) {
        payload.isPreviewFree = isPreviewFree;
      }

      // Compare publicId for detecting new video
      if (
        videoInfo?.publicId &&
        videoInfo.publicId !== originalLecture.publicId
      ) {
        payload.videoInfo = videoInfo;
      }

      if (Object.keys(payload).length === 0) {
        toast.error("Nothing to update!");
        setLoading(false);
        return;
      }

      const res = await axios.put(
        `${API_URL}/course/${courseId}/lecture/${lectureId}`,
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Lecture updated successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update lecture!");
    } finally {
      setLoading(false);
    }
  };

  if (!lecture) return <p>Loading lecture...</p>;

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-semibold mb-6">Edit Lecture</h1>

      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
        {/* Lecture Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Lecture Title</Label>
          <Input
            id="title"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Video Upload */}
        <div className="space-y-2">
          <Label htmlFor="video">Upload Video</Label>
          <Input
            id="video"
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
          />

          {/* Upload Progress */}
          {mediaProgress && (
            <div className="space-y-2">
              <Progress value={uploadProgress} />
              <p className="text-sm text-muted-foreground">
                {uploadProgress}% Uploaded
              </p>
            </div>
          )}

          {video && !mediaProgress && (
            <p className="text-sm text-green-600 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {video.name ? video.name : video}
            </p>
          )}

          {/* Only show uploaded video preview */}
          {videoInfo?.videoUrl && !mediaProgress && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">Video Preview:</p>
              <video
                src={videoInfo.videoUrl}
                controls
                className="w-100 rounded-md border"
              />
            </div>
          )}
        </div>

        {/* Free Preview */}
        <div className="flex items-center gap-2">
          <Switch
            id="free"
            checked={isPreviewFree ?? false}
            onCheckedChange={setIsPreviewFree}
          />
          <Label htmlFor="free">This lecture is free to preview</Label>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button
            onClick={updateLectureHandler}
            disabled={loading || mediaProgress}
          >
            {loading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" /> Updating
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditLecture;
