import React, { useState, useEffect } from "react";

export const ParentDashboard = () => {
  // Sample data for dropdowns
  const learners = ["Elizabeth Maleke", "John Doe", "Jane Smith"];
  const subjects = ["Math", "Science", "History"];
  const terms = ["Term 1", "Term 2", "Term 3"];

  // Sample data for assignments
  const assignments = [
    { name: "Assignment 1", totalMark: 100, markObtained: 85 },
    { name: "Assignment 2", totalMark: 100, markObtained: 80 },
    { name: "Assignment 3", totalMark: 100, markObtained: 80 },
  ];

  const [selectedLearner, setSelectedLearner] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [status, setStatus] = useState("");

  const calculatePercentage = (markObtained, totalMark) => {
    return ((markObtained / totalMark) * 100).toFixed(2);
  };

  const calculateAverageGrade = () => {
    const totalObtained = assignments.reduce(
      (acc, assignment) => acc + assignment.markObtained,
      0
    );
    const totalMarks = assignments.length * 100;
    return ((totalObtained / totalMarks) * 100).toFixed(2);
  };

  const calculateTotalPercentage = () => {
    const totalMarksObtained = assignments.reduce(
      (acc, assignment) => acc + assignment.markObtained,
      0
    );
    const totalMarks = assignments.length * 100;
    return ((totalMarksObtained / totalMarks) * 100).toFixed(2);
  };

  useEffect(() => {
    const totalMarksObtained = assignments.reduce(
      (acc, assignment) => acc + assignment.markObtained,
      0
    );

    if (totalMarksObtained >= 0 && totalMarksObtained < 30) {
      setStatus("Failed");
    } else if (totalMarksObtained >= 30 && totalMarksObtained < 70) {
      setStatus("Passed");
    } else if (totalMarksObtained >= 70) {
      setStatus("Passed With Distinction");
    }
  }, [assignments]);

  return (
    <div className="relative flex flex-col justify-center items-center h-[90vh] text-gray-800">
      <h1 className="text-5xl text-secondaryColor mb-16 font-bold">
        Welcome {selectedLearner || "Select a Learner"}
      </h1>

      <div className="mb-6 flex space-x-4">
        <select
          value={selectedLearner || ""}
          onChange={(e) => setSelectedLearner(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Learner</option>
          {learners.map((learner, index) => (
            <option key={index} value={learner}>
              {learner}
            </option>
          ))}
        </select>

        <select
          value={selectedSubject || ""}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Subject</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        <select
          value={selectedTerm || ""}
          onChange={(e) => setSelectedTerm(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Term</option>
          {terms.map((term, index) => (
            <option key={index} value={term}>
              {term}
            </option>
          ))}
        </select>
      </div>

      {selectedLearner && selectedSubject && selectedTerm && (
        <div className="grid grid-cols-3 gap-4 mb-8 w-3/4">
          <div className="bg-primaryColor p-4 rounded shadow text-white">
            <h3 className="text-lg font-bold">Subject Details</h3>
            <div className="flex items-center text-xl justify-between">
              <p> Learner Name:</p>
              <p> {selectedLearner}</p>
            </div>

            <div className="flex items-center text-xl justify-between">
              <p>Subject: </p>
              <p>{selectedSubject}</p>
            </div>

            <div className="flex items-center text-xl justify-between">
              <p className="text-xl">Term:</p>
              <p>{selectedTerm}</p>
            </div>
          </div>

          <div className="bg-[#A0D3E8] p-4 rounded shadow">
            <h3 className="text-lg font-bold">Average Grade</h3>
            <p className="text-2xl">{calculateAverageGrade()}%</p>
          </div>

          <div className="bg-[#4A90E2] p-4 rounded shadow text-white">
            <h3 className="text-lg font-bold">Total Percentage</h3>
            <p className="text-2xl">{calculateTotalPercentage()}%</p>
            <p className="text-2xl">Status: {status}</p>
          </div>
        </div>
      )}

      {selectedLearner && selectedSubject && selectedTerm && (
        <table className="table-auto border-collapse border border-gray-300 w-3/4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">
                Assignment Name
              </th>
              <th className="border border-gray-300 px-4 py-2">Total Mark</th>
              <th className="border border-gray-300 px-4 py-2">
                Mark Obtained
              </th>
              <th className="border border-gray-300 px-4 py-2">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {assignment.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {assignment.totalMark}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {assignment.markObtained}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {calculatePercentage(
                    assignment.markObtained,
                    assignment.totalMark
                  )}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
