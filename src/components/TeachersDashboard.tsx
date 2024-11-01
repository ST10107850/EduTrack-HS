import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar2 from "./Navbar2";
import Sidebar from "./Sidebar";
import About from "./About";
import Staff from "./Staff";
import { Newsletter } from "./Newsletter";
import { Contact } from "./Contact";
import {Teachers}  from "./Teachers";
import Navbar3 from "../newComponents/Navbar3";
import Sidebar2 from "./Sidebar2"

export const TeachersDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar3  />
      <div className="flex h-full">
        <Sidebar2 isCollapsed={isCollapsed} IsAdmin={false}/>
        <main className={`transition-all duration-300 p-4 ${isCollapsed ? 'ml-16' : 'ml-64'} w-full`}>
          <Routes>
            {/* Default Route */}
            <Route path="/" element={<Teachers />} />
            {/* Nested Routes */}
            <Route path="about" element={<About />} />
            <Route path="staff" element={<Staff />} />
            <Route path="newsletter" element={<Newsletter />} />
            <Route path="contact" element={<Contact />} />
            {/* Redirect to Default if No Match */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
