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
    <div className="h-[400px] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center">
      {/* Radial gradient mask overlay */}
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {/* Box grid background */}
      <Boxes />

      {/* Foreground content */}
      <div className="mt-10 relative z-20">
        <h1 className="text-4xl font-bold text-white text-center pb-2">
          E-learning Platform
        </h1>
        <h2 className="text-2xl font-semibold text-gray-200 text-center">
          Learn. Grow. Succeed.
        </h2>
        <p className="text-center mt-4 text-neutral-300">
          Explore expert-led courses in technology, business, design, and more.
          Learn anytime, anywhere, at your own pace.
        </p>
      </div>
      <div className="mt-10 relative z-20 w-[600px] h-12 border bg-white rounded-full">
        <Input
          type="search"
          placeholder="search..."
          className="w-[510px] placeholder:text-lg h-12 focus-visible:border-none focus-visible:ring-0 border-0 pl-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button
          className="absolute right-2 bottom-1 rounded-full"
          onClick={handleSearch}
        >
          Search
          <Search />
        </Button>
      </div>
      <div className="relative z-20 mt-10 ">
        <button
          className="flex items-center justify-center text-slate-900 text-lg font-semibold gap-2 w-30 h-10 hover:scale-110 cursor-pointer ease-in-out duration-150 bg-amber-400 rounded-lg"
          onClick={() => navigate("/courses")}
        >
          Explore <ArrowRightCircleIcon />
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
