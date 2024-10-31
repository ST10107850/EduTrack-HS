import React, { useEffect, useState } from "react";
import data from "../data/data.json"; // Ensure you have the correct path to your data
import { useLocation } from "react-router-dom";

const MarksEntryTable: React.FC = () => {
  const location = useLocation();
  const {
    fullName = "Teacher",
    surname = "",
    teacherId,
    gradeId = [],
  } = location.state || {};

  const formattedName = `${fullName} ${surname}`;
  const grades = data.grades; // Ensure this contains grade data
  const learners = data.learners; // Ensure this contains learner data

  // Get the current teacher's subjects based on teacherId
  const currentTeacher = data.teachers.find((teacher) => teacher.id === teacherId);
  const teacherSubjects = currentTeacher ? currentTeacher.subjects : [];

  // Filter grades based on the selected gradeId
  const teacherGrades = grades.filter((grade) => gradeId.includes(grade.gradeId));

  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [availableLearners, setAvailableLearners] = useState<any[]>([]);
  const [marks, setMarks] = useState<Record<string, { total: number; obtained: number | undefined }>>({});
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({}); // To hold validation errors

  // Update available learners when the selected grade and subject changes
  useEffect(() => {
    if (selectedGrade && selectedSubjectId) {
      const filteredLearners = learners.filter((learner) => {
        const isMatchingGrade = learner.gradeId === String(selectedGrade);
        const isMatchingSubject = learner.subjects.includes(selectedSubjectId);
        return isMatchingGrade && isMatchingSubject;
      });
      setAvailableLearners(filteredLearners);

      // Initialize marks with existing data for each learner
      const initialMarks: Record<string, { total: number; obtained: number | undefined }> = {};
      filteredLearners.forEach((learner) => {
        const marksForSubject = learner.marks.find((mark) => mark.subjectId === selectedSubjectId);
        if (marksForSubject) {
          initialMarks[learner.id] = {
            total: marksForSubject.totalMark,
            obtained: marksForSubject.markObtained,
          };
        }
      });
      setMarks(initialMarks);
    } else {
      setAvailableLearners([]);
      setMarks({});
      setErrors({}); // Reset errors when no learners are available
    }
  }, [selectedGrade, selectedSubjectId, learners]);

  // Clear selected subject and learners when grade changes
  const handleGradeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const gradeId = Number(event.target.value);
    setSelectedGrade(gradeId);
    setSelectedSubjectId(null); // Reset subject selection
    setMarks({}); // Reset marks when changing grade
    setAvailableLearners([]); // Clear learners
    setErrors({}); // Reset errors
  };

  // Filter subjects based on selected grade
  const filteredSubjects = selectedGrade
    ? teacherSubjects.filter(subject => subject.gradeIds.includes(selectedGrade))
    : [];

  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const subjectId = event.target.value;
    setSelectedSubjectId(subjectId);
    setMarks({}); // Reset marks when selecting a new subject
    setErrors({}); // Reset errors
  };

  const handleMarkChange = (learnerId: string, total: number, value: string) => {
    const obtained = value === "" ? undefined : Number(value);
    setMarks((prevMarks) => ({
      ...prevMarks,
      [learnerId]: {
        total,
        obtained,
      },
    }));

    // Validation: Check if obtained mark is greater than total
    if (obtained !== undefined && obtained > total) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [learnerId]: "Mark obtained cannot be greater than total mark.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [learnerId]: "", // Clear error if validation passes
      }));
    }
  };

  const handleTotalMarkChange = (learnerId: string, value: string) => {
    const totalMark = Number(value);
    setMarks((prevMarks) => ({
      ...prevMarks,
      [learnerId]: {
        ...prevMarks[learnerId],
        total: totalMark,
      },
    }));

    // Validation: Check if obtained mark is greater than total
    const obtained = prevMarks[learnerId]?.obtained;
    if (obtained !== undefined && obtained > totalMark) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [learnerId]: "Mark obtained cannot be greater than total mark.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [learnerId]: "", // Clear error if validation passes
      }));
    }
  };

  const handleSubmitMarks = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Check for any existing errors before submitting
    if (Object.values(errors).some(error => error)) {
      alert("Please fix the errors before submitting.");
      return;
    }
    
    console.log("Marks submitted:", marks);
    setSubmitted(true);
    setMarks({}); // Clear marks after submission
    setSelectedSubjectId(null); // Reset selected subject
    setSelectedGrade(null); // Reset selected grade
    setTimeout(() => setSubmitted(false), 3000); // Clear message after 3 seconds
  };

  const handleSaveComment = () => {
    console.log("Comment saved:", comment);
    setComment(""); // Clear comment after saving
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Enter Marks for {formattedName}</h1>

      <form onSubmit={handleSubmitMarks}>
        <div className="flex mb-4 space-x-4">
          <div className="w-1/3">
            <label className="block mb-2">Select Grade:</label>
            <select
              value={selectedGrade || ""}
              onChange={handleGradeChange}
              className="border rounded p-2 w-full"
            >
              <option value="" disabled>Select a grade</option>
              {teacherGrades.length > 0 ? (
                teacherGrades.map((grade) => (
                  <option key={grade.gradeId} value={grade.gradeId}>
                    {grade.grade}
                  </option>
                ))
              ) : (
                <option value="" disabled>No grades available</option>
              )}
            </select>
          </div>
          <div className="w-1/3">
            <label className="block mb-2">Select Subject:</label>
            <select
              value={selectedSubjectId || ""}
              onChange={handleSubjectChange}
              className="border rounded p-2 w-full"
              disabled={!selectedGrade}
            >
              <option value="" disabled>Select a subject</option>
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map(subject => (
                  <option key={subject.subjectId} value={subject.subjectId}>
                    {subject.subject}
                  </option>
                ))
              ) : (
                <option value="" disabled>No subjects available</option>
              )}
            </select>
          </div>
        </div>

        {selectedSubjectId && (
          <>
            {availableLearners.length > 0 ? (
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Learner</th>
                    <th className="border border-gray-300 p-2">Assignment Name</th>
                    <th className="border border-gray-300 p-2">Total Mark</th>
                    <th className="border border-gray-300 p-2">Mark Obtained</th>
                    <th className="border border-gray-300 p-2">Percentage</th>
                    <th className="border border-gray-300 p-2">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {availableLearners.map((learner) => (
                    <tr key={learner.id}>
                      <td className="border border-gray-300 p-2">{`${learner.fullName} ${learner.surname}`}</td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          placeholder="Assignment Name"
                          className="border rounded p-1 w-full"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="number"
                          value={marks[learner.id]?.total || ""}
                          onChange={(e) => handleTotalMarkChange(learner.id, e.target.value)}
                          placeholder="Total Mark"
                          className="border rounded p-1 w-full"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="number"
                          value={marks[learner.id]?.obtained || ""}
                          onChange={(e) => handleMarkChange(learner.id, marks[learner.id]?.total || 0, e.target.value)}
                          placeholder="Mark Obtained"
                          className="border rounded p-1 w-full"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        {marks[learner.id]?.total && marks[learner.id]?.obtained !== undefined
                          ? `${((marks[learner.id].obtained / marks[learner.id].total) * 100).toFixed(2)}%`
                          : "-"}
                      </td>
                      <td className="border border-gray-300 p-2 text-red-500">
                        {errors[learner.id] && <span>{errors[learner.id]}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No learners available for this grade and subject.</div>
            )}
          </>
        )}

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded"
          disabled={availableLearners.length === 0} // Disable if no learners
        >
          Submit Marks
        </button>
      </form>

      {submitted && (
        <div className="mt-4 text-green-500">Marks submitted successfully!</div>
      )}

      <div className="mt-4">
        <h2 className="text-xl font-bold">Additional Comments:</h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border rounded p-2 w-full h-24 mt-2"
          placeholder="Add your comments here..."
        />
        <button
          onClick={handleSaveComment}
          className="mt-2 bg-blue-500 text-white p-2 rounded"
        >
          Save Comment
        </button>
      </div>
    </div>
  );
};

export default MarksEntryTable;
