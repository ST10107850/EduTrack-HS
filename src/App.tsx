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
import Sidebar from "./components/Sidebar";
import Navbar2 from "./components/Navbar2";
import { ParentDashboard } from "./components/ParentDashboard";


const App: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar2 isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />   
      <div className="flex flex-1">
        <Sidebar isCollapsed={isCollapsed} />
        <div className={`flex-1 ml-${isCollapsed ? "16" : "64"} transition-all duration-300`}>
          <div className="pt-20 p-4">
          
           <ParentDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
