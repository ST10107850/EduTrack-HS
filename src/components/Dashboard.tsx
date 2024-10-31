import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import data from "../data/data.json";
import teacher from "../Types/teachers";
import { TeachersList } from "../components/TeachersList";
import { LearnersList } from "../components/LearnersList";
import { SubjectList } from "./SubjectList";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [teachers, setTeachers] = useState<teacher[]>(data.teachers || []);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <div className="flex flex-col items-center mt-10 w-full overflow-hidden">
      <div className="flex w-full justify-between ml-40">
        {/* Main Content Area */}
        <div className="flex flex-col items-center w-[55%] mr-[2rem] space-y-11">
          <div className="h-[10rem] w-full bg-[#6c7f93] mb-6 flex items-center justify-center">
            <h1 className="text-xl font-semibold text-white">Hello Admin</h1>
          </div>
          <div className="w-full bg-white shadow-lg rounded-lg p-4 h-auto">
            <SubjectList/>
            <div className="flex items-center justify-between mt-10">
              <h2 className="text-xl font-semibold mb-4">Teachers</h2>
              <h2 className="text-xl font-semibold mb-4">See all</h2>
            </div>
            <TeachersList/>
          </div>
        </div>
        {/* Calendar Section on the Right */}
        <div className="flex flex-col items-center w-[25%] ml-[2rem]">
          <div className="bg-white w-full shadow-lg rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">Calendar</h2>
            <Calendar
              onChange={handleDateChange}
              value={date}
              className="w-full"
            />
          </div>
          <div className="bg-white shadow-lg rounded-lg w-full h-[35rem] p-4">
            <div className="flex">
              <h2 className="text-xl font-semibold mb-4">Students</h2>
              <h2 className="text-xl font-semibold mb-4 ml-[10rem]">See All</h2>
            </div>
            <div className="flex space-x-4 mb-4">
              <LearnersList/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
