// src/App.tsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AuthLayout } from "./Layout/AuthLayout";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { Navbar } from "./components/Navbar";
import { AdminDashboard } from "./components/AdminDashboard";
import { TeachersDashboard } from "./components/TeachersDashboard";
import { ParentDashboard } from "./components/ParentDashboard";
// import  Teachers  from "./components/Teachers";

import MarksEntryTable from "./components/MarksEntryTable";
import ParentComponent from "./components/ParentComponent";
import Profile from "./components/ProfDetails";
import Dashboard from "./components/Dashboard";
import DashboardTeacher from "./TeachersDashboards/DashboardTeacher";
import ErrorBoundary from "./components/ErrorBoundary";
import Teachers from "./components/Teachers";

function App() {
  const { state } = useAuth();

  return (
    <Router>
      {/* <ErrorBoundary> */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<AuthLayout />} />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <LoginForm />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Navbar />
                <RegisterForm />
              </>
            }
          />
          {state.isAuthenticated ? (
            <>
              <Route path="/parent-dashboard/*" element={<ParentDashboard />} />
              <Route
                path="/teachers-dashboard/*"
                element={<TeachersDashboard />}
              />
              <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      {/* </ErrorBoundary> */}
    </Router>
  );
}

export default App;
