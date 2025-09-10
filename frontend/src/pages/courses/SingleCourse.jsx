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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function SingleCourse() {
  // const levelClassName = {
  //   Beginner: "bg-green-200 text-green-800",
  //   Intermediate: "bg-yellow-200 text-yellow-800",
  //   Advance: "bg-red-200 text-red-800",
  // };
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [course, setCourse] = useState({});
  const [lectures, setLectures] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);

  const [averageRating, setAverageRating] = useState(0);
  const [ratingsCount, setRatingsCount] = useState(0);

  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const API_URL = "http://localhost:8000/api";
  const { courseId } = useParams();
  // const ESEWA_PRODUCT_CODE = import.meta.env.VITE_ESEWA_PRODUCT_CODE;

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
        if (res?.data?.course?.enrolledStudents?.includes(currentUser?._id)) {
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
  }, [courseId]);

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
    if (!isEnrolled) {
      toast.error("You must be enrolled to rate this course!");
      return;
    }

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

  //handel enrollement
  // const handleEnrollment = async () => {
  //   if (!currentUser) {
  //     toast.error("You must be logged in to enroll!");
  //     navigate("/login");
  //     return;
  //   }

  //   const payload = {
  //     courseId,
  //     totalPrice: course.price,
  //   };
  //   try {
  //     const res = await axios.post(`${API_URL}/enroll`, payload, {
  //       withCredentials: true,
  //     });
  //     toast.success(res?.data?.message || "Enrolled succesfully!");
  //     navigate(`/course/${courseId}/progress`);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error?.response?.data?.message || "Failed to enroll!");
  //   }
  // };

  // handle Payment
  // const handlePayment = async () => {
  //   if (!currentUser) {
  //     toast.error("You must be logged in to purchase.");
  //     return;
  //   }

  //   setPaymentLoading(true);
  //   setIsPaymentDialogOpen(false); // close dialog

  //   try {
  //     const res = await axios.post(
  //       `${API_URL}/payment/initialize-payment`,
  //       {
  //         courseId,
  //         totalPrice: course.price,
  //         paymentGateway: "esewa",
  //       },
  //       { withCredentials: true }
  //     );
  //     console.log(res);
  //   } finally {
  //     setPaymentLoading(false);
  //   }
  // };
  const handlePayment = async () => {
    if (!currentUser) {
      toast.error("Login required");
      navigate("/login");
      return;
    }

    setPaymentLoading(true);
    try {
      // Initialize payment on backend
      const res = await axios.post(
        "http://localhost:8000/api/payment/initialize-payment",
        { courseId, totalPrice: course.price },
        { withCredentials: true }
      );

      const { payment } = res.data;

      // Create dynamic form for eSewa
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
      form.target = "_blank";

      Object.entries(payment).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      navigate(`/course/${courseId}/progress`);
      toast.success(res?.data?.message || "Course enrolled succesfully!");
    } catch (err) {
      console.error(err);
      toast.error("Payment initialization failed");
    } finally {
      setPaymentLoading(false);
    }
  };

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
          {/* <Badge className={`${levelClassName[course?.level]}`}>
            {course.level}
          </Badge> */}

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
                  <AvatarImage
                    src={course?.creator?.imageUrl}
                    className="object-cover"
                  />
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
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => {
                    if (
                      isEnrolled ||
                      currentUser?._id === course?.creator?._id
                    ) {
                      navigate(`/course/${courseId}/progress`);
                    } else {
                      setIsPaymentDialogOpen(true);
                    }
                  }}
                >
                  {isEnrolled || currentUser?._id === course?.creator?._id
                    ? "Go to Lessons"
                    : "Enroll Now"}
                </Button>

                {/* 
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => {
                    if (
                      isEnrolled ||
                      currentUser?._id === course?.creator?._id
                    ) {
                      navigate(`/course/${courseId}/progress`);
                    } else {
                      setIsPurchaseDialogOpen(true);
                    }
                  }}
                >
                  {isEnrolled || currentUser?._id === course?.creator?._id
                    ? "Go to Lessons"
                    : "Enroll Now"}
                </Button>
                */}
                {/* <Dialog
                  open={isPurchaseDialogOpen}
                  onOpenChange={setIsPurchaseDialogOpen}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Enrollment</DialogTitle>
                      <DialogDescription>
                        Do you want to purchase this course for Rs.{" "}
                        {course.price}?
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsPurchaseDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={async () => {
                          setIsPurchaseDialogOpen(false);
                          await handleEnrollment(); // your existing enrollment function
                        }}
                      >
                        Purchase
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog> */}
              </div>
              {isEnrolled && (
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
              )}

              <Dialog
                open={isPaymentDialogOpen}
                onOpenChange={setIsPaymentDialogOpen}
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Complete Your Enrollment</DialogTitle>
                    <DialogDescription>
                      Do you want to purchase this course for Rs. {course.price}
                      ?
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsPaymentDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handlePayment} disabled={paymentLoading}>
                      {paymentLoading ? "Processing..." : "Pay with eSewa"}
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

            {course?.assignment && (
              <li className="flex justify-between items-center px-3 py-4 border rounded-md text-gray-800 hover:bg-gray-50 cursor-pointer transition">
                <span className="leading-tight">
                  {`Assignment - ${course?.assignment?.title}`}
                </span>
                <Lock className="w-4 h-4 text-gray-400" />
              </li>
            )}
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
