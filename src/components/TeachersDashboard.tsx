import React, { useState } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import Navbar2 from "./Navbar2";
import Sidebar from "./Sidebar";
import About from "./About";
import Staff from "./Staff";
import { Newsletter } from "./Newsletter";
import { Contact } from "./Contact";
import { Teachers } from "./Teachers";
import Profile from "./ProfDetails";
import { AuthProvider } from "../context/AuthContext";
import DashboardTeacher from "../TeachersDashboards/DashboardTeacher";
import TeacherSidebar from "./TeacherSidebar";

export const TeachersDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar2 toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
      <div className="flex h-full">
        <TeacherSidebar isCollapsed={isCollapsed} IsAdmin={false} />
        <main
          className={`transition-all duration-300 p-4 ${
            isCollapsed ? "ml-16" : "ml-64"
          } w-full`}
        >
          <AuthProvider>
            <Routes>
              <Route path="/" element={<DashboardTeacher />} />
              {/* Route with teacherId as dynamic parameter */}
              <Route path="teacher/:teacherId" element={<Teachers />} />
              <Route path="about" element={<About />} />
              <Route path="staff" element={<Staff />} />
              <Route path="newsletter" element={<Newsletter />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AuthProvider>
        </main>
      </div>
    </div>
  );
};
