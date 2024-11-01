import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar2 from "../newComponents/dashboardComponents/Sidebar2";
import Greeting from "../newComponents/dashboardComponents/Greeting";
import UserTable from "../newComponents/dashboardComponents/UserTable";
import { FaChevronDown } from "react-icons/fa";
import { GrNotification } from "react-icons/gr";
import { BiUser } from "react-icons/bi";
import data from "../data/data.json"; // Load notifications data
import { FaEllipsis } from "react-icons/fa6";
import { AuthProvider } from "../context/AuthContext"; // Assuming AuthProvider is in context directory
import { Routes, Route } from "react-router-dom";
// import TeachersList from "./TeachersList"; // Import the required components
// import LearnersList from "./LearnersList";
import { Dashboard1 } from "./Dashboard1";
import { LearnersList } from "./LearnersList";
import { TeachersList } from "./TeachersList";

const DashboardLayout: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const loggedInUser = { name: "Tshepo" }; // Replace with dynamic user data as needed

  const handleSignOut = () => {
    // Implement your sign out logic here
    navigate('/login');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationsRef.current && !notificationsRef.current.contains(event.target as Node) &&
      profileRef.current && !profileRef.current.contains(event.target as Node)
    ) {
      setShowNotifications(false);
      setShowProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalLearners = data.learners ? data.learners.length : 0;
  const totalTeachers = data.teachers ? data.teachers.length : 0;
  const totalParents = data.parents ? data.parents.length : 0;

  return (
    <div className="flex">
      <Sidebar2 title="EduTrackHS" />

      <main className="flex-1 py-10 text-tertiaryColor bg-beigeLight p-8">
        <div className="flex justify-end mb-4 space-x-4">
          {/* Notification button */}
          <div ref={notificationsRef} className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
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
              onClick={() => setShowProfile(!showProfile)}
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

        <Greeting />

        <div className="grid md:grid-cols-3 text-tertiaryColor grid-cols-1 gap-4 mt-8 mb-8 w-3/4">
          <div className="p-4 rounded shadow">
            <h3 className="text-lg font-light">Total Number Of Learners</h3>
            <p className="text-2xl">{totalLearners}</p>
          </div>
          <div className="p-4 rounded shadow">
            <h3 className="text-lg font-light">Total Number Of Teachers</h3>
            <p className="text-2xl">{totalTeachers}</p>
          </div>
          <div className="bg-transparent p-4 rounded shadow">
            <h3 className="text-lg font-light">Total Number Of Parents</h3>
            <p className="text-2xl">{totalParents}</p>
          </div>
        </div>

        <AuthProvider>
          <Routes>
            <Route path="admin-dashboard" element={<Dashboard1 />} />
            <Route path="/" element={<Dashboard1 />} />
            <Route path="teachers" element={<TeachersList />} />
            <Route path="learners" element={<LearnersList />} />
          </Routes>
        </AuthProvider>

        <UserTable />
      </main>
    </div>
  );
};

export default DashboardLayout;
