import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import React, { useEffect, useState } from "react";

function TopContributors() {
  const API_URL = "http://localhost:8000/api";
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchContributors = async () => {
      const res = await axios.get(`${API_URL}/admin/top-contributors`, {
        withCredentials: true,
      });
      //   console.log(res?.data?.contributors);
      setContributors(res?.data?.contributors);
    };
    fetchContributors();
  }, []);

  const getRankColor = (index) => {
    switch (index) {
      case 0:
        return "bg-yellow-400 text-white"; // Gold
      case 1:
        return "bg-gray-300 text-black"; // Silver
      case 2:
        return "bg-yellow-700 text-white"; // Bronze
      default:
        return "bg-green-100 text-green-600"; // Default
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Top Course Contributors
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Rank
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Profile
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Instructor
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Courses Created
              </th>

              {/* <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Total Earnings
              </th> */}
            </tr>
          </thead>
          <tbody>
            {contributors.map((contributor, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${getRankColor(
                      index
                    )}`}
                  >
                    {index + 1}
                  </div>
                </td>
                <td className="py-3 px-4 font-medium text-gray-800">
                  <Avatar>
                    <AvatarImage
                      src={contributor?.imageUrl || ""}
                      alt={contributor?.name}
                    />
                    <AvatarFallback>
                      {contributor?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </td>
                <td className="py-3 px-4 font-medium text-gray-800">
                  {contributor?.name}
                </td>

                <td className="py-3 px-4 text-gray-600">
                  {contributor?.coursesCreated}
                </td>
                {/* <td className="py-3 px-4 font-medium text-green-600">
                  ${contributor.totalEarnings.toLocaleString()}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default TopContributors;
