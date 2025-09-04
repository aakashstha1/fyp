import React, { useState } from "react";

export default function QuizQuestion({ index, question, onAnswer, darkMode }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    onAnswer(option);
  };

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-300 ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-900"
      } shadow-lg hover:shadow-2xl`}
    >
      <h3 className="text-lg font-semibold mb-4">
        Q{index}. {question.questionText}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(opt)}
            className={`p-4 rounded-lg border text-left font-medium transition-all duration-300 shadow ${
              selected === opt
                ? "bg-blue-600 text-white border-blue-600"
                : darkMode
                ? "bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600"
                : "bg-gray-100 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
