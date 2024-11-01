import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar2 from "./Navbar2";
import Sidebar from "./Sidebar";
import { ManageUsers } from "./ManageUsers";
import { ApiProvider } from "../hooks/ApiContext";
import { NewTeacher } from "./NewTeacher";
import { NewLearner } from "./NewLearner";
import About from "./About";
import Staff from "./Staff";
import { Newsletter } from "./Newsletter";
import { Contact } from "./Contact";
import Dashboard from "./Dashboard";

export const AdminDashboard: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userType, setUserType] = useState<string>("teachers");

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar2 toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
      <div className="flex h-full">
        <Sidebar
          isCollapsed={isCollapsed}
          onSelectUserType={setUserType}
          IsAdmin={true}
        />
        <main
          className={`transition-all duration-300 p-4 ${
            isCollapsed ? "ml-16" : "ml-64"
          } w-full`}
        >
          <Routes>
            <Route path="admin-dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/manage-users"
              element={<ManageUsers userType={userType} />}
            />
            <Route
              path="new-teachers" // Use relative paths here
              element={
                <ApiProvider api="/api/teachers">
                  <NewTeacher />
                </ApiProvider>
              }
            />
            <Route
              path="new-learners" // Use relative paths here
              element={
                <ApiProvider api="/api/learners">
                  <NewLearner />
                </ApiProvider>
              }
            />

            <Route
              path="about"
              element={
                <>
                  <About />
                  <Staff />
                </>
              }
            />
            <Route path="newsletter" element={<Newsletter />} />
            <Route path="contact" element={<Contact />} />
            {/* Redirect to Manage Users if no routes match */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
