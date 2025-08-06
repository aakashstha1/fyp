import React from "react";
import { Boxes } from "./subComponents/Boxes";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRightCircleIcon, Search } from "lucide-react";

function HeroSection() {
  return (
    <div className="h-[400px] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center">
      {/* Radial gradient mask overlay */}
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {/* Box grid background */}
      <Boxes />

      {/* Foreground content */}
      <div className="mt-10 relative z-20">
        <h1 className="text-4xl font-bold text-white ">Tailwind is Awesome</h1>
        <h2 className="text-4xl font-semibold text-white ">
          Tailwind is Awesome
        </h2>
        <p className="text-center mt-2 text-neutral-300">
          Framer Motion is the best animation library ngl
        </p>
      </div>
      <div className="mt-10 relative z-20 w-[600px] h-12 border bg-white rounded-full">
        <Input
          type="search"
          placeholder="search..."
          className="w-[510px] placeholder:text-lg h-12 focus-visible:border-none focus-visible:ring-0 border-0 pl-4"
        />
        <Button className="absolute right-2 bottom-1 rounded-full">
          Search
          <Search />
        </Button>
      </div>
      <div className="relative z-20 mt-10 ">
        <button className="flex items-center justify-center text-slate-900 text-lg font-semibold gap-2 w-30 h-10 hover:scale-110 cursor-pointer ease-in-out duration-150 bg-amber-400 rounded-lg">
          Explore <ArrowRightCircleIcon />
        </button>
      </div>
      
    </div>
  );
}

export default HeroSection;
