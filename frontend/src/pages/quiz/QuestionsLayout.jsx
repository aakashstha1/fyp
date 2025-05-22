import { quizQuestions } from "@/assets/data/quizQuestions";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";

function QuestionsLayout() {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          alert("Time's up! Submitting quiz...");
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleChange = (qId, optionIdx) => {
    setAnswers({ ...answers, [qId]: optionIdx });
  };

  const handleSubmit = () => {
    // Here you can send answers to backend or show results
    console.log("User answers:", answers);
    alert("Quiz submitted! Check console for answers.");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 my-10 bg-white dark:bg-gray-800 rounded shadow relative min-h-screen">
      {/* Sticky timer */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center z-10">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Quiz
        </h1>
        <div className="text-lg font-mono text-red-600 dark:text-red-400">
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      {/* Questions */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="mt-6 space-y-8"
      >
        {quizQuestions.map(({ id, question, options }) => (
          <div key={id}>
            <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {id}. {question}
            </p>
            <div className="space-y-1">
              {options.map((option, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${id}`}
                    value={idx}
                    checked={answers[id] === idx}
                    onChange={() => handleChange(id, idx)}
                    className="cursor-pointer"
                    required
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
export default QuestionsLayout;
