import React, { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdNotificationsNone } from "react-icons/md"; // Import notification icon
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export const Navbar = ({ isAuthenticated }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isProfileMenuOpened, setIsProfileMenuOpened] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleMenuBar = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpened(!isProfileMenuOpened);
  };

  return (
    <div className="bg-primaryColor fixed shadow-xl top-0 right-0 left-0 z-50 transition-colors px-10">
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
          </ul>

          {/* Notifications and Profile Icons */}
          <div className="flex items-center space-x-4 text-white">
            {isAuthenticated ? (
              <>
                <MdNotificationsNone size={25} className="cursor-pointer" />
                <div className="relative">
                  <BiUserCircle
                    size={29}
                    onClick={toggleProfileMenu}
                    className="cursor-pointer"
                  />
                  {isProfileMenuOpened && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 text-black">
                      <div className="px-4 py-2 font-bold">
                        Boitshepo Mashamaite
                      </div>
                      <hr className="my-1" />
                      <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                        Switch account
                      </a>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                        Sign out
                      </a>
                      <hr className="my-1" />
                      <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                        Settings
                      </a>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="relative">
                <p
                  onClick={toggleProfileMenu}
                  className={`text-xl cursor-pointer ${
                    activeTab === "account"
                      ? "text-secondaryColor"
                      : "bg-transparent"
                  }`}
                >
                  Account
                </p>
                {isProfileMenuOpened && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 text-black text-xl">
                    <Link to="/login" className="block px-4 py-2 hover:bg-gray-200">
                      Login
                    </Link>

                    <hr className="my-1" />
                    <Link to="/register" className="block px-4 py-2 hover:bg-gray-200">
                      Register
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

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
          </ul>
        )}
      </div>
    </div>
  );
};