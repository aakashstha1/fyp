import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import QuizQuestion from "./QuizQuestion";
import { useNavigate } from "react-router-dom";

function QuizViewer() {
  const { currentUser } = useAuth();
  const [questionData, setQuestionData] = useState(null);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.post("http://localhost:8000/api/quize/view", {
          userId: currentUser,
        });
        setQuestionData(res.data);
      } catch (err) {
        setError("Failed to fetch questions.");
      }
    };

    if (currentUser) fetchQuestions();
  }, [currentUser]);

  useEffect(() => {
    if (!submitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    try {
      const res = await axios.post("http://localhost:8000/api/quize/submit", {
        userId: currentUser,
        answers,
      });

      // Show success message then navigate
      alert("✅ Quiz submitted successfully! Redirecting to leaderboard...");
      navigate("/leaderboard"); // change path as per your route
    } catch (err) {
      alert("❌ Submission failed. Please try again.");
    }
  };

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-600 text-lg font-semibold bg-red-100 px-4 py-2 rounded shadow">
          {error}
        </p>
      </div>
    );

  if (!questionData)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-600 text-lg font-medium animate-pulse">
          Loading quiz...
        </p>
      </div>
    );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🧠 Quiz Time!
      </h2>
      <div className="text-center text-red-500 text-lg font-semibold mb-6">
        ⏳ Time Left: {timeLeft}'s
      </div>

      <div className="space-y-6">
        {questionData.questions.map((q, idx) => (
          <div
            key={q._id || idx}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <QuizQuestion
              index={idx}
              question={q}
              onAnswer={(selected) => handleAnswerChange(q._id, selected)}
            />
          </div>
        ))}
      </div>

      {!submitted && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 shadow-md transition-all"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizViewer;
