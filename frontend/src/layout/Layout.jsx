import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const isEditorPage = location.pathname.startsWith("/editor");

  return (
    <div className="min-h-screen flex flex-col">
      {!isEditorPage && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isEditorPage && <Footer />}
    </div>
  );
}

export default Layout;
