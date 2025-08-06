import React, { useState } from "react";

const colors = [
  "#ef4444", // red-500
  "#f59e0b", // amber-500
  "#10b981", // emerald-500
  "#3b82f6", // blue-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
];

export const Boxes = () => {
  const rows = 30;  // more rows
  const cols = 30;  // more columns
  const totalBoxes = rows * cols;

  // Store hovered box index and color
  const [hovered, setHovered] = useState({ idx: null, color: null });

  // Function to get random color
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      className="absolute inset-0 grid gap-[1px] z-0"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {[...Array(totalBoxes)].map((_, idx) => {
        const isHovered = hovered.idx === idx;
        const hoverColor = isHovered ? hovered.color : null;

        return (
          <div
            key={idx}
            className="aspect-square bg-slate-800 rounded-sm transition-colors duration-300"
            style={{ backgroundColor: isHovered ? hoverColor : undefined }}
            onMouseEnter={() =>
              setHovered({ idx, color: getRandomColor() })
            }
            onMouseLeave={() => setHovered({ idx: null, color: null })}
          />
        );
      })}
    </div>
  );
};
