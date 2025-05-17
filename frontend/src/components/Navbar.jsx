import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import ModeToggle from "@/ModeToggle";

function Navbar() {
  return (
    <div className="border-b dark:bg-gray-700">
      <div className="max-w-7xl mx-auto  flex items-center justify-between py-3">
        {/* Right  */}
        <div className="">
          <Link to={"/"}>
            <h1 className="text-3xl font-bold">Logo</h1>
          </Link>
        </div>
        {/* Left  */}
        <div className="flex items-center gap-2">
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
          <Link to={"/signup"}>
            <Button variant={"outline"}>Signup</Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
