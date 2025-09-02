import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const letters = ["A", "B", "C", "D", "E"];

export default function Assignment() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [serverQuestion, setQuestions] = useState([]);
  const {courseId} = useParams();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/course/${courseId}/assignment`,
        { withCredentials: true }
      );
      const questions = res.data.assignment?.questions || [];
      setQuestions(questions);
    };
    fetch();
  }, []);

  const handleSelect = (qIndex, optIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleSubmit = () => setSubmitted(true);

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
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        📝 Assignment Quiz
      </h2>

      {serverQuestion.map((q, qIndex) => {
        const correctIdx = q.answer
          ? letters.indexOf(q.answer.toUpperCase())
          : -1;

        return (
          <div
            key={qIndex}
            className="bg-white p-6 rounded-2xl shadow-lg mb-6 border border-gray-100 hover:shadow-2xl transition-all"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                {qIndex + 1}. {q.question}
              </h3>
              {submitted && (
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-full ${
                    answers[qIndex] === correctIdx
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {answers[qIndex] === correctIdx ? "✔ Correct" : "✖ Wrong"}
                </span>
              )}
            </div>

            <ul className="space-y-3">
              {q.options.map((option, optIndex) => {
                const isSelected = answers[qIndex] === optIndex;
                const isCorrect = submitted && optIndex === correctIdx;
                const isWrong =
                  submitted && isSelected && optIndex !== correctIdx;

                return (
                  <li key={optIndex}>
                    <label
                      className={`flex items-center p-3 rounded-xl cursor-pointer border transition 
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
                      <span className="font-bold mr-3 text-gray-600">
                        {letters[optIndex]}.
                      </span>
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        checked={isSelected}
                        onChange={() => handleSelect(qIndex, optIndex)}
                        className="mr-3 w-5 h-5 text-blue-600 accent-blue-600"
                        disabled={submitted}
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

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
        <div className="text-center mt-10 text-2xl font-bold text-gray-800">
          🎉 You scored {score} / {serverQuestion.length}
        </div>
      )}
    </div>
  );
}
