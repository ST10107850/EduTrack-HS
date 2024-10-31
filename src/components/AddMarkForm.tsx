import React, { useState, useEffect } from "react";

const AddMarksForm = ({ onAddMark, onClose, selectedLearner, currentAssignment }) => {
  const [assignmentName, setAssignmentName] = useState("");
  const [markObtained, setMarkObtained] = useState("");
  const [totalMark, setTotalMark] = useState("");

  useEffect(() => {
    if (currentAssignment) {
      setAssignmentName(currentAssignment.assignmentName);
      setMarkObtained(currentAssignment.markObtained);
      setTotalMark(currentAssignment.totalMark);
    }
  }, [currentAssignment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMark = {
      assignmentName,
      markObtained: Number(markObtained),
      totalMark: Number(totalMark),
    };
    onAddMark(newMark);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">{currentAssignment ? "Edit" : "Add"} Assignment</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Assignment Name"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
            className="border border-gray-300 p-2 mb-2 w-full"
            required
          />
          <input
            type="number"
            placeholder="Mark Obtained"
            value={markObtained}
            onChange={(e) => setMarkObtained(e.target.value)}
            className="border border-gray-300 p-2 mb-2 w-full"
            required
          />
          <input
            type="number"
            placeholder="Total Mark"
            value={totalMark}
            onChange={(e) => setTotalMark(e.target.value)}
            className="border border-gray-300 p-2 mb-2 w-full"
            required
          />
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Save
            </button>
            <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMarksForm;
