// import AdminDashboard from "./components/AdminDashboard";
// import { Boards } from "./components/Boards";
// import { Contact } from "./components/Contact";
// import {Navbar} from "./components/Navbar";
// import { Newsletter } from "./components/Newsletter";
// import { ParentDashboard } from "./components/ParentDashboard";
// import { TeachersDashboard } from "./components/TeachersDashboard";

// function App() {
//   return (
//     <div className="">
//       <Navbar />
//       <AdminDashboard />
//       <Newsletter/>
//       <Contact/> 
//       <ParentDashboard/>
//       <TeachersDashboard/>
//       {/* <Boards/> */}
//     </div>
//   );
// }

// export default App;







import React, { useState } from "react";
import Navbar2 from "./components/Navbar2";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className={`flex flex-col flex-grow transition-all ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Navbar2 toggleSidebar={toggleSidebar} />
        <main className="p-4">
          {/* Main content goes here */}
          <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
        </main>
      </div>
    </div>
  );
};

export default App;