import React, { useState, useEffect } from "react";
import data from "../data/data.json"; // Adjust the path based on your project structure

interface Subject {
  subjectId: string;
  subject: string;
  id: string;
}

export const SubjectList: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        // Replace this with an actual API call
        if (data.subjects && Array.isArray(data.subjects)) {
          setSubjects(data.subjects); // Set all subjects initially
        } else {
          setError("No subjects data found.");
        }
      } catch (err) {
        setError("Failed to fetch subjects.");
      }
    };

    fetchSubjects();
  }, []);

  // Always limit to 4 subjects
  const displayedSubjects = subjects.slice(0, 4);

  return (
    <div>
      <div className="flex justify-between">
        <h1>Subjects List</h1>
        <a href="#" className="text-blue-500">See All</a>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col items-center w-full mb-6">
        <div className="flex space-x-24 mb-4">
          {displayedSubjects.slice(0, 2).map((subject) => (
            <div key={subject.subjectId} className="bg-[#99c4ff] shadow-lg rounded-lg p-10 w-[30rem]">
              {subject.subject} {/* Display subject name */}
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-24">
          {displayedSubjects.slice(2, 4).map((subject) => (
            <div key={subject.subjectId} className="bg-[#99c4ff] shadow-lg rounded-lg p-10 w-[30rem]">
              {subject.subject} {/* Display subject name */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
