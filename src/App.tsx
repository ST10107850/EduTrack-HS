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
import { PieChart } from './components/Footer';

import { useState } from 'react';
import Navbar2 from './components/Navbar2';
import Sidebar from './components/Sidebar';

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

    const students = 100;
  const teachers = 20;
  const parents = 50;

  return (
    <div className="flex flex-col h-screen">
      <Navbar2 isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} /> 
        
      <div className="flex flex-1">
        <Sidebar isCollapsed={isCollapsed} />
        <div className={`flex-1 ml-${isCollapsed ? "16" : "64"} transition-all duration-300`}>
          <div className="pt-20 p-4">
            {/* <TeachersDashboard /> */}
           {/* <ParentDashboard /> */}
           <div>
      <PieChart students={students} teachers={teachers} parents={parents} />
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};
