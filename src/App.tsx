import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AuthLayout } from './components/AuthLayout'; // Make sure to create this component
import  LoginForm  from './components/LoginForm';
import RegisterForm  from './components/RegisterForm';
import { ParentDashboard } from './components/ParentDashboard';
import { TeachersDashboard } from './components/TeachersDashboard';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';
// import { PieChart } from './components/Footer';

import { useState } from 'react';
import Navbar2 from './components/Navbar2';
import Sidebar from './components/Sidebar';
import { ManageUsers } from './components/ManageUsers';

// function App() {
//   const { state } = useAuth(); // Access authentication state

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<AuthLayout />} />
//         <Route path="/login" element={<><Navbar /><LoginForm /></>} />
//         <Route path="/register" element={<><Navbar /><RegisterForm /></>} />
//         <Route path="/footer" element={<Footer/>}/> 

//         {/* Conditional Routes for Authenticated Users */}
//         {state.isAuthenticated ? (
//           <>
//             <Route path="/parent-dashboard" element={<ParentDashboard />} />
//             <Route path="/teachers-dashboard" element={<TeachersDashboard />} />
           
//           </>
//         ) : (
//           <Route path="*" element={<Navigate to="/" />} />
//         )}
//       </Routes>
//     </Router>
//   );
// };

// export default App;



export const App: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar2 toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
      <div className="flex h-full">
        <Sidebar isCollapsed={isCollapsed} />
        <main 
          className={`transition-all duration-300 p-4 ${
            isCollapsed ? 'ml-16' : 'ml-64' // Adjust based on sidebar width
          } w-full`}
        >
          {/* <ParentDashboard /> */}
          <ManageUsers />
        </main>
      </div>
    </div>
  );
};
