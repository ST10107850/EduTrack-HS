import React, { useState, useEffect } from "react";
import data from "../data/data.json"; // Adjust the path as necessary

interface Subject {
  subjectId: string;
  subject: string;
  id: string;
}

interface SubjectListProps {
  onToggleShowAll: (showAll: boolean) => void;
}

export const SubjectList: React.FC<SubjectListProps> = ({ onToggleShowAll }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        if (data.subjects && Array.isArray(data.subjects)) {
          setSubjects(data.subjects);
        } else {
          setError("No subjects data found.");
        }
      } catch {
        setError("Failed to fetch subjects.");
      }
    };

    fetchSubjects();
  }, []);

  const displayedSubjects = showAll ? subjects : subjects.slice(0, 4);

  const handleToggleShowAll = () => {
    setShowAll((prev) => !prev);
    onToggleShowAll(!showAll); // Notify parent of toggle change
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Subjects List</h1>
        <button
          onClick={handleToggleShowAll}
          className="text-blue-500 underline hover:text-blue-700"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {displayedSubjects.map((subject) => (
          <div
            key={subject.subjectId}
            className="bg-blue-100 shadow-md rounded-lg p-6 text-center text-lg font-medium"
          >
            {subject.subject}
          </div>
        ))}
      </div>
    </div>
  );
};
