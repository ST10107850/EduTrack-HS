import { useState, useEffect } from "react";
import data from "../Data/data.json";

type Grade = {
  gradeId: string;
  grade: string;
};

type Subject = {
  subjectId: string;
  subject: string;
};

type Mark = {
  subjectId: string;
  markObtained: number;
};

type Learner = {
  id: string;
  name: string;
  gradeId: string;
  marks: Mark[];
};

export const Boards = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [learners, setLearners] = useState<Learner[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [filteredLearners, setFilteredLearners] = useState<Learner[]>([]);

  useEffect(() => {
    setGrades(data.grades);
    setSubjects(data.subjects);
    setLearners(data.learners);
  }, []);

  const handleGradeChange = (gradeId: string) => {
    setSelectedGrade(gradeId);
    const learnersInGrade = learners.filter((learner) => learner.gradeId === gradeId);
    setFilteredLearners(learnersInGrade);
  };

  const calculatePercentage = (mark: number, total = 100): string => ((mark / total) * 100).toFixed(2);

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-6">Teacher's Dashboard</h1>
      
      <div className="flex space-x-4 mb-6">
        <select
          className="p-2 border rounded"
          value={selectedGrade || ""}
          onChange={(e) => handleGradeChange(e.target.value)}
        >
          <option value="">Select Grade</option>
          {grades.map((grade) => (
            <option key={grade.gradeId} value={grade.gradeId}>
              {grade.grade}
            </option>
          ))}
        </select>
      </div>

      {selectedGrade && (
        <div>
          <h2 className="text-xl mb-4">
            Learners in {grades.find((grade) => grade.gradeId === selectedGrade)?.grade}
          </h2>

          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Learner Name</th>
                {subjects.map((subject) => (
                  <th key={subject.subjectId} className="border px-4 py-2">
                    {subject.subject}
                  </th>
                ))}
                <th className="border px-4 py-2">Average Score (%)</th>
              </tr>
            </thead>
            <tbody>
              {filteredLearners.map((learner) => {
                const totalScore = learner.marks.reduce((acc, curr) => acc + curr.markObtained, 0);
                const averageScore = calculatePercentage(totalScore, learner.marks.length * 100);

                return (
                  <tr key={learner.id}>
                    <td className="border px-4 py-2">{learner.name}</td>
                    {subjects.map((subject) => {
                      const mark = learner.marks.find((m) => m.subjectId === subject.subjectId)?.markObtained;
                      return (
                        <td key={subject.subjectId} className="border px-4 py-2">
                          {mark !== undefined ? mark : "-"}
                        </td>
                      );
                    })}
                    <td className="border px-4 py-2">{averageScore}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
