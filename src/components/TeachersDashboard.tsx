import { useState, useEffect } from "react";
import data from "../Data/data.json";

type Grade = {
  gradeId: string,
  grade: string
}

export const TeachersDashboard = () => {
  const grade = ["Grade 8", "Grade 9", "Grade 10"];
  const subjects = ["Math", "Science", "History"];
  const terms = ["Term 1", "Term 2", "Term 3"];

  const assignments = [
    { name: "Elizabeth Maleke", totalMark: 100, markObtained: 35 },
    { name: "Noluthando Ndlovu", totalMark: 100, markObtained: 10 },
    { name: "Samuel Nsundwane", totalMark: 100, markObtained: 70 },
    { name: "Tshepo Mashamaite", totalMark: 100, markObtained: 20 },
    { name: "Tshepo Mashamaite3", totalMark: 100, markObtained: 90 },
  ];

  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  let totalNumberOfLearners = 0;

  const calculatePercentage = (markObtained: number, totalMark: number) => {
    return ((markObtained / totalMark) * 100).toFixed(2);
  };

  const calculateStatus = (percentage: number) => {
    if (percentage < 30) return "Failed";
    if (percentage < 70) return "Passed";
    return "Passed With Distinction";
  };
  const calculatePassedCount = () => {
    return assignments.filter(
      (assignment) =>
        calculateStatus(
          (assignment.markObtained / assignment.totalMark) * 100
        ) === "Passed"
    ).length;
  };

  const calculateTotalPercentage = () => {
    const totalObtained = assignments.reduce(
      (acc, assignment) => acc + assignment.markObtained,
      0
    );
    const totalMarks = assignments.length * 100;
    return ((totalObtained / totalMarks) * 100).toFixed(2);
  };

  // Helper functions for count and percentage calculation
  const calculateCountsAndPercentages = () => {
    let passed = 0,
      failed = 0,
      distinction = 0;

    assignments.forEach((assignment) => {
      const percentage = parseFloat(
        calculatePercentage(assignment.markObtained, assignment.totalMark)
      );
      const status = calculateStatus(percentage);

      if (status === "Passed") passed++;
      else if (status === "Failed") failed++;
      else if (status === "Passed With Distinction") distinction++;
    });

    totalNumberOfLearners = passed + failed + distinction;
    const total = assignments.length;
    return {
      passed,
      failed,
      distinction,
      passedPercentage: ((passed / total) * 100).toFixed(2),
      failedPercentage: ((failed / total) * 100).toFixed(2),
      distinctionPercentage: ((distinction / total) * 100).toFixed(2),
    };
  };

  const {
    passed,
    failed,
    distinction,
    passedPercentage,
    failedPercentage,
    distinctionPercentage,
  } = calculateCountsAndPercentages();

  return (
    <div className="relative flex flex-col md:my-0 my-12 justify-center items-center md:h-[90vh] text-gray-800">
      <h1 className="text-5xl mx-7 md:mx-0 text-secondaryColor mb-16 font-bold">
        Welcome {selectedGrade || "Select a Learner"}
      </h1>

      <div className="mb-6 flex sm:flex-row flex-col space-x-4">
        <select
          value={selectedGrade || ""}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Grade</option>
          {grade.map((learner, index) => (
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
        <input
          className="p-2 border rounded text-black"
          placeholder="Search a Learner"
        />
      </div>

      {selectedGrade && (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-8 w-3/4">
          <div className="bg-primaryColor p-4 rounded shadow text-white">
            <h3 className="text-lg font-bold">Subject Details</h3>
            <div className="flex items-center text-xl justify-between">
              <p>Grade:</p>
              <p>{selectedGrade}</p>
            </div>

            <div className="flex items-center text-xl justify-between">
              <p>Subject:</p>
              <p>{selectedSubject || "All Subjects"}</p>
            </div>

            <div className="flex items-center text-xl justify-between">
              <p>Term:</p>
              <p>{selectedTerm || "All Terms"}</p>
            </div>
          </div>

          <div className="bg-[#A0D3E8] p-4 rounded shadow flex flex-col justify-center">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold">Average Class Score</h3>
              <p className="text-2xl">{calculateTotalPercentage()}%</p>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Total number of Learners:</h3>
              <p className="text-2xl">{totalNumberOfLearners}</p>
            </div>
          </div>

          <div className="bg-[#4A90E2] p-6 rounded shadow text-white w-full max-w-md">
            <h3 className="text-lg font-bold mb-4 text-center">
              Learner Performance Summary
            </h3>
            <div className="flex justify-around items-center">
              <div className="text-center">
                <h4 className="text-lg font-semibold">Passed</h4>
                <p className="text-2xl font-bold">{passed}</p>
                <p className="text-sm">{passedPercentage}%</p>
              </div>

              <div className="text-center">
                <h4 className="text-lg font-semibold">Failed</h4>
                <p className="text-2xl font-bold">{failed}</p>
                <p className="text-sm">{failedPercentage}%</p>
              </div>

              <div className="text-center">
                <h4 className="text-lg font-semibold">Distinction</h4>
                <p className="text-2xl font-bold">{distinction}</p>
                <p className="text-sm">{distinctionPercentage}%</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedGrade && (
        <table className="table-auto border-collapse border border-gray-300 w-3/4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">
                Learner Names
              </th>
              <th className="border border-gray-300 px-4 py-2">Total Mark</th>
              <th className="border border-gray-300 px-4 py-2">
                Mark Obtained
              </th>
              <th className="border border-gray-300 px-4 py-2">Percentage</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => {
              const percentage = calculatePercentage(
                assignment.markObtained,
                assignment.totalMark
              );
              const status = calculateStatus(parseFloat(percentage));
              return (
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
                    {percentage}%
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
