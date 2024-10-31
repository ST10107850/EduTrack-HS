import React from 'react';

export const LearnersList = ({ learners }) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Learners List</h1>
      </div>
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-sm font-medium text-left p-4 border-b border-r">Full Name</th>
            <th className="text-sm font-medium text-left p-4 border-b border-r">ID Number</th>
            <th className="text-sm font-medium text-left p-4 border-b border-r">Email Address</th>
            <th className="text-sm font-medium text-left p-4 border-b">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {learners && learners.length > 0 ? (
            learners.map((learner) => (
              <tr key={learner.id} className="hover:bg-gray-100 transition duration-200">
                <td className="border-b border-r p-4">{learner.fullName}</td>
                <td className="border-b border-r p-4">{learner.idNumber}</td>
                <td className="border-b border-r p-4">{learner.emailAddress}</td>
                <td className="border-b p-4">{learner.phoneNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center">No learners available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
