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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        🏆 Leaderboard
      </h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 bg-gray-100 text-gray-700 font-semibold text-sm sm:text-base px-6 py-3">
          <div>#</div>
          <div>User</div>
          <div>Score</div>
          <div>Date</div>
        </div>

        {/* Entries */}
        {data.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No records yet.</div>
        ) : (
          data.map((entry, index) => (
            <div
              key={entry._id}
              className={`grid grid-cols-4 px-6 py-4 text-gray-800 text-sm sm:text-base border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div className="font-medium">{index + 1}</div>
              <div className="truncate">{entry.userId?.name || "User"}</div>
              <div className="font-bold text-blue-600">
                {entry.score} / {entry.total}
              </div>
              <div>{new Date(entry.createdAt).toLocaleDateString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
