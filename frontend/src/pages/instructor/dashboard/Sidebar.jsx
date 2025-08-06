import { BookOpen, LayoutDashboard } from "lucide-react";
import React from "react";

import { NavLink, Outlet } from "react-router-dom";

function Sidebar() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded-md transition-all duration-200 ${
      isActive
        ? "text-blue-600 font-semibold"
        : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
    }`;

  return (
    <div className="flex">
      <div className="hidden lg:flex flex-col justify-between  w-[200px] sm:w-[250px] border-r border-gray-300 dark:border-gray-700 bg-[#f0f0f0] p-5 fixed h-screen">
        {/* Top Part */}
        <div>
          <div className="space-y-2">
            {/* Dashboard Link */}
            <NavLink to="/dashboard" end className={navLinkClass}>
              <LayoutDashboard size={22} />
              <h1 className="text-base">Dashboard</h1>
            </NavLink>

            {/* Courses Link */}
            <NavLink to="course" className={navLinkClass}>
              <BookOpen size={22} />
              <h1 className="text-base">Courses</h1>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:p-10 ml-60 p-2 w-full bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
