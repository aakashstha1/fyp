import React from "react";

import Chart from "./CreatorIncomeChart";
import TopRatedCourses from "@/components/DashboardComponents/TopRated";
import TopEnrolled from "@/components/DashboardComponents/TopEnrolled";

function Dashboard() {
  return (
    <div className="min-h-screen p-6  bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold  text-gray-900 dark:text-gray-100  mb-2">
            Course Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your platform's performance and top performers
          </p>
        </div>

        <Chart />

        <div className="flex flex-col gap-6">
          <TopRatedCourses />
          <TopEnrolled />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
