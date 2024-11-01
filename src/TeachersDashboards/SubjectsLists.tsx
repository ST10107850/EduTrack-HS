import React from "react";

export const SubjectsLists = ({ teacher, grades }) => {
  if (!teacher) {
    return <p>No teacher data available.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Subjects List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teacher.subjects.map((subject, subjectIndex) => (
          <div 
            key={subject.subjectId || subjectIndex} 
            className="bg-pink-100 p-4 rounded-md flex flex-col justify-between"
          >
            <h2 className="text-xl text-tertiaryColor font-bold">Subject: {subject.subject || "Unknown"}</h2>
            <ul className="grid grid-cols-2 gap-2 mt-2">
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
