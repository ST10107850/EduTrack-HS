// AddMarksForm.js
import React, { useState } from "react";
import axios from "axios";

const AddMarksForm = ({ learner, onClose, onAddMark }) => {
  const [assignmentName, setAssignmentName] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [marksObtained, setMarksObtained] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMark = {
      subjectId: learner.subjectId,
      assignmentName,
      markObtained: parseInt(marksObtained, 10),
      totalMark: parseInt(totalMarks, 10),
      comment, // Include comment if needed
    };

    try {
      const response = await axios.patch(`/api/learners/${learner.id}`, {
        marks: [...learner.marks, newMark],
      });
      alert("Marks added successfully!");
      onAddMark(newMark); // Call the new prop to update assignments
      onClose();
    } catch (error) {
      console.error("Error updating marks:", error);
      alert("Failed to add marks. Please try again.");
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-2">
          <h3 className="font-bold mb-2">Current Assignments</h3>
          <table>
            <thead>
              <tr>
                <th>Assignment Names</th>
                <th>Total Marks</th>
                <th>Marks Obtained</th>
              </tr>
            </thead>
            <tbody>
              {learner.marks && learner.marks.length > 0 ? (
                learner.marks.map((mark, index) => (
                  <tr key={index}>
                    <td>{mark.assignmentName}</td>
                    <td>{mark.totalMark}</td>
                    <td>{mark.markObtained}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No assignments available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Form fields for adding new marks */}
        <div>
          <label>Assignment Name</label>
          <input
            type="text"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Total Marks</label>
          <input
            type="number"
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Marks Obtained</label>
          <input
            type="number"
            value={marksObtained}
            onChange={(e) => setMarksObtained(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Add Marks</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddMarksForm;
