import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import ModeToggle from "@/ModeToggle";

function Navbar() {
  const navLinkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-blue-600 dark:text-blue-400 font-semibold"
        : "text-gray-700 dark:text-gray-300"
    }`;

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
          <NavLink to="/my-learning" className={navLinkClasses}>
            My Learning
          </NavLink>
          <NavLink to="/my-docs" className={navLinkClasses}>
            My Docs
          </NavLink>
          <NavLink to="/courses" className={navLinkClasses}>
            Courses
          </NavLink>
          <NavLink to="/my-board" className={navLinkClasses}>
            Whiteboard
          </NavLink>
        </div>

        {/* Right - Auth Buttons and Theme Toggle */}
        <div className="flex items-center gap-2">
          <NavLink to="/login">
            <Button>Login</Button>
          </NavLink>
          <NavLink to="/signup">
            <Button variant="outline">Signup</Button>
          </NavLink>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
