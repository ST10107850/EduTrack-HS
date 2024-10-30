import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { AuthLayout } from "./Layout/AuthLayout"; // Make sure to create this component
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { ParentDashboard } from "./components/ParentDashboard";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { TeachersDashboard } from "./components/TeachersDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const { state } = useAuth(); // Access authentication state

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AdminDashboard />} />
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

        {/* Conditional Routes for Authenticated Users */}
        {state.isAuthenticated ? (
          <>
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
            <Route path="/teachers-dashboard" element={<TeachersDashboard />} />
            <Route path="/admin" element={<AdminDashboard/>}/>
          </>
        ) : (
          <Route path="*" element={<Navigate to="/admin" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
