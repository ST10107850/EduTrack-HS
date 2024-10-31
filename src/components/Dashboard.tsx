import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import data from "../data/data.json";
import teacher from "../Types/teachers";
import { TeachersList } from "../components/TeachersList";
import { LearnersList } from "../components/LearnersList";
import { SubjectList } from "./SubjectList";
import { TotalNumber } from "./TotalNumber";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [teachers, setTeachers] = useState<teacher[]>(data.teachers || []);
  const [showAllSubjects, setShowAllSubjects] = useState(false);

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const handleToggleShowAllSubjects = (showAll: boolean) => {
    setShowAllSubjects(showAll);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-screen-lg space-y-8 p-8">
        {/* Welcome Banner with Total Numbers */}
        <div className="w-full h-[10rem] bg-[#6c7f93] rounded-lg flex items-center justify-center">
          <TotalNumber />
        </div>

        <div className="flex w-full justify-between space-x-6">
          {/* Main Content Area */}
          <div className="flex flex-col items-center w-full space-y-6">
            <div className="w-full bg-white shadow-lg rounded-lg p-6">
              <SubjectList onToggleShowAll={handleToggleShowAllSubjects} />
              {!showAllSubjects && <TeachersList />}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="flex flex-col items-center w-[30%] space-y-6">
            <div className="bg-white w-full shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-center mb-4">
                Calendar
              </h2>
              <Calendar
                onChange={handleDateChange}
                value={date}
                className="w-full"
              />
            </div>
            <div className="bg-white shadow-lg rounded-lg w-full h-auto p-6">
              <div className="flex flex-row items-center justify-between mb-2">
                <h2 >
                  Students
                </h2>
                <a href="" className="text-blue-500">Show Mare</a>
              </div>
              <div className="flex items-center space-y-4 mb-2">
                <LearnersList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
