import React, { useState, useEffect } from "react";
import data from "../data/data.json"; // Adjust the path if necessary
import types from "../Types/types"; // Make sure this imports correctly
import { Link, useLocation } from "react-router-dom";
import { calculatePercentage, calculateStatus } from "../utils/Calculations";
import AddMarksForm from "../components/AddMarkForm";

export const Teachers = () => {
  const location = useLocation();
  const {
    fullName,
    surname,
    teacherId,
    gradeId = [],
  } = location.state || {
    fullName: "Teacher",
    surname: "",
    teacherId: null,
    gradeId: [],
  };

  const formattedFullName = `${fullName} ${surname}`;
  const grades = data.grades || [];
  const learners = data.learners || [];

  const currentTeacher = data.teachers.find(
    (teacher) => teacher.id === teacherId
  );


  const teacherSubjects = currentTeacher.subjects || [];
  const teacherGrades = Array.isArray(gradeId)
    ? grades.filter((grade) => gradeId.includes(grade.gradeId))
    : [];

  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [availableSubjects, setAvailableSubjects] = useState<types.Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedLearners, setSelectedLearners] = useState<types.Learner[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [assignments, setAssignments] = useState([]); // State to manage assignments

  // Effect to filter subjects based on the selected grade
  useEffect(() => {
    if (selectedGrade) {
      const filteredSubjects = teacherSubjects.filter((subject) =>
        subject.gradeIds.includes(Number(selectedGrade)) // Filter subjects that match selected grade
      );

      setAvailableSubjects(filteredSubjects);
      setSelectedSubject(null); // Reset subject when grade changes
    } else {
      setAvailableSubjects([]); // Reset subjects if no grade is selected
    }
  }, [selectedGrade, teacherSubjects]);

  // Effect to filter learners based on selected grade and subject
  useEffect(() => {
    if (selectedGrade && selectedSubject) {
      const filteredLearners = learners.filter(
        (learner) =>
          learner.gradeId === String(selectedGrade) &&
          Array.isArray(learner.marks) &&
          learner.marks.some((mark) => mark.subjectId === selectedSubject)
      );
      setSelectedLearners(filteredLearners);
    } else {
      setSelectedLearners([]);
    }
  }, [selectedGrade, selectedSubject, learners]);

  const overallResults = selectedLearners.map((learner) => {
    const subjectMarks = learner.marks.filter(
      (mark) => mark.subjectId === selectedSubject
    );
    const totalObtained = subjectMarks.reduce(
      (sum, mark) => sum + (mark.markObtained || 0),
      0
    );
    const overRollMark = subjectMarks.reduce(
      (sum, mark) => sum + (mark.totalMark || 0),
      0
    );
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
      id: learner.id, // Added id for the learner to send in the form
      subjectId: selectedSubject, // Added subjectId for reference
    };
  });

  const handleAddMarksClick = (learner) => {
    setSelectedLearner(learner);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedLearner(null);
  };

  const handleAddMark = (newMark) => {
    setAssignments((prevAssignments) => [...prevAssignments, newMark]);
  };

  const handleDeleteAssignment = (assignmentToDelete) => {
    setAssignments((prevAssignments) =>
      prevAssignments.filter((assignment) => assignment !== assignmentToDelete)
    );
  };

  const handleEditAssignment = (assignmentToEdit) => {
    console.log("Editing assignment:", assignmentToEdit);
  };

  return (
    <div className="relative flex flex-col md:my-0 my-12 justify-center items-center md:h-[90vh] text-gray-800">
      <h1>Welcome</h1>
      <h1 className="text-5xl mx-7 md:mx-0 text-secondaryColor mb-16 font-bold">
        Welcome {formattedFullName}
      </h1>
      <div className="mb-6 flex sm:flex-row flex-col space-x-4">
        {/* Grade Selection Dropdown */}
        <select
          value={selectedGrade || ""}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Grade</option>
          {teacherGrades.length > 0 ? (
            teacherGrades.map((grade) => (
              <option key={grade.gradeId} value={String(grade.gradeId)}>
                {grade.grade}
              </option>
            ))
          ) : (
            <option disabled>No grades available</option>
          )}
        </select>

        {/* Subject Selection Dropdown */}
        <select
          value={selectedSubject || ""}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Subject</option>
          {availableSubjects.length > 0 ? (
            availableSubjects.map((subject) => (
              <option key={subject.subjectId} value={subject.subjectId}>
                {subject.subject}
              </option>
            ))
          ) : (
            <option disabled>No subjects available</option>
          )}
        </select>
      </div>

      {/* Display Results and Assignments */}
      {selectedGrade && selectedSubject && (
        <div>
          <h2 className="text-xl font-bold mb-4">Overall Results</h2>
          <table className="table-auto border-collapse border border-gray-300 max-w-7xl">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Learner Name</th>
                <th className="border border-gray-300 px-4 py-2">Total Obtained</th>
                <th className="border border-gray-300 px-4 py-2">Total Marks</th>
                <th className="border border-gray-300 px-4 py-2">Percentage</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Marks</th>
              </tr>
            </thead>
            <tbody>
              {overallResults.length > 0 ? (
                overallResults.map((result, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{result.learnerName}</td>
                    <td className="border border-gray-300 px-4 py-2">{result.totalObtained}</td>
                    <td className="border border-gray-300 px-4 py-2">{result.overRollMark}</td>
                    <td className="border border-gray-300 px-4 py-2">{result.percentage}%</td>
                    <td className="border border-gray-300 px-4 py-2">{result.status}</td>
                    <td className="border border-gray-300 px-4 py-2 text-blue-600">
                      <button onClick={() => handleAddMarksClick(result)}>Add Marks</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">
                    No results available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isFormOpen && (
        <AddMarksForm
          learner={selectedLearner}
          onClose={handleCloseForm}
          onAddMark={handleAddMark}
        />
      )}

      {/* Display the list of assignments */}
      {assignments.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Assignments</h2>
          <table className="table-auto border-collapse border border-gray-300 max-w-7xl">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Assignment</th>
                <th className="border border-gray-300 px-4 py-2">Marks Obtained</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{assignment.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{assignment.markObtained}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button onClick={() => handleEditAssignment(assignment)}>Edit</button>
                    <button onClick={() => handleDeleteAssignment(assignment)}>Delete</button>
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

export default Teachers;
