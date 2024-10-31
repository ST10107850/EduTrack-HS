import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import data from "../data/data.json"; // Ensure your data import is correct

const AddMarksForm = ({ learner, onClose, onAddMark }) => {
  const location = useLocation();
  const {
    fullName = "Learner",
    surname = "",
    learnerId,
    gradeId = [],
  } = location.state || {};

  const formattedName = `${fullName} ${surname}`;
  const grades = data.grades;
  const learners = data.learners;

  const currentTeacher = data.learners.find(
    (learner) => learner.id === learnerId
  );
  const teacherSubjects = currentTeacher ? currentTeacher.subjects : [];
  const teacherGrades = grades.filter((grade) =>
    gradeId.includes(grade.gradeId)
  );

  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
    null
  );
  const [availableLearners, setAvailableLearners] = useState([]);
  const [marks, setMarks] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedGrade && selectedSubjectId) {
      const filteredLearners = learners.filter((learner) => {
        return (
          learner.gradeId === String(selectedGrade) &&
          learner.subjects.includes(selectedSubjectId)
        );
      });
      setAvailableLearners(filteredLearners);

      const initialMarks = {};
      filteredLearners.forEach((learner) => {
        const marksForSubject = learner.marks.find(
          (mark) => mark.subjectId === selectedSubjectId
        );
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
      setErrors({});
    }
  }, [selectedGrade, selectedSubjectId, learners]);

  const handleGradeChange = (event) => {
    const gradeId = Number(event.target.value);
    setSelectedGrade(gradeId);
    setSelectedSubjectId(null);
    setMarks({});
    setAvailableLearners([]);
    setErrors({});
  };

  const filteredSubjects = selectedGrade 
  ? teacherSubjects.filter((subject) =>
      subject.gradeIds.includes(Number(selectedGrade))
    )
  : [];


  const handleSubjectChange = (event) => {
    setSelectedSubjectId(event.target.value);
    setMarks({});
    setErrors({});
  };

  const handleMarkChange = (learnerId, total, value) => {
    const obtained = value === "" ? undefined : Number(value);
    setMarks((prevMarks) => ({
      ...prevMarks,
      [learnerId]: { total, obtained },
    }));

    if (obtained !== undefined && obtained > total) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [learnerId]: "Mark obtained cannot be greater than total mark.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [learnerId]: "" }));
    }
  };

  const handleTotalMarkChange = (learnerId, value) => {
    const totalMark = Number(value);
    setMarks((prevMarks) => ({
      ...prevMarks,
      [learnerId]: {
        ...prevMarks[learnerId],
        total: totalMark,
      },
    }));

    const obtained = marks[learnerId]?.obtained;
    if (obtained !== undefined && obtained > totalMark) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [learnerId]: "Mark obtained cannot be greater than total mark.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [learnerId]: "" }));
    }
  };

  const handleSubmitMarks = (event) => {
    event.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      alert("Please fix the errors before submitting.");
      return;
    }
    setSubmitted(true);
    setMarks({});
    setSelectedSubjectId(null);
    setSelectedGrade(null);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">
        Enter Marks for {formattedName}/
      </h1>
      <form onSubmit={handleSubmitMarks}>
        <div className="flex mb-4 space-x-4">
          <div className="w-1/3">
            <label className="block mb-2">Select Grade:</label>
            <select
              value={selectedGrade || ""}
              onChange={handleGradeChange}
              className="border rounded p-2 w-full"
            >
              <option value="" disabled>
                Select a grade
              </option>
              {teacherGrades.map((grade) => (
                <option key={grade.gradeId} value={grade.gradeId}>
                  {grade.grade}
                </option>
              ))}
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
              <option value="" disabled>
                Select a subject
              </option>
              {filteredSubjects.map((subject) => (
                <option key={subject.subjectId} value={subject.subjectId}>
                  {subject.subject}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedSubjectId && (
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
                      onChange={(e) =>
                        handleTotalMarkChange(learner.id, e.target.value)
                      }
                      placeholder="Total Mark"
                      className="border rounded p-1 w-full"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={marks[learner.id]?.obtained || ""}
                      onChange={(e) =>
                        handleMarkChange(
                          learner.id,
                          marks[learner.id]?.total || 0,
                          e.target.value
                        )
                      }
                      placeholder="Mark Obtained"
                      className="border rounded p-1 w-full"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    {marks[learner.id]?.total &&
                    marks[learner.id]?.obtained !== undefined
                      ? `${(
                          (marks[learner.id].obtained /
                            marks[learner.id].total) *
                          100
                        ).toFixed(2)}%`
                      : "-"}
                  </td>
                  <td className="border border-gray-300 p-2 text-red-500">
                    {errors[learner.id] && <span>{errors[learner.id]}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
        >
          Submit Marks
        </button>
        {submitted && (
          <p className="text-green-500 mt-4">Marks submitted successfully!</p>
        )}
      </form>
    </div>
  );
};

export default AddMarksForm;
