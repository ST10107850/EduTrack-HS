import React, { useState, useRef } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { BiUser } from "react-icons/bi"; 
import { FaChevronDown } from "react-icons/fa"; 
import { GrNotification } from "react-icons/gr"; 
import Sidebar from "../components/Sidebar"; 
import Teachers from "./Teachers"; 

const data = { schoolNews: [] }; // Replace this with actual news data or props

export const TeachersDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({ name: "John Doe" });
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleSignOut = () => {
    console.log("User signed out"); 
  };

  return (
    <div className="flex flex-col md:flex-row md:min-h-screen">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      <main className="flex-1 py-10 text-tertiaryColor bg-beigeLight p-4 md:p-8">
        <div className="flex justify-between items-center mb-4 space-x-4">
          {/* Notification button */}
          <div ref={notificationsRef} className="relative">
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              <GrNotification />
              <FaChevronDown />
            </button>

            {/* Notification popup */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
                <h3 className="font-medium mb-2">Notifications</h3>
                <ul className="space-y-2">
                  {data.schoolNews.map((newsItem, index) => (
                    <li key={index} className="flex items-start p-2 bg-gray-50 rounded-lg">
                      <div className="mr-3">
                        <img src={newsItem.image} alt="" className="w-10 h-10 rounded-full" />
                      </div>
                      <div className="flex-1 text-orange-400">
                        <p className="text-sm font-semibold">{newsItem.title}</p>
                        <p className="text-xs">
                          {newsItem.description.length > 100
                            ? `${newsItem.description.substring(0, 100)}... `
                            : newsItem.description}
                          {newsItem.description.length > 100 && (
                            <span className="text-black cursor-pointer">Read more</span>
                          )}
                        </p>
                        <p className="text-xs text-black mt-1">1 Day Ago</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Profile button */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setShowProfile((prev) => !prev)}
              className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              <BiUser />
              <span className="font-medium">{loggedInUser.name}</span>
              <FaChevronDown />
            </button>

            {/* Profile popup */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
                <p className="font-medium">{loggedInUser.name}</p>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-red-600 hover:underline mt-2"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>


        <div className="flex h-full">
          <main className={`transition-all duration-300 p-4 ${isCollapsed ? "ml-16 p-1" : "ml-0"} md:ml-64 w-full`}>
            <Routes>
              <Route path="/" element={<Teachers />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </main>
    </div>
  );
};

export default TeachersDashboard;
