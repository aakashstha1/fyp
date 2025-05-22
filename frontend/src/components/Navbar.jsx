import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import ModeToggle from "@/ModeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const navLinkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-blue-600 dark:text-blue-400 font-semibold"
        : "text-gray-700 dark:text-gray-300"
    }`;

  const handleLogout = async () => {
    const res = await logout();
    toast.success(res?.data?.message || "Logged out succesfully");
    navigate("/login");
  };

  return (
    <div className="border-b dark:bg-gray-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3">
        {/* Left - Logo */}
        <div>
          <NavLink to="/">
            <h1 className="text-3xl font-bold">Logo</h1>
          </NavLink>
        </div>

        {/* Center - Navigation Links */}
        <div className="flex space-x-10">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClasses}>
            About
          </NavLink>
          {currentUser && (
            <>
              <NavLink to="/my-docs" className={navLinkClasses}>
                My Docs
              </NavLink>
              <NavLink to="/quiz" className={navLinkClasses}>
                Quiz
              </NavLink>
            </>
          )}
          <NavLink to="/courses" className={navLinkClasses}>
            Courses
          </NavLink>
          <NavLink to="/my-board" className={navLinkClasses}>
            Whiteboard
          </NavLink>
        </div>

        {/* Right - Auth Buttons and Theme Toggle */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-10 w-10 mr-2">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-30">
                <NavLink to="profile"><DropdownMenuItem>Profile</DropdownMenuItem></NavLink>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <NavLink to="/login">
                <Button>Login</Button>
              </NavLink>
              <NavLink to="/signup">
                <Button variant="outline">Signup</Button>
              </NavLink>
            </>
          )}

          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
