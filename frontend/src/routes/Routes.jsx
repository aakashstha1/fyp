import Layout from "@/layout/Layout";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import MyDoc from "@/pages/Docs/MyDoc";
import MyLearning from "@/pages/MyLearning";
import Signup from "@/pages/Signup";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DocEditor from "@/pages/Docs/DocEditor";
import Container from "@/pages/Whiteboard/container";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="my-learning" element={<MyLearning />} />
          <Route path="my-docs" element={<MyDoc />} />
          <Route path="my-docs/:docId" element={<DocEditor />} />
          <Route path="about" element={<About />} />
          <Route path="my-board" element={<Container />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
