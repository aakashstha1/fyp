import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  BookOpen,
  // ClipboardList,
  LayoutDashboard,
  LayoutList,
  LogOut,
  User,
} from "lucide-react";
import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaBookOpenReader } from "react-icons/fa6";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function AdminSidebar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  // const API_URL = "http://localhost:8000/api";
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
          <Link to="/admin/dashboard">
            <div
              className="flex items-center gap-2 cursor-pointer text-2xl font-bold mb-8"
              onClick={() => navigate("/")}
            >
              <FaBookOpenReader fill="#1a2539" />
              <div>
                <span className="text-[#1a2539]">Edu</span>
                <span className="text-amber-500">Pal</span>
              </div>
            </div>
          </Link>

          <div className="space-y-2">
            {/* Dashboard Link */}
            <NavLink to="dashboard" className={navLinkClasses}>
              <LayoutDashboard size={22} />
              <h1 className="text-base">Dashboard</h1>
            </NavLink>
            <NavLink to="instructor-request" className={navLinkClasses}>
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
            {/* <NavLink to="Add-Quiz" className={navLinkClasses}>
              <ClipboardList size={22} />
              <h1 className="text-base">Quizes</h1>
            </NavLink> */}
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
              <AvatarImage src={currentUser?.name} alt="@shadcn" />

              <AvatarFallback>
                {currentUser?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold">{currentUser?.name}</h1>
              <p className="text-sm text-gray-500">{currentUser?.email}</p>
            </div>
          </NavLink>

          {/* Logout confitmation */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <LogOut size={22} />
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to log out?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You will be logged out of your account and redirected to the
                  login page.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={logoutHandler}>
                  Yes, Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
