import React from 'react';
import Dashboard from '../../Layout/DashboardLayout';
import { MdDashboard } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';
import { PiStudentBold } from 'react-icons/pi';

interface SidebarProps {
  title: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title }) => {
  return (
    <div className="bg-pink-50  text-tertiaryColor h-screen w-64 flex flex-col">
      <div className="p-6 mb-16 text-4xl font-bold border-b">
        {title}
      </div>
      <nav className="flex text-lg font-medium flex-col mt-10">
    
        <a href="/dashboard" className="flex gap-4 p-4 hover:bg-gray-100">
        <MdDashboard />
          Dashboard
        </a>
        <a href="/teachers" className="flex gap-4 p-4 hover:bg-gray-100">
        <GiTeacher />
          Teachers
        </a>
        <a href="/learners" className="flex gap-4 p-4 hover:bg-gray-100">

        <PiStudentBold />
          Learners
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
