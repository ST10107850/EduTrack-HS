import React, { useState } from "react"; 
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer/>
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
              <a
                href="#"
                onClick={() => handleTabClick("home")}
                className={`${
                  activeTab === "home"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                Home
              </a>
            </li>
            <li className="hover:rounded-md hover:text-secondaryColor">
              <a
                href="#"
                onClick={() => handleTabClick("about")}
                className={`${
                  activeTab === "about"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                About Us
              </a>
            </li>
            {/* <li className="hover:rounded-md hover:text-secondaryColor">
              <a
                href="#"
                onClick={() => handleTabClick("gallery")}
                className={`${
                  activeTab === "gallery"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                Gallery
              </a>
            </li> */}
            <li className="hover:rounded-md hover:text-secondaryColor">
              <a
                href="#"
                onClick={() => handleTabClick("contact")}
                className={`${
                  activeTab === "contact"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                Contact Us
              </a>
            </li>
            <li className="relative group hover:rounded-md hover:text-secondaryColor">
              <a
                href="javascript:void(0)"
                onClick={() => handleTabClick("account")}
                className={`${
                  activeTab === "account"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                Account
              </a>
              <div className="absolute hidden group-hover:block bg-white text-black mt-2 p-2 rounded shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Login
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Register
                </a>
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
              <a
                href="#"
                onClick={() => handleTabClick("home")}
                className={`${
                  activeTab === "home"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                Home
              </a>
            </li>
            <li className="hover:rounded-md hover:text-secondaryColor">
              <a
                href="#"
                onClick={() => handleTabClick("about")}
                className={`${
                  activeTab === "about"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                About Us
              </a>
            </li>
            <li className="hover:rounded-md hover:text-secondaryColor">
              <a
                href="#"
                onClick={() => handleTabClick("gallery")}
                className={`${
                  activeTab === "gallery"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                Gallery
              </a>
            </li>
            <li className="hover:rounded-md hover:text-secondaryColor">
              <a
                href="#"
                onClick={() => handleTabClick("contact")}
                className={`${
                  activeTab === "contact"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                Contact Us
              </a>
            </li>
            <li className="relative group hover:rounded-md hover:text-secondaryColor">
              <a
                href="javascript:void(0)"
                onClick={() => handleTabClick("account")}
                className={`${
                  activeTab === "account"
                    ? "text-secondaryColor py-1 px-1 rounded-md"
                    : "bg-transparent"
                }`}
              >
                Account
              </a>
              <div className="absolute hidden group-hover:block bg-white text-black mt-2 p-2 rounded shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Login
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Register
                </a>
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
