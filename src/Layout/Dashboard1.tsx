import UserTable from "../newComponents/dashboardComponents/UserTable";
import data from "../data/data.json";
import { TeachersList } from "./TeachersList";
import { SubjectList } from "./SubjectList";
import Calendar from "react-calendar";
import { LearnersList } from "./LearnersList";
import React, { useState } from "react";
import Sidebar2 from "../newComponents/dashboardComponents/Sidebar2";
import Greeting from "../newComponents/dashboardComponents/Greeting";
import HistoricTable from "../newComponents/dashboardComponents/HistoricTable";
import StatusCards from "../newComponents/dashboardComponents/StatusCards";
import { Link } from "react-router-dom";

export const Dashboard1 = () => {
  const [date, setDate] = useState(new Date());
  const [teachers, setTeachers] = useState(data.teachers || []);
  const [showAllSubjects, setShowAllSubjects] = useState(false);
  const [showAllLearners, setShowAllLearners] = useState(false);
  const [showAllActions, setShowAllActions] = useState(false);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleToggleShowAllSubjects = (showAll) => {
    setShowAllSubjects(showAll);
  };

  const handleToggleShowAllLearners = () => {
    setShowAllLearners((prevShowAll) => !prevShowAll);
  };

  // No need to handle showAllActions state here; it will be managed in TeachersList

  return (
    <div className="flex flex-row space-x-10">
      <div className="flex flex-col items-center w-full space-y-6">
        <div className="w-full bg-white shadow-lg rounded-lg p-6">
          <SubjectList onToggleShowAll={handleToggleShowAllSubjects} />
          {!showAllSubjects && <TeachersList showAction={false} />} {/* No actions shown on dashboard */}
        </div>
      </div>

      <div className="flex flex-col items-center w-[30%] space-y-6">
        <div className="bg-white w-full shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-center mb-4">Calendar</h2>
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="w-full"
          />
        </div>
        <div className="bg-white shadow-lg rounded-lg w-full h-auto p-6">
          <div className="flex flex-row items-center justify-between mb-2">
            <h2>Students</h2>
            <Link to="/admin-dashboard/learners" className="text-blue-500">Show More</Link> 
          </div>
          <div className="flex w-full items-center space-y-4 mb-2">
            <LearnersList showAll={showAllLearners} /> 
          </div>
        </div>
      </div>
    </div>
  );
};
