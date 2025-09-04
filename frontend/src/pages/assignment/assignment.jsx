import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const letters = ["A", "B", "C", "D", "E"];

export default function Assignment() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [serverQuestion, setQuestions] = useState([]);
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const { courseId } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/course/${courseId}/assignment`,
        { withCredentials: true }
      );
      const Title = res.data.assignment.title;
      const questions = res.data.assignment?.questions || [];
      setAssignmentTitle(Title);
      setQuestions(questions);
    };
    fetch();
  }, [courseId]);

  const handleSelect = (qIndex, optIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleSubmit = () => setSubmitted(true);

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const score = submitted
    ? serverQuestion.reduce((acc, q, i) => {
        const correctIdx = q.answer
          ? letters.indexOf(q.answer.toUpperCase())
          : -1;
        return acc + (answers[i] === correctIdx ? 1 : 0);
      }, 0)
    : 0;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          {assignmentTitle || "Assignment Quiz"}
        </h1>
        <p className="text-gray-600">Test your knowledge below 👇</p>
      </div>

      {/* Score after submission */}
      {submitted && (
        <div className="mb-8 text-center bg-blue-50 border border-blue-200 rounded-xl py-4">
          <p className="text-2xl font-bold text-blue-800">
            🎉 You scored {score} / {serverQuestion.length}
          </p>
        </div>
      )}

      {/* Questions */}
      {serverQuestion.map((q, qIndex) => {
        const correctIdx = q.answer
          ? letters.indexOf(q.answer.toUpperCase())
          : -1;

        return (
          <div
            key={qIndex}
            className="bg-white p-6 rounded-2xl shadow-md mb-6 border border-gray-100 hover:shadow-xl transition-all"
          >
            {/* Question header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {qIndex + 1}. {q.question}
              </h3>
              <span className="text-sm text-gray-500">
                Question {qIndex + 1} of {serverQuestion.length}
              </span>
            </div>

            {/* Answer options */}
            <ul className="space-y-3">
              {q.options.map((option, optIndex) => {
                const isSelected = answers[qIndex] === optIndex;
                const isCorrect = submitted && optIndex === correctIdx;
                const isWrong =
                  submitted && isSelected && optIndex !== correctIdx;

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
                            : "hover:bg-gray-50 border-gray-200"
                        }`}
                    >
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        checked={isSelected}
                        onChange={() => handleSelect(qIndex, optIndex)}
                        className="mr-3 w-5 h-5 text-blue-600 accent-blue-600"
                        disabled={submitted}
                      />
                      <span className="font-bold text-gray-700 mr-2">
                        {letters[optIndex]}.
                      </span>
                      <span className="text-gray-800">{option}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      {/* Buttons */}
      {!submitted ? (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 shadow-lg transition-all"
          >
            Submit Assignment
          </button>
        </div>
      ) : (
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={handleRetry}
            className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 shadow-md"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
