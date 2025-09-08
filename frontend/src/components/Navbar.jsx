import React from "react";
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
import { ChevronDown, LogOut, Menu } from "lucide-react";

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { toast } from "sonner";
import { FaBookOpenReader } from "react-icons/fa6";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  // const [open, setOpen] = useState(false);
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-500 hover:text-blue-400";

  const handleLogout = async () => {
    const res = await logout();
    toast.success(res?.data?.message || "Logged out successfully");
    // setOpen(false);
    window.location.href = "/login";
  };

  return (
    <div className="border-b h-16 flex items-center justify-between px-4 md:px-10">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer text-2xl font-bold"
        onClick={() => navigate("/")}
      >
        <FaBookOpenReader fill="#1a2539" />
        <div>
          <span className="text-[#1a2539]">Edu</span>
          <span className="text-amber-500">Pal</span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-10">
        <div className="flex items-center space-x-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/courses" className={navLinkClass}>
            Courses
          </NavLink>

          {currentUser && (
            <>
              <NavLink to="/discussion" className={navLinkClass}>
                Discussion
              </NavLink>
              <NavLink to="/my-learning" className={navLinkClass}>
                My Learning
              </NavLink>

              <NavLink to="/quiz-start" className={navLinkClass}>
                Play Quiz
              </NavLink>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 focus:outline-none cursor-pointer">
                  <span>Note</span>
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <NavLink to="/my-docs">
                    <DropdownMenuItem>Write Note</DropdownMenuItem>
                  </NavLink>
                  <NavLink to="/my-board">
                    <DropdownMenuItem>Draw Note</DropdownMenuItem>
                  </NavLink>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {currentUser ? (
          <div className="flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
                <Avatar>
                  <AvatarImage
                    src={currentUser?.imageUrl}
                    alt="@user"
                    className="object-cover"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {currentUser?.role === "instructor" && (
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <Button>Dashboard</Button>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  onClick={() => navigate(`/profile/${currentUser._id}`)}
                >
                  Profile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Logout with AlertDialog */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <LogOut className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to logout?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <ModeToggle />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
            <ModeToggle />
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-2">
        {!currentUser && (
          <Link to="/login">
            <Button variant="outline" className="w-full">
              Login
            </Button>
          </Link>
        )}
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="h-7 w-7 cursor-pointer" />
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-4 p-6">
            {/* Always visible */}
            <SheetClose asChild>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </SheetClose>
            <SheetClose asChild>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </SheetClose>
            <SheetClose asChild>
              <NavLink to="/courses" className={navLinkClass}>
                Courses
              </NavLink>
            </SheetClose>
            {/* Logged-in only */}
            {currentUser && (
              <>
                <SheetClose asChild>
                  <NavLink to="/my-learning" className={navLinkClass}>
                    My Learning
                  </NavLink>
                </SheetClose>

                <SheetClose asChild>
                  <NavLink to="/discussion" className={navLinkClass}>
                    Discussion
                  </NavLink>
                </SheetClose>
                {/* <SheetClose asChild>
                  <NavLink to="/my-docs" className={navLinkClass}>
                    Write Note
                  </NavLink>
                </SheetClose> */}
                {currentUser?.role === "instructor" && (
                  <SheetClose asChild>
                    <Button onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </Button>
                  </SheetClose>
                )}

                {/* Logout with confirmation */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="mt-2 w-full">
                      Logout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to logout?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}

            {/* Not logged-in */}
            {!currentUser && (
              <>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Navbar;
