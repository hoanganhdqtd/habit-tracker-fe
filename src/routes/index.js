import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import AuthRequire from "./AuthRequire";
import UserProfilePage from "../pages/UserProfilePage";
import CalendarPage from "../pages/CalendarPage";
import HabitDetailPage from "../pages/HabitDetailPage";
import ReminderDetailPage from "../pages/ReminderDetailPage";
import OverviewPage from "../pages/OverviewPage";
import StatisticsPage from "../pages/StatisticsPage";
import GoogleLoginPage from "../pages/GoogleLoginPage";

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
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/account" element={<UserProfilePage />} />
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
        <Route path="/google-login" element={<GoogleLoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
