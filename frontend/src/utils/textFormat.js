// utils/formatText.js
export const formatText = (str) => {
  if (!str) return "N/A";
  return str
    .split("-") // replace "-" with space
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize
    .join(" ");
};
