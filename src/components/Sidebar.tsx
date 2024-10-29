import React from "react";
import { BsNewspaper } from "react-icons/bs";
import { FcAbout, FcContacts } from "react-icons/fc";
import { GiTeacher } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { LuContact } from "react-icons/lu";
import { PiStudent } from "react-icons/pi";
import { SiAboutdotme } from "react-icons/si";

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100%-64px)] bg-white text-[#4A4A4A] ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 ease-in-out shadow-md`}
    >
      <nav className="flex flex-col gap-4 mt-4 space-y-2">
        {/* Main Section */}
        <div>

        <div className={`mt-8 px-4 ${isCollapsed ? "hidden" : "text-gray-500 text-sm font-bold"}`}>
          MAIN
        </div>
        <a href="#" className="flex items-center py-3 px-4 hover:bg-gray-200 hover:text-secondaryColor transition-colors">
          <HiHome />
          {!isCollapsed && <span className="ml-3">Home</span>}
        </a>

        <a href="#" className="flex items-center py-3 px-4 hover:bg-gray-200 hover:text-secondaryColor transition-colors">
          <FcAbout />
          {!isCollapsed && <span className="ml-3">About Us</span>}
        </a>

    
        </div>


        {/* Tools Section */}
        <div>
        <div className={`px-4 ${isCollapsed ? "hidden" : "text-gray-500 text-sm font-bold mt-6"}`}>
          MANAGE USERS
        </div>
        <a href="#" className="flex items-center py-3 px-4 hover:bg-gray-200 hover:text-secondaryColor transition-colors">
            <GiTeacher />
          {!isCollapsed && <span className="ml-3">Teachers</span>}
        </a>
        <a href="#" className="flex items-center py-3 px-4 hover:bg-gray-200 hover:text-secondaryColor transition-colors">
          <PiStudent />
          {!isCollapsed && <span className="ml-3">Learners</span>}
        </a>
        </div>


        {/* Conversation Section */}
        <div>
        <div className={`px-4 ${isCollapsed ? "hidden" : "text-gray-500 text-sm font-bold mt-6"}`}>
          COMMUNICATION
        </div>
        <a href="#" className="flex items-center py-3 px-4 hover:bg-gray-200 hover:text-secondaryColor transition-colors">
          <BsNewspaper />
          {!isCollapsed && <span className="ml-3">Newsletter</span>}
        </a>

        <a href="#" className="flex items-center py-3 px-4 hover:bg-gray-200 hover:text-secondaryColor transition-colors">
          <LuContact />
          {!isCollapsed && <span className="ml-3">Contact Us</span>}
        </a>
        </div>


      </nav>
    </aside>
  );
};

export default Sidebar;
