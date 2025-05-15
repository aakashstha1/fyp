import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white/70 py-4 mt-10 border-t">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-between text-sm gap-1">
        <h1 className="font-semibold">
          Designed by :{" "}
          <span className="text-sky-500 italic font-bold">
            Aakash Shrestha
          </span>
        </h1>
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
