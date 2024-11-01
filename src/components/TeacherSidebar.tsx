import React, { useState } from "react";
import { BsNewspaper } from "react-icons/bs";
import { FcAbout, FcContacts } from "react-icons/fc";
import { GiTeacher } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { LuContact } from "react-icons/lu";
import { PiStudent } from "react-icons/pi";
import { SiAboutdotme } from "react-icons/si";
import { Link } from "react-router-dom";

interface SidebarProps {
  isCollapsed: boolean;
  onSelectUserType: (userType: string) => void;
}

const TeacherSidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onSelectUserType,
}) => {
  const [activeItem, setActiveItem] = useState<string>("");

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
    onSelectUserType(itemName);
  };

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100%-64px)] bg-white text-[#4A4A4A] ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 ease-in-out shadow-md`}
    >
      <nav className="flex flex-col gap-4 mt-4 space-y-2">
        <div>
          <div
            className={`mt-8 px-4 ${
              isCollapsed ? "hidden" : "text-gray-500 text-sm font-bold"
            }`}
          >
            MAIN
          </div>
          <Link
            to="/teachers-dashboard"
            onClick={() => handleItemClick("home")}
            className={`flex items-center py-3 px-4 hover:bg-gray-200 transition-colors ${
              activeItem === "home" ? "bg-gray-300 text-secondaryColor" : ""
            }`}
          >
            <HiHome />
            {!isCollapsed && <span className="ml-3">Home</span>}
          </Link>
          <Link
            to="/teachers-dashboard/about"
            onClick={() => handleItemClick("about")}
            className={`flex items-center py-3 px-4 hover:bg-gray-200 transition-colors ${
              activeItem === "about" ? "bg-gray-300 text-secondaryColor" : ""
            }`}
          >
            <FcAbout />
            {!isCollapsed && <span className="ml-3">About Us</span>}
          </Link>
        </div>

        <div>
          <div
            className={`px-4 ${
              isCollapsed ? "hidden" : "text-gray-500 text-sm font-bold mt-6"
            }`}
          >
            MANAGE USERS
          </div>
          <Link
            to="/teachers-dashboard/teacher"
            className={`flex items-center py-3 px-4 hover:bg-gray-200 transition-colors ${
              activeItem === "teachers" ? "bg-gray-300 text-secondaryColor" : ""
            }`}
          >
            <GiTeacher />
            {!isCollapsed && <span className="ml-3">Learners</span>}
          </Link>
        </div>

        <div>
          <div
            className={`px-4 ${
              isCollapsed ? "hidden" : "text-gray-500 text-sm font-bold mt-6"
            }`}
          >
            COMMUNICATION
          </div>
          <a
            href="#"
            onClick={() => handleItemClick("newsletter")}
            className={`flex items-center py-3 px-4 hover:bg-gray-200 transition-colors ${
              activeItem === "newsletter"
                ? "bg-gray-300 text-secondaryColor"
                : ""
            }`}
          >
            <BsNewspaper />
            {!isCollapsed && <span className="ml-3">Newsletter</span>}
          </a>
          <a
            href="#"
            onClick={() => handleItemClick("contact")}
            className={`flex items-center py-3 px-4 hover:bg-gray-200 transition-colors ${
              activeItem === "contact" ? "bg-gray-300 text-secondaryColor" : ""
            }`}
          >
            <LuContact />
            {!isCollapsed && <span className="ml-3">Contact Us</span>}
          </a>
        </div>
      </nav>
    </aside>
  );
};

export default TeacherSidebar;
