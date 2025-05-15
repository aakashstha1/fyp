import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PenLine, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { AuthContext } from "@/context/authContext";
import { toast } from "sonner";
import ModeToggle from "@/ModeToggle";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser, logout } = useContext(AuthContext);
  const user = currentUser?.user;

  const handleLogout = async () => {
    const res = await logout();
    toast.success(res.data.message || "Logout succesfully.");
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    // Clear input when route changes to /search
    if (!location.pathname.startsWith("/search")) {
      setSearchQuery("");
    }
  }, [location]);

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center h-full px-5">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src="/logo.png" alt="Logo" className=" w-35 h-10 pl-3" />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-10">
          <nav className="flex items-center gap-6 text-lg">
            {/* Search Bar */}
            <div className=" flex items-center w-96 border border-gray-300 rounded-md">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-none focus-visible:ring-0 selection:bg-gray-300 selection:text-black"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <Search
                className="w-5 h-5 mx-2 cursor-pointer"
                onClick={handleSearch}
              />
            </div>

            {/* Dropdown */}
            <Select onValueChange={(value) => navigate(`/?cat=${value}`)}>
              <SelectTrigger className="w-[200px] focus-visible:ring-0">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                <SelectGroup>
                  <SelectLabel>Blog Categories</SelectLabel>
                  <SelectItem value="technology">
                    Information Technology
                  </SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="food">Food & Cooking</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <Button asChild>
                  <Link to="/write">
                    Write <PenLine />
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <Avatar className="cursor-pointer w-10 h-10 ">
                      <AvatarImage
                        src={`/upload/${user?.img}`}
                        alt="@shadcn"
                        className="object-cover"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/profile">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <Link to="/posts/my-posts">
                      <DropdownMenuItem>My posts</DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
