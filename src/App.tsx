import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AuthLayout } from './components/AuthLayout'; // Make sure to create this component
import  LoginForm  from './components/LoginForm';
import RegisterForm  from './components/RegisterForm';
import {ParentDashboard}   from './components/ParentDashboard';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';
import { TeachersDashboard } from './components/TeachersDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { NewTeacher } from './components/NewTeacher';
import { NewLearner } from './components/NewLearner';

export function App() {
  const { state } = useAuth(); // Access authentication state

  return (
  
    <Router>
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/" element={<AuthLayout />} /> */}
        {/* <Route path="/login" element={<><Navbar /><LoginForm /></>} /> */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/register" element={<><Navbar /><RegisterForm /></>} />
        <Route path="/footer" element={<Footer/>}/> 

        {/* Conditional Routes for Authenticated Users */}
        {state.isAuthenticated ? (
          <>
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
            <Route path="/teachers-dashboard" element={<TeachersDashboard />} />
            <Route path='/new-teacher' element={<NewTeacher />} />
            <Route path='/new-learner' element={<NewLearner />} />
           
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
};
