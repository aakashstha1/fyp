import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-300 dark:bg-gray-700 py-4 mt-auto flex bottom-0">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-1 ">
        <p className="text-gray-600 dark:text-gray-300">&copy; {new Date().getFullYear()} E-Learning Platform</p>
        <p className="font-semibold text-black/80 dark:text-white">All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
