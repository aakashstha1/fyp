// CourseProgress.js
import { Loader2, RotateCcwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LectureList from "./LecturesList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

function CourseProgress() {
  const [videoLoading, setVideoLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [assignment, setAssignment] = useState(null);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [completedLectures, setCompletedLectures] = useState([]);
  const [assignmentCompleted, setAssignmentCompleted] = useState(false);
  const [mcqData, setMcqData] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const { courseId } = useParams();
  const API_URL = "http://localhost:8000/api";

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${API_URL}/course/${courseId}/lectures`, {
          withCredentials: true,
        });
        const courseData = res?.data?.course;

        const progressRes = await axios.get(`${API_URL}/progress/${courseId}`, {
          withCredentials: true,
        });

        const completedIds = progressRes.data.completedLectures || [];
        const completedAssignmentId =
          progressRes.data.completedAssignment || null;

        const updatedLectures = courseData?.lectures.map((lec) => ({
          ...lec,
          completed: completedIds.map(String).includes(String(lec._id)),
        }));

        setCourse(courseData);
        setLectures(updatedLectures);
        setCompletedLectures(completedIds);
        setAssignment(courseData.assignment);
        setAssignmentCompleted(
          completedAssignmentId &&
            completedAssignmentId.toString() === courseData.assignment?._id
        );

        if (updatedLectures?.length > 0) setCurrentLecture(updatedLectures[0]);
      } catch (error) {
        console.log("Error fetching course or assignment:", error);
      }
    };

    fetchCourse();
  }, [courseId]);

  // Parse CSV for assignment
  useEffect(() => {
    const fetchCSV = async () => {
      if (
        currentLecture &&
        currentLecture._id === assignment?._id &&
        assignment.csvFileUrl
      ) {
        try {
          const res = await fetch(assignment.csvFileUrl);
          const text = await res.text();
          const lines = text.split("\n").filter((line) => line.trim() !== "");

          const parsed = lines.slice(1).map((line) => {
            const cells = line.split(",");
            return {
              id: cells[0],
              question: cells[1],
              options: [cells[2], cells[3], cells[4], cells[5]],
              correct: cells[6],
            };
          });

          setMcqData(parsed);
          setAnswers({});
          setResult(null);
        } catch (error) {
          console.log("Error parsing CSV:", error);
          setMcqData([]);
        }
      }
    };

    fetchCSV();
  }, [currentLecture, assignment]);

  // Lecture complete handler
  const handleLectureComplete = async (lectureId) => {
    try {
      await axios.post(
        `${API_URL}/progress/complete`,
        { courseId, lectureId },
        { withCredentials: true }
      );

      setLectures((prev) =>
        prev.map((lec) =>
          lec._id === lectureId ? { ...lec, completed: true } : lec
        )
      );

      setCompletedLectures((prev) => {
        const updated = prev.includes(lectureId) ? prev : [...prev, lectureId];
        checkCourseCompletion(updated, assignmentCompleted);
        return updated;
      });
    } catch (error) {
      console.log("Error marking lecture complete:", error);
    }
  };

  // Assignment submit handler
  const handleSubmit = () => {
    if (mcqData.some((_, idx) => !answers[idx])) {
      toast.error("Please answer all questions before submitting!");
      return;
    }

    setDialogOpen(true);
    setCalculating(true);

    setTimeout(async () => {
      let score = 0;
      mcqData.forEach((q, idx) => {
        if (answers[idx] && answers[idx] === q.correct) score++;
      });

      setResult({ score, total: mcqData.length });
      setCalculating(false);

      // If full marks -> mark assignment completed like lecture
      if (score === mcqData.length && assignment?._id) {
        try {
          await axios.post(
            `${API_URL}/progress/complete-assignment`,
            { courseId, assignmentId: assignment._id },
            { withCredentials: true }
          );

          setAssignmentCompleted(true);
          checkCourseCompletion(completedLectures, true);
          toast.success("Congratulations! Assignment completed.");
        } catch (error) {
          console.log("Error marking assignment complete:", error);
        }
      }
    }, 1000);

    setAnswers({});
  };

  const handleAnswerChange = (qIndex, value) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: value }));
  };

  const handleRetry = () => {
    setDialogOpen(false);
    setResult(null);
    setAnswers({});
  };

  // Check if all lectures + assignment completed
  const checkCourseCompletion = (completedLecturesList, assignmentDone) => {
    if (
      completedLecturesList.length === lectures.length &&
      assignmentDone &&
      !courseCompleted
    ) {
      setCourseCompleted(true);
      toast.success(" Congratulations! You completed the course.");
    }
  };

  return (
    <div className="">
      {course && (
        <div className="flex text-center lg:text-left p-5 gap-2">
          <span className="w-1 h-8 bg-amber-500 rounded-sm"></span>
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 px-10">
        <LectureList
          lectures={lectures}
          currentLecture={currentLecture}
          onSelect={setCurrentLecture}
          assignment={assignment}
          completedLectures={completedLectures}
          assignmentCompleted={assignmentCompleted}
        />

        <div className="flex-1">
          {currentLecture ? (
            currentLecture.videoUrl ? (
              <div className="w-full flex flex-col gap-2">
                <div className="w-full aspect-video bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center relative">
                  {videoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  )}
                  <video
                    src={currentLecture.videoUrl}
                    controls
                    className="w-full h-full object-contain"
                    onLoadedData={() => setVideoLoading(false)}
                    onLoadStart={() => setVideoLoading(true)}
                    onEnded={() => handleLectureComplete(currentLecture._id)}
                  />
                </div>

                {/* Lecture Title */}
                <p className="text-xl font-bold text-gray-800 truncate">
                  {currentLecture.lectureTitle}
                </p>
              </div>
            ) : currentLecture._id === assignment?._id ? (
              <div className="bg-gray-50 p-6 rounded-xl  overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">{assignment.title}</h2>
                {mcqData.length === 0 ? (
                  <p className="text-gray-500">Loading questions...</p>
                ) : (
                  <>
                    {mcqData.map((q, idx) => (
                      <div key={idx} className="mb-6">
                        <p className="font-semibold">
                          {idx + 1}. {q.question}
                        </p>
                        <div className="flex flex-row gap-4 mt-2">
                          {q.options.map((opt, i) => (
                            <label
                              key={i}
                              className="flex items-center gap-1 border p-2 rounded hover:bg-gray-100"
                            >
                              <input
                                type="radio"
                                name={`q-${idx}`}
                                value={String.fromCharCode(65 + i)}
                                checked={
                                  answers[idx] === String.fromCharCode(65 + i)
                                }
                                onChange={() =>
                                  handleAnswerChange(
                                    idx,
                                    String.fromCharCode(65 + i)
                                  )
                                }
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={handleSubmit}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Submit
                    </button>

                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {calculating ? "Calculating..." : "Your Result"}
                          </DialogTitle>
                          <DialogDescription>
                            {calculating ? (
                              <div className="flex items-center gap-2">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Calculating your score...
                              </div>
                            ) : (
                              <h2 className="text-lg">
                                You scored{" "}
                                <span className="font-semibold">
                                  {result?.score}
                                </span>{" "}
                                out of{" "}
                                <span className="font-semibold">
                                  {result?.total}
                                </span>
                              </h2>
                            )}
                          </DialogDescription>
                        </DialogHeader>

                        {!calculating && (
                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={handleRetry}
                              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                              <RotateCcwIcon className="h-4 w-4 " /> Retry
                            </button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No video or assignment selected</p>
            )
          ) : (
            <p className="text-gray-500">No lecture selected</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseProgress;
