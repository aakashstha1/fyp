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
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const navLinkClasses = ({ isActive }) =>
    `text-base font-medium transition-colors ${
      isActive
        ? "pl-4 text-blue-600 dark:text-blue-400 font-semibold"
        : " pl-4 text-gray-700 dark:text-gray-300"
    }`;

  const handleLogout = async () => {
    const res = await logout();
    toast.success(res?.data?.message || "Logged out successfully");
    navigate("/login");
  };

  const MobileNavLinks = () => (
    <div className="flex flex-col items-start  justify-center space-y-4 mt-4">
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
          <NavLink to="/quiz-start" className={navLinkClasses}>
            Quiz
          </NavLink>
        </>
      )}
      <NavLink to="/courses" className={navLinkClasses}>
        Courses
      </NavLink>
      <NavLink to="/forumView" className={navLinkClasses}>
        Forum
      </NavLink>
      <NavLink to="/my-board" className={navLinkClasses}>
        Whiteboard
      </NavLink>

      <div className="border-t w-full pt-4 flex flex-col items-center gap-3">
        {currentUser ? (
          <>
            <NavLink to="/profile" className={navLinkClasses}>
              Profile
            </NavLink>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-32"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="w-full">
              <Button className="w-32">Login</Button>
            </NavLink>
            <NavLink to="/signup" className="w-full">
              <Button variant="outline" className="w-32">
                Signup
              </Button>
            </NavLink>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );

  return (
    <div className="border-b dark:bg-gray-700 w-full z-50 fixed top-0 left-0 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <NavLink to="/">
          <h1 className="text-2xl font-bold">Logo</h1>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-8 items-center">
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
              <NavLink to="/quiz-start" className={navLinkClasses}>
                Quiz
              </NavLink>
            </>
          )}
          <NavLink to="/courses" className={navLinkClasses}>
            Courses
          </NavLink>
          <NavLink to="/forumView" className={navLinkClasses}>
            Forum
          </NavLink>
          <NavLink to="/my-board" className={navLinkClasses}>
            Whiteboard
          </NavLink>
        </div>

        {/* Desktop Auth & Mode */}
        <div className="hidden lg:flex items-center gap-2">
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-10 w-10 mr-2">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <NavLink to="/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </NavLink>
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

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-3xl">
                  {" "}
                  <NavLink to="/">
                    <h1 className="text-2xl font-bold">Logo</h1>
                  </NavLink>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Mobile navigation menu
                </SheetDescription>
              </SheetHeader>
              <MobileNavLinks />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
