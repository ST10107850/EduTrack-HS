import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import data from "../data/data.json";

const calculatePercentage = (marksObtained, totalMarks) => {
  return ((marksObtained / totalMarks) * 100).toFixed(2);
};

const ParentComponent = () => {
  const location = useLocation();
  const { fullName, surname } = location.state || {
    fullName: "Parent",
    surname: "",
  };

  const formattedFullName = `${fullName} ${surname}`;
  const [parents] = useState(data.parents);
  const [learners] = useState(data.learners);
  const [subjects] = useState(data.subjects);

  const [selectedLearner, setSelectedLearner] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [status, setStatus] = useState("");

  const currentParent = parents.find((parent) => parent.fullName === fullName);
  const relatedLearners = learners.filter(
    (learner) => learner.idNumber === currentParent?.learnerID
  );

  useEffect(() => {
    if (selectedLearner && selectedSubject) {
      const subjectMarks = selectedLearner.marks.find(
        (mark) => mark.subjectId === selectedSubject
      );
      const totalMarks = subjectMarks?.totalMarks || 100;
      const marksObtained = subjectMarks?.markObtained || 0;
      const percentage = calculatePercentage(marksObtained, totalMarks);

      if (percentage < 30) {
        setStatus("Failed");
      } else if (percentage < 70) {
        setStatus("Passed");
      } else {
        setStatus("Passed With Distinction");
      }
    } else {
      setStatus("");
    }
  }, [selectedLearner, selectedSubject]);

  return (
    <div className="relative flex flex-col md:my-0 my-12 justify-center items-center md:h-[90vh] text-gray-800">
      <h1 className="text-5xl mx-7 md:mx-0 text-secondaryColor mb-16 font-bold">
        Welcome {formattedFullName}
      </h1>

      <div className="mb-6 flex sm:flex-row flex-col space-x-4">
        <select
          value={selectedLearner ? selectedLearner.id : ""}
          onChange={(e) => {
            const learner = relatedLearners.find(
              (l) => l.id === e.target.value
            );
            setSelectedLearner(learner || null);
            setSelectedSubject(null); // Reset selected subject
          }}
          className="p-2 border rounded"
        >
          <option value="">Select Learner</option>
          {relatedLearners.map((learner) => (
            <option key={learner.id} value={learner.id}>
              {learner.fullName} {learner.surname}
            </option>
          ))}
        </select>

        <select
          value={selectedSubject || ""}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="p-2 border rounded"
          disabled={!selectedLearner} // Disable if no learner is selected
        >
          <option value="">Select Subject</option>
          {selectedLearner &&
            selectedLearner.marks &&
            Object.keys(selectedLearner.marks).map((subjectId) => {
              const subject = subjects.find((s) => s.subjectId === subjectId);
              return (
                subject && (
                  <option key={subject.subjectId} value={subject.subjectId}>
                    {subject.subject}
                  </option>
                )
              );
            })}
        </select>
      </div>

      {selectedLearner && selectedSubject && (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 md: mb-8 w-3/4">
          <div className="bg-primaryColor p-4 rounded shadow text-white">
            <h3 className="text-lg font-bold">Subject Details</h3>
            <div className="flex items-center text-xl justify-between">
              <p>Learner Name:</p>
              <p>
                {selectedLearner.fullName} {selectedLearner.surname}
              </p>
            </div>

            <div className="flex items-center text-xl justify-between">
              <p>Subject: </p>
              <p>
                {subjects.find((s) => s.subjectId === selectedSubject)?.subject}
              </p>
            </div>

            <div className="flex items-center text-xl justify-between">
              <p>Status: </p>
              <p>{status}</p>
            </div>
          </div>

          <div className="bg-[#A0D3E8] p-4 rounded shadow">
            <h3 className="text-lg font-bold">Marks Obtained</h3>
            <p className="text-2xl">
              {
                selectedLearner.marks.find(
                  (mark) => mark.subjectId === selectedSubject
                )?.markObtained
              }
            </p>
          </div>

          <div className="bg-[#A0D3E8] p-4 rounded shadow">
            <h3 className="text-lg font-bold">Percentage</h3>
            <p className="text-2xl">
              {calculatePercentage(
                selectedLearner.marks.find(
                  (mark) => mark.subjectId === selectedSubject
                )?.markObtained || 0,
                selectedLearner.marks.find(
                  (mark) => mark.subjectId === selectedSubject
                )?.totalMarks || 100
              )}
              %
            </p>
          </div>
        </div>
      )}

      {selectedLearner && selectedSubject && (
        <div className="mt-8 w-3/4 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4">Assignments</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Assignment</th>
                <th className="py-2 px-4 border-b">Total Marks</th>
                <th className="py-2 px-4 border-b">Marks Obtained</th>
                <th className="py-2 px-4 border-b">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {selectedLearner.marks
                .filter((mark) => mark.subjectId === selectedSubject)
                .map((mark, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">
                      {mark.assignmentName || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {mark.totalMarks || 100}
                    </td>
                    <td className="py-2 px-4 border-b">{mark.markObtained}</td>
                    <td className="py-2 px-4 border-b">
                      {calculatePercentage(
                        mark.markObtained,
                        mark.totalMarks || 100
                      )}
                      %
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

export default ParentComponent;
