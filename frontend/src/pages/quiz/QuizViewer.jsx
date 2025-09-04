"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function QuizViewer() {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/quize/view",
          {},
          { withCredentials: true }
        );
        if (res.data.quizzes?.length > 0) setQuiz(res.data.quizzes[0]);
        else setError("No quiz available right now.");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch quiz.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (!quiz || submitted) return;
    if (timeLeft <= 0) handleSubmit();

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted, quiz]);

  const handleAnswerChange = (questionId, selectedLetter) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedLetter }));
  };

  const handleSubmit = async () => {
    if (submitted) return;
    setSubmitted(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/quize/submit",
        { answers },
        { withCredentials: true }
      );

      toast.success(`Score: ${res.data.score}/${res.data.total}`);
      navigate("/leaderboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Submission failed.");
      setSubmitted(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500 text-lg animate-pulse">Loading quiz...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-600 text-lg font-semibold bg-red-100 px-6 py-3 rounded shadow">
          {error}
        </p>
      </div>
    );

  if (!quiz) return null;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
            {quiz.title}
          </h1>
          <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner mt-2">
            <div
              className="absolute top-0 left-0 h-4 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 transition-all duration-500"
              style={{ width: `${(timeLeft / 60) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-gray-700 dark:text-gray-300 font-medium">
            Time Left: {timeLeft}s
          </p>
        </div>

        {/* Questions */}
        {quiz.questions?.map((q, idx) => {
          const correctLetter = q.answer;
          return (
            <div
              key={q._id || idx}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {idx + 1}. {q.question}
              </h2>
              <ul className="space-y-3">
                {q.options.map((option, optIndex) => {
                  const letter = ["A", "B", "C", "D"][optIndex];
                  const isSelected = answers[q._id] === letter;
                  const isCorrect = submitted && letter === correctLetter;
                  const isWrong = submitted && isSelected && !isCorrect;

                  return (
                    <li key={optIndex}>
                      <label
                        className={`flex items-center p-4 rounded-xl cursor-pointer border transition transform hover:scale-[1.02]
                          ${
                            isCorrect
                              ? "bg-green-50 border-green-400"
                              : isWrong
                              ? "bg-red-50 border-red-400"
                              : isSelected
                              ? "bg-blue-50 border-blue-400"
                              : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name={`q-${idx}`}
                          checked={isSelected}
                          onChange={() => handleAnswerChange(q._id, letter)}
                          disabled={submitted}
                          className="mr-3 w-5 h-5 text-blue-600 accent-blue-600"
                        />
                        <span className="font-bold text-gray-700 dark:text-gray-200 mr-3">
                          {letter}.
                        </span>
                        <span className="text-gray-800 dark:text-gray-100">
                          {option}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        {!submitted && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              Submit Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
