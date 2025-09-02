import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default PageNotFound;
