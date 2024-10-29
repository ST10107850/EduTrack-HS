import React from "react";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 bg-gray-800 text-white transform transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 flex justify-between items-center">
        {!isCollapsed && <h2 className="text-2xl font-semibold">Menu</h2>}
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="p-4">
        <a
          href="#"
          className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${isCollapsed ? "justify-center" : ""}`}
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-9 9v-5a2 2 0 012-2h4a2 2 0 012 2v5m-5 3v-5" />
          </svg>
          {!isCollapsed && <span>Home</span>}
        </a>
        <div className="mt-4">
          <h3 className={`px-4 py-2 text-lg font-semibold ${isCollapsed ? "hidden" : ""}`}>Manage User</h3>
          <a
            href="#"
            className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${isCollapsed ? "justify-center" : ""}`}
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0H7m5 0h5" />
            </svg>
            {!isCollapsed && <span>Teachers</span>}
          </a>
          <a
            href="#"
            className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 ${isCollapsed ? "justify-center" : ""}`}
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6H3a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-1" />
            </svg>
            {!isCollapsed && <span>Learners</span>}
          </a>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
