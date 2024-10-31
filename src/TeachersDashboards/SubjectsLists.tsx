import React from "react";

export const SubjectsLists = ({ teacher, grades }) => {
  if (!teacher) {
    return <p>No teacher data available.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Subjects List</h1>
      <div className="space-y-6">
        {teacher.subjects.map((subject, subjectIndex) => (
          <div key={subject.subjectId || subjectIndex} className="bg-blue-100 p-4 rounded-md grid grid-cols-2">
            <h2 className="text-lg font-bold">Subject: {subject.subject || "Unknown"}</h2>
            <p className="font-bold">Grades:</p>
            <ul>
              {subject.gradeIds.map((gradeId, index) => {
                const gradeData = grades[gradeId];
                return (
                  <li key={index}>
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
