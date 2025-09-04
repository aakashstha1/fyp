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

  // Fetch quiz
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

  // Timer
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
      console.log(answers);
      const res = await axios.post(
        "http://localhost:8000/api/quize/submit",
        { answers }, // Already letters
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
    return <p className="text-center p-10 animate-pulse">Loading quiz...</p>;
  if (error) return <p className="text-center p-10 text-red-600">{error}</p>;
  if (!quiz) return null;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
      <h2 className="text-4xl font-bold text-center mb-8">{quiz.title}</h2>

      {quiz.questions?.map((q, idx) => {
        const correctLetter = q.answer;

        return (
          <div key={q._id || idx} className="bg-white p-6 rounded shadow mb-6">
            <h3 className="mb-4">
              {idx + 1}. {q.question}
            </h3>
            <ul className="space-y-2">
              {q.options.map((option, optIndex) => {
                const letter = ["A", "B", "C", "D"][optIndex];
                const isSelected = answers[q._id] === letter;
                const isCorrect = submitted && letter === correctLetter;
                const isWrong = submitted && isSelected && !isCorrect;

                return (
                  <li key={optIndex}>
                    <label
                      className={`flex items-center p-2 rounded border cursor-pointer
                      ${
                        isCorrect
                          ? "bg-green-100 border-green-400"
                          : isWrong
                          ? "bg-red-100 border-red-400"
                          : isSelected
                          ? "bg-blue-100 border-blue-400"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${idx}`}
                        checked={isSelected}
                        onChange={() => handleAnswerChange(q._id, letter)}
                        disabled={submitted}
                        className="mr-2"
                      />
                      <span className="font-bold mr-2">{letter}.</span>
                      <span>{option}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      {!submitted && (
        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
}
