// import About from "@/components/About";
import FAQ from "@/components/FAQ";
import HeroSection from "@/components/HeroSection";
import LatestCourses from "@/components/LatestCourses";
import RecommendedCourse from "@/components/RecommendedCourse";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

function Home() {
  const auth = useAuth();
  const user = auth.currentUser;
  return (
    <>
      <HeroSection />
      <LatestCourses />
      {user && <RecommendedCourse />}
      {/* <About /> */}
      <FAQ />
    </>
  );
}

export default Home;
