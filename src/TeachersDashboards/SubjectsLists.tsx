import React from "react";

export const SubjectsLists = ({ teacher, grades }) => {
  if (!teacher) {
    return <p>No teacher data available.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Subjects List</h1>
      <div className="space-y-6 flex flex-row justify-between items-center">
        {teacher.subjects.map((subject, subjectIndex) => (
          <div key={subject.subjectId || subjectIndex} className="bg-blue-100 p-4 rounded-md w-1/3 items-center ">
            <h2 className="text-xl font-bold">Subject: {subject.subject || "Unknown"}</h2>
            <ul className=" grid grid-cols-2">
              {subject.gradeIds.map((gradeId, index) => {
                const gradeData = grades[gradeId];
                return (
                  <li key={index} className="text-lg">
                    {gradeData.name}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
