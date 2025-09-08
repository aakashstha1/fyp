import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ roles, children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();



  if (!currentUser) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    // Role not allowed → redirect based on role
    if (currentUser.role === "admin")
      return <Navigate to="/admin/dashboard" replace />;
    if (currentUser.role === "instructor")
      return <Navigate to="/dashboard" replace />;
    return <Navigate to="/" replace />; // default for enrollee
  }

  // Strict route prefix check
  if (currentUser.role === "admin" && !location.pathname.startsWith("/admin")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // User is allowed
  return children;
};

export const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();

  

  if (currentUser) {
    if (currentUser.role === "admin")
      return <Navigate to="/admin/dashboard" replace />;
  }
  if (currentUser) {
    // User is already logged in, redirect to home or dashboard
    return <Navigate to="/" replace />;
  }
  return children;
};
