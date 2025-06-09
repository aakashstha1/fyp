import React from "react";
import QuizOption from "./QuizOption";

function QuizQuestion({ question, index }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h4 className="text-white font-semibold">
        {index + 1}. {question.questionText}
      </h4>
      <ul className="mt-2 space-y-1">
        {question.options.map((opt, i) => (
          <QuizOption
            key={i}
            option={opt}
            name={`question_${index}`}
            id={`q${index}_opt${i}`}
          />
        ))}
      </ul>
    </div>
  );
}

export default QuizQuestion;
