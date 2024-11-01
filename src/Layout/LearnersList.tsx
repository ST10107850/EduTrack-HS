import React, { useState, useEffect } from "react";
import data from "../data/data.json";
import { Learner } from "../Types/learners";

interface LearnersListProps {
  showAll?: boolean;
}

export const LearnersList: React.FC<LearnersListProps> = ({ showAll = false }) => {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [gradesMap, setGradesMap] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data.learners && Array.isArray(data.learners)) {
      const validLearners = data.learners.filter((learner) => learner.gradeId !== undefined);
      setLearners(validLearners);
    } else {
      setError("No learners data found.");
    }

    const map: { [key: string]: string } = {};
    if (data.grades && Array.isArray(data.grades)) {
      data.grades.forEach((grade) => {
        map[grade.gradeId] = grade.grade;
      });
    }
    setGradesMap(map);
  }, []);

  return (
    <div className="p-4">
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-sm font-medium text-left p-4 border-b border-r">Full Name</th>
            {showAll && <th className="text-sm font-medium text-left p-4 border-b border-r">ID Number</th>}
            <th className="text-sm font-medium text-left p-4 border-b border-r">Email Address</th>
            {showAll && <th className="text-sm font-medium text-left p-4 border-b border-r">Phone Number</th>}
            <th className="text-sm font-medium text-left p-4 border-b border-r">Grade</th>
            <th className="text-sm font-medium text-left p-4 border-b border-r">Action</th>
          </tr>
        </thead>
        <tbody>
          {learners.length > 0 ? (
            learners.slice(0, 5).map((learner) => (
              <tr key={learner.id} className="hover:bg-gray-100 transition duration-200">
                <td className="border-b border-r p-4">{`${learner.fullName} ${learner.surname || ""}`}</td>
                {showAll && <td className="border-b border-r p-4">{learner.idNumber}</td>}
                <td className="border-b border-r p-4">{learner.emailAddress}</td>
                {showAll && <td className="border-b border-r p-4">{learner.phoneNumber}</td>}
                <td className="border-b border-r p-4">
                  {learner.gradeId && gradesMap[learner.gradeId] ? gradesMap[learner.gradeId] : "N/A"}
                </td>
                <td className="border-b border-r pl-6 space-x-4">
                  <a href="" className="bg-orange-500 text-white py-2 px-5 rounded-md hover:bg-orange-700">View</a>
                  <a href="" className="bg-red-500 text-white py-2 px-5 rounded-md hover:bg-orange-700">Delete</a>
                  <a href="" className="bg-black text-white py-2 px-5 rounded-md hover:bg-orange-700">Edit</a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={showAll ? 5 : 3} className="p-4 text-center">
                No learners available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
