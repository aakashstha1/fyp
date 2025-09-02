import React from "react";

import Chart from "./CreatorIncomeChart";
import TopRatedCourses from "@/components/DashboardComponents/TopRated";
import TopEnrolled from "@/components/DashboardComponents/TopEnrolled";

function Dashboard() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Course Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor your platform's performance and top performers
          </p>
        </div>

        <Chart />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TopRatedCourses />
          <TopEnrolled />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
