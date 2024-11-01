// import React from "react";

// interface NavbarProps {
//   isCollapsed: boolean;
//   toggleSidebar: () => void;
// }

// const Navbar2: React.FC<NavbarProps> = ({ isCollapsed, toggleSidebar }) => {
//   return (
//     <nav className="flex items-center justify-between bg-white px-4 py-3 shadow-md fixed top-0 w-full z-10">
//       {/* Hamburger Menu and Website Name */}
//       <div className="flex items-center space-x-3">
//         <button onClick={toggleSidebar} className="focus:outline-none">
//           <svg
//             className="w-6 h-6 text-gray-600"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//           </svg>
//         </button>
//         <div className="text-2xl font-bold text-primaryColor">
//             <span className="inline">Edu</span>
//             <span className="inline text-secondaryColor">Track</span>
//             <span className="inline">HS</span>
//           </div>
//       </div>

//       {/* Search Bar */}
//       <div className="flex items-center bg-gray-100 rounded-md p-2 w-1/2 max-w-md">
//         <input
//           type="text"
//           placeholder="Search here..."
//           className="w-full bg-transparent focus:outline-none px-2 text-gray-700"
//         />
//         <svg
//           className="w-5 h-5 text-gray-400"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M3 10a7 7 0 1014 0 7 7 0 00-14 0z" />
//         </svg>
//       </div>

//       {/* Notification and Profile */}
//       <div className="flex items-center space-x-4">
//         <button className="focus:outline-none">
//           <svg
//             className="w-6 h-6 text-gray-600"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-4.215a2 2 0 00-1.789-1.285H6.195a2 2 0 00-1.789 1.285L3 17h5m5-12a5 5 0 110 10 5 5 0 010-10z" />
//           </svg>
//         </button>
//         <img src="https://via.placeholder.com/30" alt="Profile" className="w-8 h-8 rounded-full" />
//       </div>
//     </nav>
//   );
// };

// export default Navbar2;


import React, { useState, useEffect } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NavbarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Navbar2: React.FC<NavbarProps> = ({ isCollapsed, toggleSidebar }) => {
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Fetch data from the JSON file in the public directory
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Loaded user data:", data); // Log the fetched data
        setUserData(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);


  const toggleNotifications = () => {
    setNotificationsOpen(!isNotificationsOpen);
    if (isProfileOpen) setProfileOpen(false); // Close profile if notifications open
  };

  const toggleProfile = () => {
    setProfileOpen(!isProfileOpen);
    if (isNotificationsOpen) setNotificationsOpen(false); // Close notifications if profile open
  };

  return (
    <nav className="flex items-center justify-between bg-white px-4 py-3 shadow-md fixed top-0 w-full z-10">
      {/* <ToastContainer/> */}
      {/* Logo and Hamburger Menu */}
      <div className="flex items-center space-x-3 pr-4 border-r border-gray-300">
        <button onClick={toggleSidebar} className="focus:outline-none">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <div className="text-2xl font-bold text-primaryColor">
          <span className="inline">Edu</span>
          <span className="inline text-secondaryColor">Track</span>
          <span className="inline">HS</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-full p-2 w-1/3 max-w-md mx-4 border-r border-gray-300">
        <input
          type="text"
          placeholder="Search here..."
          className="w-full bg-transparent focus:outline-none px-2 text-gray-700"
        />
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M3 10a7 7 0 1014 0 7 7 0 00-14 0z" />
        </svg>
      </div>

      {/* Notification and Profile */}
      <div className="flex items-center border-l-2 mx-3 space-x-4">
        {/* Notification Button */}
        <button onClick={toggleNotifications} className="relative">
          <IoNotificationsSharp size={25} className="text-gray-600" />
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
              <div className="p-4">
                <h4 className="font-semibold">Notifications</h4>
                <ul>
                  <li className="py-1">Notification 1</li>
                  <li className="py-1">Notification 2</li>
                  <li className="py-1">Notification 3</li>
                </ul>
              </div>
            </div>
          )}
        </button>
        {/* Profile Button */}
        <div className="relative" onClick={toggleProfile}>
          <div className="flex items-center space-x-1">
            <img
              src="https://via.placeholder.com/30"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">
                {userData ? `${userData.fullName} ${userData.surname}` : "Guest User"}
              </span>

              <span className="text-xs text-gray-500 block">Free Plan</span>
            </div>
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
              <div className="p-4">
                <h4 className="font-semibold">Profile</h4>
                <a href="/profDetails" className="py-1">Profile Details</a>
                <button className="text-red-500 hover:underline">Sign Out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
