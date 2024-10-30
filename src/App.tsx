import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { AuthLayout } from "./Layout/AuthLayout";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { Navbar } from "./components/Navbar";
import { AdminDashboard } from "./components/AdminDashboard";
import { TeachersDashboard } from "./components/TeachersDashboard";
import { ParentDashboard } from "./components/ParentDashboard";
import MarksEntryTable from "./components/MarksEntryTable";

export function App() {
  const { state } = useAuth();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MarksEntryTable />} />
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

        {/* Protected Routes */}
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
    </Router>
  );
}

export default App;
