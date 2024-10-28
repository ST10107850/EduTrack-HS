import React, { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export const Navbar = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const toggleMenuBar = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <div className="bg-primaryColor shadow-xl top-0 right-0 left-0 z-50 transition-colors px-10">
      <ToastContainer />
      <div className="w-full py-4">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-white">
            <span className="inline">Edu</span>
            <span className="inline text-secondaryColor">Track</span>
            <span className="inline">HS</span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex text-white space-x-4 items-center text-xl">
            <li className={`hover:rounded-md hover:text-secondaryColor`}>
              <Link
                to="/"
                onClick={() => handleTabClick("home")}
                className={`${
                  activeTab === "home"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                Home
              </Link>
            </li>
            <li className="hover:rounded-md hover:text-secondaryColor">
              <Link
                to="/about" // Assuming you have an About route
                onClick={() => handleTabClick("about")}
                className={`${
                  activeTab === "about"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                About Us
              </Link>
            </li>
            <li className="hover:rounded-md hover:text-secondaryColor">
              <Link
                to="/contact" // Assuming you have a Contact route
                onClick={() => handleTabClick("contact")}
                className={`${
                  activeTab === "contact"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                Contact Us
              </Link>
            </li>
            <li className="relative group hover:rounded-md hover:text-secondaryColor">
              <span
                onClick={() => handleTabClick("account")}
                className={`${
                  activeTab === "account"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                Account
              </span>
              {/* Dropdown for Login and Register */}
              <div className="absolute hidden group-hover:block bg-white text-black mt-2 p-2 rounded shadow-lg">
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-200">
                  Login
                </Link>
                <Link to="/register" className="block px-4 py-2 hover:bg-gray-200">
                  Register
                </Link>
              </div>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenuBar}
            className="menu-trigger md:hidden flex items-center text-white text-3xl"
          >
            <HiOutlineMenuAlt3 />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpened && (
          <ul className="flex flex-col bg-primaryColor text-white p-4 space-y-4 items-start md:hidden mt-4">
            <li className="hover:rounded-md hover:text-secondaryColor">
              <Link
                to="/"
                onClick={() => handleTabClick("home")}
                className={`${
                  activeTab === "home"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                Home
              </Link>
            </li>
            <li className="hover:rounded-md hover:text-secondaryColor">
              <Link
                to="/about"
                onClick={() => handleTabClick("about")}
                className={`${
                  activeTab === "about"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                About Us
              </Link>
            </li>
            <li className="hover:rounded-md hover:text-secondaryColor">
              <Link
                to="/contact"
                onClick={() => handleTabClick("contact")}
                className={`${
                  activeTab === "contact"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                Contact Us
              </Link>
            </li>
            <li className="relative group hover:rounded-md hover:text-secondaryColor">
              <span
                onClick={() => handleTabClick("account")}
                className={`${
                  activeTab === "account"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                Account
              </span>
              {/* Dropdown for Login and Register */}
              <div className="absolute hidden group-hover:block bg-white text-black mt-2 p-2 rounded shadow-lg">
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-200">
                  Login
                </Link>
                <Link to="/register" className="block px-4 py-2 hover:bg-gray-200">
                  Register
                </Link>
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
