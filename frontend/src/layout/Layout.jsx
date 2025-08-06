import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
