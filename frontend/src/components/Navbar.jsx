import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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
import { Bell, Brush, Pencil, ShoppingBagIcon, Menu } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import { toast } from "sonner";

function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const shouldShowSecondary = !path.startsWith("/dashboard");

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-500 hover:text-blue-400";

  const handleLogout = async () => {
    const res = await logout();
    toast.success(res?.data?.message || "Logged out successfully");
    navigate("/");
  };

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/about" className={navLinkClass}>
        About
      </NavLink>
      <NavLink to="/contact" className={navLinkClass}>
        Contact
      </NavLink>
      <NavLink to="/courses" className={navLinkClass}>
        Courses
      </NavLink>
    </>
  );

  return (
    <>
      {/* Main Navbar */}
      <div className="border-b h-15 flex items-center justify-between px-4 md:px-10">
        <div
          className="cursor-pointer text-lg font-bold"
          onClick={() => navigate("/")}
        >
          LOGO
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex space-x-6">{navLinks}</div>

          {currentUser ? (
            <div className="flex items-center space-x-6">
              <Bell className="h-6 w-6" />
              <ShoppingBagIcon className="h-6 w-6" />

              <Avatar>
                <AvatarImage
                  src={currentUser?.imageUrl}
                  alt="@user"
                  onClick={() => navigate(`/profile/${currentUser._id}`)}
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
          <ModeToggle />
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="h-7 w-7 cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6 p-6">
              {navLinks}

              {currentUser ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={currentUser?.imageUrl}
                        alt="@user"
                        onClick={() => navigate(`/profile/${currentUser._id}`)}
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">{currentUser?.name}</p>
                  </div>
                  <Button variant="destructive" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link to="/login">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Secondary Navbar (Visible only when logged in) */}
      {currentUser && shouldShowSecondary && (
        <div className="mx-auto border-b py-3 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/discussion" className={navLinkClass}>
            Discussion
          </NavLink>

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              Note
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <NavLink to={"/my-docs"}>
                <DropdownMenuItem>
                  <Pencil /> Write Note
                </DropdownMenuItem>
              </NavLink>
              <NavLink to={"/my-board"}>
                <DropdownMenuItem>
                  <Brush />
                  Draw Note
                </DropdownMenuItem>
              </NavLink>
            </DropdownMenuContent>
          </DropdownMenu>
          <NavLink to="/my-learning" className={navLinkClass}>
            My Learning
          </NavLink>
          <Dialog>
            <DialogTrigger asChild>
              <p className="cursor-pointer hover:text-blue-400">Logout</p>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Are you sure you want to logout?</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}

export default Navbar;
