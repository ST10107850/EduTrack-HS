import React from 'react';
import Dashboard from '../../Layout/DashboardLayout';
import { MdDashboard } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';
import { PiStudentBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';

interface SidebarProps {
  title: string;
}

const Sidebar2: React.FC<SidebarProps> = ({ title }) => {
  return (
    <div className="bg-pink-50  text-tertiaryColor h-screen w-64 flex flex-col">
      <div className="p-6 mb-16 text-4xl font-bold border-b">
        {title}
      </div>
      <nav className="flex text-lg font-medium flex-col mt-10">
    
        <Link to="/admin-dashboard" className="flex gap-4 p-4 hover:bg-gray-100">
        <MdDashboard />
          Dashboard
        </Link>
        <Link to="/admin-dashboard/teachers" className="flex gap-4 p-4 hover:bg-gray-100">
        <GiTeacher />
          Teachers
        </Link>
        <Link to="/admin-dashboard/learners" className="flex gap-4 p-4 hover:bg-gray-100">

        <PiStudentBold />
          Learners
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar2;
