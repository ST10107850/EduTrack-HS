import React from "react";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar2: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="flex items-center justify-between bg-gray-900 text-white p-4 shadow-md">
      {/* Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className="text-white focus:outline-none">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Search Bar */}
      <div className="flex-grow max-w-lg mx-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
        />
      </div>

      {/* Notification and Profile Icons */}
      <div className="flex items-center space-x-4">
        <button className="focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-4.215a2 2 0 00-1.789-1.285H6.195a2 2 0 00-1.789 1.285L3 17h5m5-12a5 5 0 110 10 5 5 0 010-10z"
            />
          </svg>
        </button>
        <button className="focus:outline-none">
          <img
            src="https://via.placeholder.com/30"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar2;
