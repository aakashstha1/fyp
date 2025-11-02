import React, { useState } from "react";
import { Boxes } from "./subComponents/Boxes";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRightCircleIcon, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/courses?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-[400px] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center px-4">
      {/* Radial gradient mask overlay */}
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {/* Box grid background */}
      <Boxes />

      {/* Foreground content */}
      <div className="mt-10 relative z-20 max-w-2xl">
        <h1 className="text-2xl sm:text-4xl font-bold text-white text-center pb-2">
          EduPal – E-Learning Platform
        </h1>
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-200 text-center">
          Learn. Grow. Succeed.
        </h2>
        <p className="text-center mt-4 text-sm sm:text-base text-neutral-300 px-2">
          Discover courses that fit your goals and learn in a way that works for
          you. Flexible, accessible, and easy to follow.
        </p>
      </div>

      {/* Search bar */}
      <div className="mt-8 relative z-20 w-full max-w-xl">
        <div className="flex items-center rounded-full border bg-white shadow-md overflow-hidden">
          <Input
            type="search"
            placeholder="Search course..."
            className="flex-1 h-12 px-4 text-base sm:text-lg border-0 focus-visible:ring-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="cursor-pointer px-4" onClick={handleSearch}>
            <Search className="h-5 w-5 hover:scale-110 ease-in-out duration-150" />
          </button>
        </div>
      </div>

      {/* Explore button */}
      <div className="relative z-20 mt-8">
        <button
          className="flex items-center justify-center text-slate-900 text-sm sm:text-lg font-semibold gap-2 px-4 py-2 hover:scale-105 cursor-pointer ease-in-out duration-150 bg-amber-400 rounded-lg"
          onClick={() => navigate("/courses")}
        >
          Explore <ArrowRightCircleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
