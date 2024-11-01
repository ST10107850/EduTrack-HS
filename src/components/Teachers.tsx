import React, { useState, useEffect } from "react";
import data from "../data/data.json";
import types from "../Types/types";
import { Link, useLocation } from "react-router-dom";
import { calculatePercentage, calculateStatus } from "../utils/Calculations";
import AddMarksForm from "../components/AddMarkForm";
import { SubjectsLists } from "../TeachersDashboards/SubjectsLists";

export const Teachers = () => {
  const location = useLocation();
  const {
    fullName = "Teacher",
    surname = "",
    teacherId,
    gradeId = [],
  } = location.state || {};

  const formattedFullName = `${fullName} ${surname}`;
  const grades = data.grades;
  const learners = data.learners;

  // Fetch the current teacher based on the ID
  const currentTeacher = data.teachers.find((teacher) => teacher.id === teacherId);
  const teacherSubjects = currentTeacher ? currentTeacher.subjects : [];

  // Filter grades based on the gradeId passed from the route
  const teacherGrades = grades.filter((grade) => gradeId.includes(grade.gradeId));

  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [availableSubjects, setAvailableSubjects] = useState<types.Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedLearner, setSelectedLearner] = useState<types.Learner | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [assignments, setAssignments] = useState<types.Assignment[]>([]);
  const [currentAssignment, setCurrentAssignment] = useState<types.Assignment | null>(null);
  const [selectedLearners, setSelectedLearners] = useState<types.Learner[]>([]);

  // Effect to filter available subjects based on the selected grade
  useEffect(() => {
    if (selectedGrade) {
      const filteredSubjects = teacherSubjects.filter((subject) =>
        subject.gradeIds.includes(Number(selectedGrade))
      );
      setAvailableSubjects(filteredSubjects);
      setSelectedSubject(null);
    } else {
      setAvailableSubjects([]);
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
  }, [selectedGrade, selectedSubject]);

  const overallResults = selectedLearners.map((learner) => {
    const subjectMarks = learner.marks.filter(
      (mark) => mark.subjectId === selectedSubject
    );
    const totalObtained = subjectMarks.reduce(
      (sum, mark) => sum + (mark.markObtained || 0),
      0
    );
    const totalMarks = subjectMarks.reduce(
      (sum, mark) => sum + (mark.totalMark || 0),
      0
    );
    const percentage = totalMarks > 0 ? calculatePercentage(totalObtained, totalMarks) : "0.00";
    return {
      learnerName: `${learner.fullName}`,
      totalObtained,
      totalMarks,
      percentage,
      status: calculateStatus(parseFloat(percentage)),
      id: learner.id,
      subjectId: selectedSubject,
      marks: learner.marks,
    };
  });

  const handleAddMarksClick = (learner) => {
    setSelectedLearner(learner);
    setAssignments(learner.marks || []);
  };

  const handleAddNewMarkClick = () => {
    setCurrentAssignment(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedLearner(null);
    setCurrentAssignment(null);
  };

  const handleAddMark = (newMark) => {
    // Update assignments array
    if (currentAssignment) {
      handleEditAssignment(newMark, currentAssignment);
    } else {
      setAssignments((prevAssignments) => [...prevAssignments, newMark]);
    }

    // Update the learner's marks in the JSON data
    const updatedLearners = learners.map((learner) => {
      if (learner.id === selectedLearner.id) {
        return {
          ...learner,
          marks: assignments,
        };
      }
      return learner;
    });

    setIsFormOpen(false);
  };

  const handleDeleteAssignment = (assignmentToDelete) => {
    setAssignments((prevAssignments) =>
      prevAssignments.filter((assignment) => assignment !== assignmentToDelete)
    );
  };

  const handleEditAssignment = (updatedAssignment, oldAssignment) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment === oldAssignment ? updatedAssignment : assignment
      )
    );
  };

  return (
    <div className="relative flex flex-col justify-center items-center md:h-[90vh] text-gray-800 p-4">
      <div className="flex flex-col items-center w-full max-w-screen-lg space-y-8">
        <div className="w-full h-[10rem] bg-pink-100 rounded-lg flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-5xl mx-7 md:mx-0 text-tertiaryColor font-bold">
            Welcome {formattedFullName}
          </h1>
        </div>

        <SubjectsLists teacher={currentTeacher} grades={grades} />
      </div>

      <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <select
          value={selectedGrade || ""}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="p-2 border rounded w-full sm:w-auto"
        >
          <option value="">Select Grade</option>
          {teacherGrades.map((grade) => (
            <option key={grade.gradeId} value={String(grade.gradeId)}>
              {grade.grade}
            </option>
          ))}
        </select>

        <select
          value={selectedSubject || ""}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="p-2 border rounded w-full sm:w-auto"
        >
          <option value="">Select Subject</option>
          {availableSubjects.map((subject) => (
            <option key={subject.subjectId} value={subject.subjectId}>
              {subject.subject}
            </option>
          ))}
        </select>
      </div>

      {selectedGrade && selectedSubject && (
        <div className="w-full max-w-screen-lg">
          <h2 className="text-xl font-bold mb-4">Overall Results</h2>
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-pink-200 text-tertiaryColor">
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
              {overallResults.map((result, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{result.learnerName}</td>
                  <td className="border border-gray-300 px-4 py-2">{result.totalObtained}</td>
                  <td className="border border-gray-300 px-4 py-2">{result.totalMarks}</td>
                  <td className="border border-gray-300 px-4 py-2">{result.percentage}%</td>
                  <td className="border border-gray-300 px-4 py-2">{result.status}</td>
                  <td className="border border-gray-300 px-4 py-2 text-blue-600">
                    <button onClick={() => handleAddMarksClick(result)}>Add Marks</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedLearner && assignments.length > 0 && (
        <div className="mt-6 w-full max-w-screen-lg">
          <h2 className="text-xl font-bold mb-4">Assignments For: {selectedLearner.fullName}</h2>
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Assignment Name</th>
                <th className="border border-gray-300 px-4 py-2">Marks Obtained</th>
                <th className="border border-gray-300 px-4 py-2">Total Marks</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{assignment.assignmentName}</td>
                  <td className="border border-gray-300 px-4 py-2">{assignment.markObtained}</td>
                  <td className="border border-gray-300 px-4 py-2">{assignment.totalMark}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button onClick={() => handleEditAssignmentClick(assignment)} className="text-blue-600 mr-2">Edit</button>
                    <button onClick={() => handleDeleteAssignment(assignment)} className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleAddNewMarkClick} className="mt-4 bg-blue-500 text-white p-2 rounded">
            Add New Marks
          </button>
        </div>
      )}

      {isFormOpen && (
        <AddMarksForm
          onAddMark={handleAddMark}
          onClose={handleCloseForm}
          selectedLearner={selectedLearner}
          currentAssignment={currentAssignment}
        />
      )}

      <Link to="/teachers-dashboard/teachers" className="mt-4">
        <button className="bg-blue-500 text-white p-2 rounded">Back</button>
      </Link>
    </div>
  );
};

export default Teachers;
