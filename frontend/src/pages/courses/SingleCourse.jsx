import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { Loader2, Lock, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function SingleCourse() {
  const levelClassName = {
    Beginner: "bg-green-200 text-green-800",
    Intermediate: "bg-yellow-200 text-yellow-800",
    Advance: "bg-red-200 text-red-800",
  };
  const { currentUser } = useAuth();
  const [course, setCourse] = useState({});
  const [lectures, setLectures] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [averageRating, setAverageRating] = useState(0);
  const [ratingsCount, setRatingsCount] = useState(0);

  const API_URL = "http://localhost:8000/api";
  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/course/published-course/${courseId}`,
          {
            withCredentials: true,
          }
        );

        setCourse(res?.data?.course);
        // console.log(course);
        setLectures(res?.data?.course?.lectures);
        // console.log(lectures);
        if (res?.data?.course?.enrolledStudents?.includes(currentUser._id)) {
          setIsEnrolled(true);
        }
      } catch (error) {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "Failed to fetch course!"
        );
      }
    };
    fetchCourse();
  }, [course, courseId, lectures]);

  //Fetch average rating
  const fetchAverageRating = async () => {
    try {
      const res = await axios.get(`${API_URL}/rating/${courseId}/average`, {
        withCredentials: true,
      });
      setAverageRating(res.data.averageStars);
      setRatingsCount(res.data.count);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchAverageRating();
  }, [courseId]);

  //Submit rating
  const submitRating = async () => {
    if (rating < 1) {
      toast.error("Please select rating before submiting!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/rating/submit`,
        {
          courseId: courseId, // replace with the current course ID
          stars: rating,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(res?.data?.message || "Rating submitted");
      setRating(0);
      await fetchAverageRating();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Rating failed");
      setRating(0);
    } finally {
      setLoading(false);
    }
  };

  // const purchased = true;
  return (
    <div className="space-y-10">
      {/* Course Overview */}
      <section className="bg-gray-900">
        <div className="max-w-7xl mx-auto space-y-6 py-8">
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              {/* Title on the left */}
              <h1 className="text-4xl font-bold text-white">{course?.title}</h1>
            </div>
            <p className="text-gray-400 text-lg mt-4">{course?.description}</p>
          </div>

          {/* Level */}
          <Badge className={`${levelClassName[course?.level]}`}>
            {course.level}
          </Badge>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {course?.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs bg-gray-200 text-gray-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Rating */}
          <p className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" fill="currentColor" />
            <span className="text-white">
              {averageRating.toFixed(1)} ({ratingsCount})
            </span>
          </p>
          {/* Instructor */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Instructor</h2>
              <div className="flex items-center gap-3 mt-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-white font-medium">
                  {course?.creator?.name}
                </span>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <div className="flex flex-col items-center">
                <h1 className="text-white font-semibold text-xl">
                  Rs. {course?.price || "N/A"}
                </h1>
                <Button variant="outline" className="cursor-pointer">
                  {isEnrolled ? "Go to Lessons" : "Enroll Now"}
                </Button>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Rate Course
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rate this Course</DialogTitle>
                    <DialogDescription>
                      How would you rate your experience?
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex justify-center space-x-1 my-4 text-3xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className={`cursor-pointer transition ${
                          (hover || rating) >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        <Star fill="currentColor" />
                      </span>
                    ))}
                  </div>

                  <DialogFooter>
                    <Button
                      onClick={async () => {
                        await submitRating();
                        setIsDialogOpen(false); // close dialog after submit
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <p>Submitting</p>
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>
      {/* Course Content and Preview */}
      <section className="max-w-6xl mx-auto flex items-start flex-col lg:flex-row gap-8 px-4">
        {/* Lecture List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border w-full lg:w-1/2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Course Content
          </h2>
          <ul className="space-y-2">
            {lectures?.map((lecture, index) => (
              <li
                key={index}
                className="flex justify-between items-center px-3 py-4 border rounded-md text-gray-800 hover:bg-gray-50 cursor-pointer transition"
              >
                <span className="leading-tight">
                  {`Lecture ${index + 1} - ${lecture.lectureTitle}`}
                </span>

                {/* Lock only if not free preview */}
                {!lecture.isPreviewFree && (
                  <Lock className="w-4 h-4 text-gray-400" />
                )}
              </li>
            ))}

            {course?.assignment?.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center px-3 py-4 border rounded-md text-gray-800 hover:bg-gray-50 cursor-pointer transition"
              >
                <span className="leading-tight">
                  {`Assignment ${index + 1} - ${item}`}
                </span>
                <Lock className="w-4 h-4 text-gray-400" />
              </li>
            ))}
          </ul>
        </div>

        {/* Preview Player */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border w-full lg:w-1/2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Preview</h2>
          <div className="rounded-lg overflow-hidden border">
            {lectures?.filter((lec) => lec.isPreviewFree)?.length > 0 ? (
              <video
                src={lectures.find((lec) => lec.isPreviewFree)?.videoUrl}
                controls
                style={{ aspectRatio: "16/9" }}
              />
            ) : (
              <p className="text-gray-500 p-4 text-center">
                No free preview available
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SingleCourse;
