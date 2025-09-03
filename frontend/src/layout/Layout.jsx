import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  // Check if current path starts with "/dashboard"
  const hideFooter = location.pathname.startsWith("/dashboard");

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <Outlet />
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default Layout;
