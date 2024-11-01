import React, { useState } from "react";
import Sidebar2 from "../newComponents/dashboardComponents/Sidebar2";
import { FaChevronDown } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import data from "../data/data.json";
import { Route, Routes } from "react-router-dom";
import { Dashboard1 } from "./Dashboard1";
import { AuthLayout } from "./AuthLayout";
import { AuthProvider } from "../context/AuthContext";
import { TeachersList } from "./TeachersList";
import { LearnersList } from "./LearnersList";
import { ViewResults } from "../components/ViewResults";

const DashboardLayout: React.FC = () => {
  const totalLearners = data.learners ? data.learners.length : 0;
  const totalTeachers = data.teachers ? data.teachers.length : 0;
  const totalParents = data.parents ? data.parents.length : 0;

  

  return (
    <div className="flex">
      <Sidebar2 title="EduTrackHS" />

      <main className="flex-1 py-10 text-tertiaryColor bg-beigeLight p-8">
        {/* <Greeting /> */}

        {/* Container for aligning button to the right */}
        <div className="flex justify-end mb-32">
          <button className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition">
            <BiUser />
            <span className="font-medium">Tshepo</span>
            <FaChevronDown />
          </button>
        </div>

        {/* Main dashboard content */}
        <div className="w-full font-medium flex justify-between">
          <div className="flex-col">
            <p className="mb-2">Your dashboard</p>
            <h1 className="text-7xl">HI, Tshepo</h1>
          </div>

          <p className="w-[40%]">
            Welcome to your dashboard! Here you can manage the users on the
            platform by adding new users, editing or deleting the records.
          </p>
        </div>

        <div className=" grid md:grid-cols-3 text-tertiaryColor grid-cols-1 gap-4 mt-8 mb-8 w-3/4">
          <div className=" p-4  rounded shadow">
            <h3 className="text-lg font-light">Total Number Of Learners</h3>
            <p className="text-2xl">{totalLearners}</p>
          </div>
          <div className=" p-4 rounded shadow">
            <h3 className="text-lg font-light">Total Number Of Teachers</h3>
            <p className="text-2xl">{totalTeachers}</p>
          </div>
          <div className="bg-transparent p-4 rounded shadow ">
            <h3 className="text-lg font-light">Total Number Of Parents</h3>
            <p className="text-2xl">{totalParents}</p>
          </div>
        </div>
        <AuthProvider>
          <Routes>
            <Route path="admin-dashboard" element={<Dashboard1 />} />
            <Route path="/" element={<Dashboard1 />} />
            <Route path="teachers" element={<TeachersList/>}/>
            <Route path="Learners" element={<LearnersList showAll={true}/>}/>
            <Route path="view-user/:id" element={<ViewResults/>}/>
          </Routes>
        </AuthProvider>
        {/**/}
      </main>
    </div>
  );
};

export default DashboardLayout;
