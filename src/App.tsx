// src/App.tsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import {AuthLayout} from "./Layout/AuthLayout";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { Navbar } from "./components/Navbar";
import { AdminDashboard } from "./components/AdminDashboard";
import { TeachersDashboard } from "./components/TeachersDashboard";
import { ParentDashboard } from "./components/ParentDashboard";
import { Teachers } from "./components/Teachers";
import MarksEntryTable from "./components/MarksEntryTable";
import ParentComponent from "./components/ParentComponent";
import Profile from "./Pages/ProfDetails";
import Navbar2 from "./components/Navbar2";
import Sidebar from "./components/Sidebar";

function App() {
  const { state } = useAuth();

  return (
    <div className="font-serif bg-gradient-to-r  to-cyan-600 from-cyan-200">
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthLayout />} />
        <Route path="/login" element={<><Navbar /><LoginForm /></>} />
        <Route path="/register" element={<><Navbar /><RegisterForm /></>} />
        <Route path="/mark-entry" element={<MarksEntryTable />} />
        <Route path="/profDetails" element={<><Navbar2/><Sidebar/><Profile /></>} />
        {/* <Route path="/teacher" element={<Teachers />} />
        <Route path="/admin" element={<AdminDashboard />} /> */}
        {/* Protected Routes */}
        {state.isAuthenticated ? (
          <>
            <Route path="/parent-dashboard/*" element={<ParentDashboard />} />
            <Route path="/teachers-dashboard/*" element={<TeachersDashboard />} />
            <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
    </div>
  );
}


export default App;

