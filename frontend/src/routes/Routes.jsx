import Layout from "@/layout/Layout";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import MyDoc from "@/pages/Docs/MyDoc";
// import MyLearning from "@/pages/MyLearning";
import Signup from "@/pages/Signup";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DocEditor from "@/pages/Docs/DocEditor";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminSidebar from "@/pages/admin/AdminSidebar";
import InstructorReq from "@/pages/admin/InstructorReq";
import Profile from "@/pages/Profile";
import InstructorReqDetail from "@/pages/admin/InstructorReqDetail";
import UserList from "@/pages/admin/UserList";
import ApplyInstructor from "@/pages/enrollee/ApplyInstructor";
import Board from "@/pages/Whiteboard/Board";

import Cources from "@/pages/Cources";
import Chat from "@/pages/Chat";


import QuizViewer from "@/pages/quiz/QuizViewer";
import AddQuestionsLayout from "@/pages/quiz/AddQuestionsLayout";
import ForumView from "@/pages/Forum/ForumView";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="about" element={<About />} />
          <Route path="my-docs" element={<MyDoc />} />

          <Route path="quiz" element={<Quiz />} />
           <Route path="courses" element={<Cources/>} />
          


          <Route path="quiz-start" element={<QuizViewer />} />

          <Route path="editor/:docId" element={<DocEditor />} />
          <Route path="about" element={<About />} />
          <Route path="my-board" element={<Board />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chat" element={<Chat />} />
          <Route path="apply-for-instructor" element={<ApplyInstructor />} />
          <Route path="ViewQuestion" element={<QuizViewer />} />
          
          <Route path="forumView" element={<ForumView />} />

        </Route>
        //Admin routes
        <Route path="/admin" element={<AdminSidebar />}>
          <Route path="Add-Quiz" element={<AddQuestionsLayout />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="instructor-requests" element={<InstructorReq />} />
          <Route
            path="instructor-request/:reqId"
            element={<InstructorReqDetail />}
          />

          <Route path="users" element={<UserList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
