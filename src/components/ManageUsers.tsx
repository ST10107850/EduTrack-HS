import { useState, useEffect } from "react";

export const ManageUsers = () => {
  
  const learners = [
    {name: "Elizabeth Maleke", contacts: 27123456789, email: 'eli@gmail.com'},
    {name: "Boi Tshepo", contacts: 27123456789, email: 'eli@gmail.com'},
    {name: "Uncle Sam", contacts: 27123456789, email: 'eli@gmail.com'},
    {name: "Nolu Thando", contacts: 27123456789, email: 'eli@gmail.com'}
  ];
//   const subjects = ["Math", "Science", "History"];
//   const terms = ["Term 1", "Term 2", "Term 3"];

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
    <div className="relative flex flex-col md:my-0 my-12 justify-center items-center md:h-[90vh] text-gray-800">
      <h1 className="text-5xl mx-7 md:mx-0 text-secondaryColor mb-16 font-bold">
        Welcome Admin
      </h1>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-8 w-3/4">
        <div className="bg-primaryColor p-4 text-white rounded shadow">
          <h3 className="text-lg font-bold">Total Number Of Active Users</h3>
          <p className="text-2xl">100</p>
        </div>

        <div className="bg-[#A0D3E8] p-4 rounded shadow">
          <h3 className="text-lg font-bold">Total Number Of Teachers</h3>
          <p className="text-2xl">20</p>
        </div>

        <div className="bg-[#4A90E2] p-4 rounded shadow text-white">
          <h3 className="text-lg font-bold">Total Number Of Parents</h3>
          <p className="text-2xl">80</p>
        </div>
      </div>

      <div className="flex w-3/4 justify-end mb-4">
        <button className="bg-secondaryColor text-white rounded-md px-3 py-1">
          Add New
        </button>
      </div>

      <table className="table-auto border-collapse border border-gray-300 w-3/4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Full Names</th>
            <th className="border border-gray-300 px-4 py-2">Contacts</th>
            <th className="border border-gray-300 px-4 py-2">Emails</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {learners.map((learner, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{learner.name}</td>
              <td className="border border-gray-300 px-4 py-2">{learner.contacts}</td>
              <td className="border border-gray-300 px-4 py-2">{learner.email}</td>
              <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center">
                <a href="#" className="text-blue-500">Edit</a>
                <a href="#" className="text-red-500">Delete</a>
                <a href="#" className="text-[#A0D3E8]">View</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
