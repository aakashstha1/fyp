import React from "react";

function QuizOption({ option, name, id }) {
  return (
    <li>
      <input type="radio" id={id} name={name} value={option} className="mr-2" />
      <label htmlFor={id} className="text-white">
        {option}
      </label>
    </li>
  );
}

export default QuizOption;
