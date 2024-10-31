import React, { useState, useEffect } from "react";
import data from "../data/data.json";
import { Learner } from "../Types/learners";

// Component name should start with an uppercase letter
export const TeachersList: React.FC = () => {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data.learners && Array.isArray(data.learners)) {
      setLearners(data.learners);
    } else {
      setError("No learners data found.");
    }
  }, []);

  return (
    <div className="p-4">
      {error && <p className="text-red-500">{error}</p>}
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
          </tr>
        </thead>
        <tbody>
          {learners.length > 0 ? (
            learners.map((learner) => (
              <tr
                key={learner.id} // Ensure learner.id exists
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="border-b border-r p-4">
                  {learner.fullName ? `${learner.fullName} ${learner.surname || ''}` : 'N/A'}
                </td>
                <td className="border-b border-r p-4">
                  {learner.idNumber || 'N/A'}
                </td>
                <td className="border-b border-r p-4">
                  {learner.emailAddress || 'N/A'}
                </td>
                <td className="border-b p-4">
                  {learner.phoneNumber || 'N/A'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center">
                No learners available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
