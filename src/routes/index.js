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
import OverviewPage from "../pages/OverviewPage";
import StatisticsPage from "../pages/StatisticsPage";

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
        <Route
          path="/habit/:habitId/reminder/:reminderId"
          element={<ReminderDetailPage />}
        />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/statistics/:habitId" element={<StatisticsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
