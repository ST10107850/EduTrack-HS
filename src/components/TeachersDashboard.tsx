import { useState, useEffect } from "react";
import data from "../data/data.json";
import types from "../Types/types";
import { useLocation } from "react-router-dom";

export const TeachersDashboard = () => {

  const location = useLocation();
  const {fullName, surname} = location.state || {fullName: "Teacher", surname: ""}

  const formattedFullName = `${fullName} ${surname}`


  const grades: types.Grade[] = data.grades;
  const subjects: types.Subject[] = data.subjects;
  const learners: types.Learner[] = data.learners;

  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedLearners, setSelectedLearners] = useState<types.Learner[]>([]);

  const calculatePercentage = (markObtained: number, totalMark: number) => {
    return ((markObtained / totalMark) * 100).toFixed(2);
  };

  const calculateStatus = (percentage: number) => {
    if (percentage < 30) return "Failed";
    if (percentage < 70) return "Passed";
    return "Passed With Distinction";
  };

  useEffect(() => {
    if (selectedGrade && selectedSubject) {
      const filteredLearners = learners.filter(
        (learner) =>
          learner.gradeId === selectedGrade &&
          Array.isArray(learner.marks) &&
          learner.marks.some((mark) => mark.subjectId === selectedSubject)
      );
      setSelectedLearners(filteredLearners);
    } else {
      setSelectedLearners([]);
    }
  }, [selectedGrade, selectedSubject]);

  // Calculate overall marks
 // Calculate overall marks
// Calculate overall marks
const overallResults = selectedLearners.map((learner) => {
  const subjectMarks = learner.marks.filter(
    (mark) => mark.subjectId === selectedSubject
  );

  if (subjectMarks.length === 0) {
    // No marks for this subject, default values
    return {
      learnerName: `${learner.fullName} ${learner.surname}`,
      totalObtained: 0,
      overRollMark: 0,
      percentage: "0.00",
      status: "Failed", // or another default status
    };
  }

  // Calculate total obtained marks and total possible marks
  const totalObtained = subjectMarks.reduce((sum, mark) => {
    const obtained = typeof mark.markObtained === 'number' ? mark.markObtained : 0;
    return sum + obtained;
  }, 0);

  const overRollMark = subjectMarks.reduce((sum, mark) => {
    const total = typeof mark.totalMark === 'number' ? mark.totalMark : 0;
    return sum + total;
  }, 0);

  const percentage =
    overRollMark > 0
      ? calculatePercentage(totalObtained, overRollMark)
      : "0.00";

  return {
    learnerName: `${learner.fullName} ${learner.surname}`,
    totalObtained,
    overRollMark,
    percentage,
    status: calculateStatus(parseFloat(percentage)),
  };
});



  return (
    <div className="relative flex flex-col md:my-0 my-12 justify-center items-center md:h-[90vh] text-gray-800">
      <h1 className="text-5xl mx-7 md:mx-0 text-secondaryColor mb-16 font-bold">
        Welcome {formattedFullName}
      </h1>

      <div className="mb-6 flex sm:flex-row flex-col space-x-4">
        <select
          value={selectedGrade || ""}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Grade</option>
          {grades.map((grade) => (
            <option key={grade.gradeId} value={String(grade.gradeId)}>
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

      {selectedGrade && selectedSubject && (
        <div>
         
          <h2 className="text-xl font-bold">Overall Results</h2>
          <table className="table-auto border-collapse border border-gray-300 max-w-4xl">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">
                  Learner Name
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Total Obtained
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Total Marks
                </th>
                <th className="border border-gray-300 px-4 py-2">Percentage</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {overallResults.map((result, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {result.learnerName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {result.totalObtained}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {result.overRollMark}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {result.percentage}%
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {result.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
