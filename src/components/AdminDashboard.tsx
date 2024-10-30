// AdminDashboard.tsx

import { useState } from "react";
import Navbar2 from "./Navbar2";
import Sidebar from "./Sidebar";
import { ManageUsers } from "./ManageUsers";

export const AdminDashboard: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userType, setUserType] = useState<string>("teachers");

    const handleUserTypeSelect = (type: string) => {
    setUserType(type);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar2 toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
      <div className="flex h-full">
        <Sidebar isCollapsed={isCollapsed} onSelectUserType={setUserType} />
        <main className={`transition-all duration-300 p-4 ${isCollapsed ? 'ml-16' : 'ml-64'} w-full`}>
          
          <ManageUsers userType={userType} />
        </main>
      </div>
    </div>
  );
};
