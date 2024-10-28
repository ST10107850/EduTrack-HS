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

type Learner = {
  id: string;
  name: string;
  gradeId: string;
  marks: Array<{
    subjectId: string;
    markObtained: number;
    totalMark: number;
  }>;
};

export const TeachersDashboard = () => {
  const grades: Grade[] = data.grades;
  const subjects: Subject[] = data.subjects;
  const learners: Learner[] = data.learners;

  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedLearners, setSelectedLearners] = useState<Learner[]>([]);

  const calculatePercentage = (markObtained: number, totalMark: number) => {
    return ((markObtained / totalMark) * 100).toFixed(2);
  };

  const calculateStatus = (percentage: number) => {
    if (percentage < 30) return "Failed";
    if (percentage < 70) return "Passed";
    return "Passed With Distinction";
  };

  useEffect(() => {
    if (selectedGrade) {
      const filteredLearners = learners.filter(
        (learner) => learner.gradeId === selectedGrade
      );
      setSelectedLearners(filteredLearners);
    }
  }, [selectedGrade]);

  return (
    <div className="relative flex flex-col md:my-0 my-12 justify-center items-center md:h-[90vh] text-gray-800">
      <h1 className="text-5xl mx-7 md:mx-0 text-secondaryColor mb-16 font-bold">
        Welcome {selectedGrade || "Select a Grade"}
      </h1>

      <div className="mb-6 flex sm:flex-row flex-col space-x-4">
        <select
          value={selectedGrade || ""}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Grade</option>
          {grades.map((grade) => (
            <option key={grade.gradeId} value={grade.gradeId}>
              {grade.grade}
            </option>
          ))}
        </select>

        <select
          value={selectedSubject || ""}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject.subjectId} value={subject.subjectId}>
              {subject.subject}
            </option>
          ))}
        </select>
      </div>

      {selectedGrade && (
        <table className="table-auto border-collapse border border-gray-300 w-3/4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Learner Name</th>
              <th className="border border-gray-300 px-4 py-2">Subject</th>
              <th className="border border-gray-300 px-4 py-2">Total Mark</th>
              <th className="border border-gray-300 px-4 py-2">Mark Obtained</th>
              <th className="border border-gray-300 px-4 py-2">Percentage</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {selectedLearners.map((learner) =>
              learner.marks
                .filter((mark) => !selectedSubject || mark.subjectId === selectedSubject)
                .map((mark, index) => {
                  const subject = subjects.find(
                    (sub) => sub.subjectId === mark.subjectId
                  );
                  const percentage = calculatePercentage(
                    mark.markObtained,
                    mark.totalMark
                  );
                  const status = calculateStatus(parseFloat(percentage));
                  return (
                    <tr key={learner.id + "-" + index}>
                      <td className="border border-gray-300 px-4 py-2">{learner.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{subject?.subject}</td>
                      <td className="border border-gray-300 px-4 py-2">{mark.totalMark}</td>
                      <td className="border border-gray-300 px-4 py-2">{mark.markObtained}</td>
                      <td className="border border-gray-300 px-4 py-2">{percentage}%</td>
                      <td className="border border-gray-300 px-4 py-2">{status}</td>
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
