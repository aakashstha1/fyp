import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import ModeToggle from "@/ModeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Brush, LogOut, Pencil, User } from "lucide-react";
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

function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-500 hover:text-blue-400";

  const handleLogout = async () => {
    setIsLogoutDialogOpen(false); // close dialog after logout
    try {
      const res = await logout();
      toast.success(res?.data?.message || "Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="border-b h-15 flex items-center justify-between px-10">
        <div className="" onClick={() => navigate("/")}>
          LOGO
        </div>

        <div className="flex items-center gap-20">
          <div className="flex space-x-6">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/courses" className={navLinkClass}>
              Courses
            </NavLink>

            {/* Only show when logged in */}
            {currentUser && (
              <>
                <NavLink to="/discussion" className={navLinkClass}>
                  Discussion
                </NavLink>
                <NavLink to="/my-learning" className={navLinkClass}>
                  My Learning
                </NavLink>
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
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
              </>
            )}
          </div>

          {currentUser ? (
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-0">
                  <Avatar>
                    <AvatarImage
                      src={currentUser?.imageUrl}
                      alt="@evilrabbit"
                    />
                    <AvatarFallback>
                      {currentUser?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* Show Dashboard only if role is instructor */}
                  {currentUser?.role === "instructor" && (
                    <DropdownMenuItem>
                      <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-black text-white w-full py-2 rounded-lg cursor-pointer"
                      >
                        Dashboard
                      </button>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />
                  <NavLink to={`/profile/${currentUser._id}`}>
                    <DropdownMenuItem className="flex justify-between items-center cursor-pointer">
                      <span>Profile</span>
                      <User className="h-4 w-4 text-gray-500" />
                    </DropdownMenuItem>
                  </NavLink>

                  <DropdownMenuItem
                    className="flex justify-between items-center text-red-600 cursor-pointer"
                    onClick={() => setIsLogoutDialogOpen(true)}
                  >
                    <span>Logout</span>
                    <LogOut className="h-4 w-4" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog
                open={isLogoutDialogOpen}
                onOpenChange={setIsLogoutDialogOpen}
              >
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Are you sure you want to logout?</DialogTitle>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        onClick={() => setIsLogoutDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={handleLogout}>
                      Logout
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
    </>
  );
}

export default Navbar;
