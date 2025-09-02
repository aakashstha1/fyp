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
import { Menu } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { toast } from "sonner";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

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
    <div className="border-b h-16 flex items-center justify-between px-4 md:px-10">
      {/* Logo */}
      <div
        className="cursor-pointer text-lg font-bold"
        onClick={() => navigate("/")}
      >
      logo
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
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  Note
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
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar>
                  <AvatarImage src={currentUser?.imageUrl} alt="@user" />
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

                <DropdownMenuItem>
                  <Dialog>
                    <DialogTrigger asChild>
                      <span className="cursor-pointer">Logout</span>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          Are you sure you want to logout?
                        </DialogTitle>
                      </DialogHeader>
                      <DialogFooter className="flex justify-end gap-2">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={handleLogout}>
                          Logout
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                <SheetClose asChild>
                  <NavLink to="/my-docs" className={navLinkClass}>
                    Write Note
                  </NavLink>
                </SheetClose>
                {currentUser?.role === "instructor" && (
                  <SheetClose asChild>
                    <Button onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </Button>
                  </SheetClose>
                )}

                <SheetClose asChild>
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="mt-2"
                  >
                    Logout
                  </Button>
                </SheetClose>
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
