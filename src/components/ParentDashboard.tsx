import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar2 from "./Navbar2";
import Sidebar from "./Sidebar";
import About from "./About";
import Staff from "./Staff";
import { Newsletter } from "./Newsletter";
import { Contact } from "./Contact";
import ParentConponent from "./ParentConponent";

export const ParentDashboard = () => {
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
          IsAdmin={false}
        />
        <main
          className={`transition-all duration-300 p-4 ${
            isCollapsed ? "ml-16" : "ml-64"
          } w-full`}
        >
          <Routes>
            <Route path="parent-dashboard" element={<ParentConponent />} />
            <Route path="/" element={<ParentConponent />} />
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
