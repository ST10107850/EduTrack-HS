import React from 'react';
import { MdDashboard } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';
import { PiStudentBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';

interface SidebarProps {
  title: string;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ title = "EduTrack", isCollapsed, toggleSidebar }) => {
  return (
    <div className={`bg-pink-50 text-tertiaryColor h-screen ${isCollapsed ? 'w-16' : 'w-64'} transition-width duration-300 flex flex-col`}>
      <div className="p-6 mb-16 text-4xl font-bold border-b">
        {!isCollapsed && title}
      </div>
      <button onClick={toggleSidebar} className="text-center bg-gray-300 p-2 rounded-md mt-2">{isCollapsed ? 'Expand' : 'Collapse'}</button>
      <nav className="flex text-lg font-medium flex-col mt-10">
        <Link to="/teachers-dashboard" className="flex gap-4 p-4 hover:bg-gray-100">
          <MdDashboard />
          {!isCollapsed && 'Dashboard'}
        </Link>
        <Link to="/teachers-dashboard/teachers" className="flex gap-4 p-4 hover:bg-gray-100">
          <GiTeacher />
          {!isCollapsed && 'Teachers'}
        </Link>
        <Link to="/teachers-dashboard/learners" className="flex gap-4 p-4 hover:bg-gray-100">
          <PiStudentBold />
          {!isCollapsed && 'Learners'}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
