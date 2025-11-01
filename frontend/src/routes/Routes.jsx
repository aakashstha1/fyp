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
import UserList from "@/pages/admin/userData/UserList";
import ApplyInstructor from "@/pages/enrollee/ApplyInstructor";
import Board from "@/pages/Whiteboard/Board";

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

// import StudyContainer from "@/pages/lectures/lecturesSection";
import SingleCourse from "@/pages/courses/SingleCourse";
import MyLearning from "@/pages/courses/MyLearning";
import Courses from "@/pages/courses/Courses";
import CourseList from "@/pages/admin/courseData/CourseList";
import Assignment from "@/pages/assignment/assignment";
import PageNotFound from "@/components/PageNotFound";
import { ProtectedRoute, PublicRoute } from "@/components/ProtectedRoute";
import Courseprogress from "@/pages/lectures/CourseProgress";
import CreatorCourses from "@/pages/admin/CreatorCourses";
import ScrollToTop from "@/ScrollToTop";

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route path="about" element={<About />} />
          <Route path="my-docs" element={<MyDoc />} />
          <Route
            path="my-learning"
            element={
              <ProtectedRoute roles={["instructor", "enrollee"]}>
                <MyLearning />
              </ProtectedRoute>
            }
          />
          <Route path="courses" element={<Courses />} />
          {/* <Route path="quiz-start" element={<QuizViewer />} /> */}
          <Route
            path="editor/:docId"
            element={
              <ProtectedRoute roles={["instructor", "enrollee"]}>
                <DocEditor />
              </ProtectedRoute>
            }
          />
          <Route path="about" element={<About />} />
          <Route path="my-board" element={<Board />} />
          <Route
            path="profile/:userId"
            element={
              <ProtectedRoute roles={["instructor", "enrollee"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="chat" element={<Chat />} />
          <Route
            path="apply-for-instructor"
            element={
              <ProtectedRoute roles={["enrollee"]}>
                <ApplyInstructor />
              </ProtectedRoute>
            }
          />
          {/* <Route path="ViewQuestion" element={<QuizViewer />} /> */}
          {/* <Route path="leaderboard" element={<Leaderboard />} /> */}
          <Route
            path="discussion"
            element={
              <ProtectedRoute roles={["instructor", "enrollee"]}>
                <ForumView />
              </ProtectedRoute>
            }
          />
          <Route path="course/:courseId" element={<SingleCourse />} />
          <Route path="/assign" element={<Assignment />} />
          <Route
            path="/course/:courseId/progress"
            element={
              <ProtectedRoute roles={["instructor", "enrollee"]}>
                <Courseprogress />
              </ProtectedRoute>
            }
          />
          //Instructor Dashboard
          <Route
            path="dashboard"
            element={
              <ProtectedRoute roles={["instructor"]}>
                <Sidebar />
              </ProtectedRoute>
            }
          >
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
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminSidebar />
            </ProtectedRoute>
          }
        >
          <Route path="Add-Quiz" element={<AddQuestionsLayout />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="instructor-request" element={<InstructorReq />} />
          <Route path="users/:creatorId" element={<CreatorCourses />} />

          <Route
            path="instructor-request/:reqId"
            element={<InstructorReqDetail />}
          />

          <Route path="users" element={<UserList />} />
          <Route path="courses" element={<CourseList />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
