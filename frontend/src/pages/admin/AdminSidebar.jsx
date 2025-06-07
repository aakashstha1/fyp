import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  LayoutList,
  LogOut,
  User,
} from "lucide-react";
import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
const API_URL = "http://localhost:8000/api";
function AdminSidebar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded-md transition-all duration-200 ${
      isActive
        ? "bg-blue-100 text-blue-600 font-semibold"
        : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
    }`;

  const logoutHandler = async () => {
    try {
      const res = logout();
      toast.success(res?.data?.message || "Logged out succesfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.success(error?.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <div className="flex">
      <div className="hidden lg:flex flex-col justify-between  w-[200px] sm:w-[250px] border-r border-gray-300 dark:border-gray-700 bg-[#f0f0f0] p-5 fixed h-screen">
        {/* Top Part */}
        <div>
          <Link to="/">
            <div className="flex items-center gap-2 mb-8">
              {/* <figure className="h-[40px] w-[40px] flex justify-center items-center overflow-hidden">
                <img
                  src="/2.png"
                  alt="logo.png"
                  className="h-full w-full object-cover"
                />
              </figure> */}
              <h2 className="hidden md:block font-extrabold text-2xl">
                E-Learning
              </h2>
            </div>
          </Link>

          <div className="space-y-2">
            {/* Dashboard Link */}
            <NavLink to="dashboard" className={navLinkClasses}>
              <LayoutDashboard size={22} />
              <h1 className="text-base">Dashboard</h1>
            </NavLink>
            <NavLink to="instructor-requests" className={navLinkClasses}>
              <LayoutList size={22} />
              <h1 className="text-base">Instructor Requests</h1>
            </NavLink>
            <NavLink to="courses" className={navLinkClasses}>
              <BookOpen size={22} />
              <h1 className="text-base">Courses</h1>
            </NavLink>
            <NavLink to="users" className={navLinkClasses}>
              <User size={22} />
              <h1 className="text-base">Users</h1>
            </NavLink>
            <NavLink to="Add-Quiz" className={navLinkClasses}>
              <ClipboardList size={22} />
              <h1 className="text-base">Quizes</h1>
            </NavLink>
          </div>
        </div>

        {/* Bottom Part */}
        <div className="space-y-3">
          {/* Profile Button */}
          <NavLink
            to="/profile"
            className="flex items-center gap-3 p-2 rounded-md transition-all duration-200 "
          >
            <Avatar className="cursor-pointer">
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold">{currentUser?.name}</h1>
              <p className="text-sm text-gray-500">{currentUser?.email}</p>
            </div>
          </NavLink>

          {/* Logout Button */}
          <Button
            variant="destructive"
            onClick={logoutHandler}
            className="w-full"
          >
            <LogOut size={22} />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:p-10 ml-60 p-2 w-full bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminSidebar;
