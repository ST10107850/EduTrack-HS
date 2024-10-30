import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { AuthLayout } from "./components/AuthLayout"; 
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { ParentDashboard } from "./components/ParentDashboard";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { TeachersDashboard } from "./components/TeachersDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { NewTeacher } from "./components/NewTeacher";
import { NewLearner } from "./components/NewLearner";

type role ={
  role:string
}
export function App() {
  const { state } = useAuth(); // Access authentication state
  const { isAuthenticated, user } = state;

  return (
    <Router>
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
        <Route path="/footer" element={<Footer />} />
        <Route path="/new-teacher" element={<NewTeacher />} />
        <Route path="/new-learner" element={<NewLearner />} />

        {/* Conditional Routes for Authenticated Users */}
        {isAuthenticated ? (
          <>
            {user?.role === "parent" && (
              <Route path="/parent-dashboard" element={<ParentDashboard />} />
            )}
            {user?.role === "teacher" && (
              <Route path="/teachers-dashboard" element={<TeachersDashboard />} />
            )}
            {user?.role === "admin" && (
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
