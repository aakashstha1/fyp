import React from "react";
import TopContributors from "../../components/DashboardComponents/TopContributers";
import TopRatedCourses from "../../components/DashboardComponents/TopRated";
import TopEnrolledCourses from "../../components/DashboardComponents/TopEnrolled";
import AdminChart from "../../components/DashboardComponents/AdminChart";

function AdminDashboard() {
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

        <AdminChart />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TopRatedCourses />
          <TopEnrolledCourses />
        </div>

        <TopContributors />
      </div>
    </div>
  );
}

export default AdminDashboard;
