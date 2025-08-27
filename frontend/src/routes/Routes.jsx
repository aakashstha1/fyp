import Layout from "@/layout/Layout";
import About from "@/pages/About";
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

import Cources from "@/Courses";
import Chat from "@/pages/Chat";

import QuizViewer from "@/pages/quiz/QuizViewer";
import AddQuestionsLayout from "@/pages/quiz/AddQuestionsLayout";
import ForumView from "@/pages/discussionForum/ForumView";
import Leaderboard from "@/pages/quiz/LeaderBoard";
import Home from "@/pages/home/Home";
import Sidebar from "@/pages/instructor/dashboard/Sidebar";
import Dashboard from "@/pages/instructor/dashboard/Dashboard";
import CourseTable from "@/pages/instructor/course/CourseTable";
import AddCourse from "@/pages/instructor/course/AddCourse";
import EditCourse from "@/pages/instructor/course/EditCourse";

import EditLecture from "@/pages/instructor/lecture/EditLecture";
import CreateLecture from "@/pages/instructor/lecture/CreateLecture";

import StudyContainer from "@/pages/studyCourse/container";


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
          <Route path="courses" element={<Cources />} />
          <Route path="quiz-start" element={<QuizViewer />} />
          <Route path="editor/:docId" element={<DocEditor />} />
          <Route path="about" element={<About />} />
          <Route path="my-board" element={<Board />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="chat" element={<Chat />} />
          <Route path="apply-for-instructor" element={<ApplyInstructor />} />
          <Route path="ViewQuestion" element={<QuizViewer />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="discussion" element={<ForumView />} />
          <Route path="study" element={<StudyContainer />} />
          <Route path="dashboard" element={<Sidebar />}>
            <Route index element={<Dashboard />} />
            <Route path="course" element={<CourseTable />} />
            <Route path="course/create" element={<AddCourse />} />
            <Route path="course/edit/:courseId" element={<EditCourse />} />

            <Route
              path="course/edit/:courseId/lecture"
              element={<CreateLecture />}
            />
            <Route
              path="course/edit/:courseId/lecture/:lectureId"
              element={<EditLecture />}
            />
          </Route>
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
