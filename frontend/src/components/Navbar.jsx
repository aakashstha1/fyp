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
import { Bell, Brush, Pencil, ShoppingBagIcon } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "sonner";

// import { Menu } from "lucide-react";
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
// } from "@/components/ui/sheet";

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
  return (
    <>
      {/* Main Navbar */}
      <div className="border-b h-15 flex items-center justify-between px-10">
        <div className="">LOGO</div>
        <div className="flex items-center gap-20">
          <div className="flex space-x-6">
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
          </div>

          {currentUser ? (
            <div className="flex items-center space-x-6">
              <Bell className="h-6 w-6" />
              <ShoppingBagIcon className="h-6 w-6" />

              <Avatar>
                <AvatarImage src="" alt="@evilrabbit" />
                <AvatarFallback>ER</AvatarFallback>
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
      </div>

      {/* Secondary Navbar (Visible only when logged in) */}
      {currentUser && shouldShowSecondary && (
        <div className="mx-auto border-b py-5 flex items-center justify-center gap-6 text-sm text-gray-600">
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/discussion" className={navLinkClass}>
            Discussion
          </NavLink>
          <NavLink to={`/profile/${currentUser._id}`} className={navLinkClass}>
            Profile
          </NavLink>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              Note
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Pencil /> Write Note
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Brush />
                Draw Note
              </DropdownMenuItem>
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
                <DialogTitle>Are you sure you wan to logout?</DialogTitle>
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
