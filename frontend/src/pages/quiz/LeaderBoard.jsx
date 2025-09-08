import React, { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/quize/leaderboard"
        );
        setData(res.data.leaderboard || []);
      } catch (err) {
        setError("Failed to fetch leaderboard.");
        console.error(err);
      }
    };
    fetchLeaderboard();
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold py-8">{error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
          🏆 Leaderboard
        </h1>

        <div className="space-y-4">
          {data.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-10 text-lg">
              No records yet.
            </div>
          ) : (
            data.map((entry, index) => {
              const isTop = index === 0;
              const isSecond = index === 1;
              const isThird = index === 2;
              const bgColor = index % 2 === 0 ? "bg-white" : "bg-gray-50";

              return (
                <div
                  key={entry._id}
                  className={`flex justify-between items-center p-5 rounded-2xl shadow-md transition-transform hover:scale-[1.02] ${bgColor}`}
                >
                  {/* Rank */}
                  <div className="text-xl sm:text-2xl font-bold w-12 text-center flex-shrink-0">
                    {index + 1}
                  </div>

                  {/* User Name */}
                  <div className="flex-1 text-lg sm:text-xl font-medium truncate mx-4 text-gray-800 dark:text-gray-200">
                    {entry.userId?.name || "User"}
                  </div>

                  {/* Score */}
                  <div
                    className={`font-bold text-lg sm:text-xl flex-shrink-0 w-28 text-right ${
                      isTop
                        ? "text-yellow-500"
                        : isSecond
                        ? "text-gray-400"
                        : isThird
                        ? "text-yellow-700"
                        : "text-blue-600"
                    }`}
                  >
                    {entry.score} / {entry.total}
                  </div>

                  {/* Date */}
                  <div className="text-gray-500 dark:text-gray-400 text-sm sm:text-base flex-shrink-0 w-32 text-right">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
