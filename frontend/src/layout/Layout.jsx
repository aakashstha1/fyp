import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const isFullScreenPage =
    location.pathname.startsWith("/editor") ||
    location.pathname.startsWith("/my-board");

  return (
    <div className="min-h-screen flex flex-col">
      {!isFullScreenPage && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isFullScreenPage && <Footer />}
    </div>
  );
}

export default Layout;
