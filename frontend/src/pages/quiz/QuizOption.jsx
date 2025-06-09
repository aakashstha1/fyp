import React from "react";

function QuizOption({ option, name, id, onChange }) {
  return (
    <li>
      <label className="text-white cursor-pointer flex items-center space-x-2">
        <input
          type="radio"
          name={name}
          id={id}
          value={option}
          onChange={onChange}
          className="form-radio text-blue-500"
        />
        <span>{option}</span>
      </label>
    </li>
  );
}

export default QuizOption;
