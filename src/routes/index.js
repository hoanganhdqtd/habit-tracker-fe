import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import AuthRequire from "./AuthRequire";
// import AccountPage from "../pages/AccountPage.js";
import UserProfilePage from "../pages/UserProfilePage";
import CalendarPage from "../pages/CalendarPage";
import HabitDetailPage from "../pages/HabitDetailPage";
import ReminderDetailPage from "../pages/ReminderDetailPage";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        {/* <Route path="account" element={<AccountPage />} /> */}
        {/* <Route path="user/:userId" element={<UserProfilePage />} /> */}

        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/account" element={<UserProfilePage />} />
        {/* <Route path="/habit" element={<HabitDetailPage />} /> */}
        <Route path="/habit/:habitId" element={<HabitDetailPage />} />
        <Route path="/reminder/:reminderId" element={<ReminderDetailPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
