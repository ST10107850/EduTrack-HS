// TeachersList.tsx
import React, { useState, useEffect } from "react";
import data from "../data/data.json";
import { Teachers } from "../Types/teachers";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

export const TeachersList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teachers[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (data.teachers && Array.isArray(data.teachers)) {
      setTeachers(data.teachers);
    } else {
      setError("No teachers data found.");
    }
  }, []);

  const displayedTeachers = showAll ? teachers : teachers.slice(0, 5);

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const handleViewUser = (userId: number) => {
    navigate(`/view-user/${userId}`);
    
    console.log("User passed: ", userId);
  };
  

  return (
    <div className="p-4">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Teachers List</h1>
        <button
          onClick={toggleShowAll}
          className="text-blue-500 hover:text-blue-700"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-sm font-medium text-left p-4 border-b border-r">
              Full Name
            </th>
            <th className="text-sm font-medium text-left p-4 border-b border-r">
              ID Number
            </th>
            <th className="text-sm font-medium text-left p-4 border-b border-r">
              Email Address
            </th>
            <th className="text-sm font-medium text-left p-4 border-b">
              Phone Number
            </th>
            <th className="text-sm font-medium text-left p-4 border-b border-r">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedTeachers.length > 0 ? (
            displayedTeachers.map((teacher) => (
              <tr
                key={teacher.id}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="border-b border-r p-4">
                  {teacher.fullName
                    ? `${teacher.fullName} ${teacher.surname || ""}`
                    : "N/A"}
                </td>
                <td className="border-b border-r p-4">
                  {teacher.idNumber || "N/A"}
                </td>
                <td className="border-b border-r p-4">
                  {teacher.emailAddress || "N/A"}
                </td>
                <td className="border-b p-4">{teacher.phoneNumber || "N/A"}</td>
                <td className="border-b border-r pl-6 space-x-4">
                  {/* Use a button or onClick to call handleViewUser */}
                  <button
                    onClick={() => handleViewUser(teacher.id)} // Call handleViewUser on click
                    className="bg-orange-500 text-white py-2 px-5 rounded-md hover:bg-orange-700"
                  >
                    View
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-5 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    className="bg-black text-white py-2 px-5 rounded-md hover:bg-gray-800"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-4 text-center">
                No teachers available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
