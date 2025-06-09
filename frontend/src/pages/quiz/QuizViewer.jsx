import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import QuizQuestion from "./QuizQuestion";

function QuizViewer() {
  const { currentUser } = useAuth();
  const [questionData, setQuestionData] = useState(null);
  const [error, setError] = useState(null);

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

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!questionData)
    return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="space-y-6">
      {questionData.questions.map((q, idx) => (
        <QuizQuestion key={idx} index={idx} question={q} />
      ))}
    </div>
  );
}

export default QuizViewer;
