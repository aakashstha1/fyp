import { BookOpen, LayoutDashboard } from "lucide-react";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Sidebar() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded-md transition-all duration-200 ${
      isActive
        ? "text-blue-600 font-semibold bg-blue-100 dark:bg-gray-800"
        : "text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800"
    }`;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-col justify-between w-[200px] sm:w-[250px] border-r border-gray-300 dark:border-gray-700 bg-[#f0f0f0] dark:bg-gray-900 p-5 fixed h-screen">
        <div className="space-y-2">
          <NavLink to="/dashboard" end className={navLinkClass}>
            <LayoutDashboard size={22} />
            <h1 className="text-base">Dashboard</h1>
          </NavLink>

          <NavLink to="course" className={navLinkClass}>
            <BookOpen size={22} />
            <h1 className="text-base">Courses</h1>
          </NavLink>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:p-10 ml-[200px] sm:ml-[250px] p-2 w-full bg-white dark:bg-gray-950">
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
