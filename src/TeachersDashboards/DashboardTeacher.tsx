import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SubjectsLists } from "./SubjectsLists";
import data from "../data/data.json"; // Import the JSON data
import { useLocation } from "react-router-dom";

const DashboardTeacher = () => {
  const location = useLocation();
  const {
    fullName,
    surname,
    teacherId,
  } = location.state || {
    fullName: "Teacher",
    surname: "",
    teacherId: null,
    gradeId: [],
  };

  const formattedNames = `${fullName} ${surname}`;
  const [date, setDate] = useState(new Date());

  
  const currentTeacher = data.teachers.find(
    (teacher) => teacher.id === teacherId
  );


  const teacherGrades = currentTeacher
    ? data.grades
        .filter((grade) =>
          currentTeacher.subjects.some((subject) =>
            subject.gradeIds.includes(grade.gradeId)
          )
        )
        .reduce((acc, grade) => {
          acc[grade.gradeId] = {
            name: grade.grade,
            learnerCount: grade.learnerCount 
          };
          return acc;
        }, {}) 
    : [];

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-screen-lg space-y-8 p-8">
        <div className="w-full h-[10rem] bg-[#6c7f93] rounded-lg flex flex-col items-center justify-center text-white p-4">
          <h2 className="text-2xl mb-2">Welcome, {formattedNames}</h2>
        </div>

        <div className="flex flex-col md:flex-row w-full justify-between space-x-6 space-y-6">
          
          <div className="flex flex-col items-center w-full space-y-6">
            <div className="w-full bg-white shadow-lg rounded-lg p-4">
              <SubjectsLists teacher={currentTeacher} grades={teacherGrades} />
            </div>
            
          </div>

          
          <div className="flex flex-col items-center w-full md:w-[30%] space-y-6">
            <div className="bg-white w-full shadow-lg rounded-lg p-4 justify-center flex flex-col">
              <h2 className="text-xl font-semibold text-center mb-4">Calendar</h2>
              <Calendar onChange={handleDateChange} value={date} className="w-full" />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTeacher;
