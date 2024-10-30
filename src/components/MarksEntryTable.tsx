import React, { useState } from 'react';
import data from '../data/data.json';

const MarksEntryTable: React.FC = () => {
  const { learners, subjects } = data;

  // Grades from 8 to 12
  const grades = [8, 9, 10, 11, 12];

  const [marks, setMarks] = useState<Record<string, { total: number; obtained: number | undefined }>>({});
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState('');

  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubjectId(event.target.value);
    setMarks({}); // Reset marks when selecting a new subject
  };

  const handleGradeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGrade(Number(event.target.value));
  };

  const handleMarkChange = (learnerId: string, total: number, value: string) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [learnerId]: {
        total,
        obtained: value === '' ? undefined : Number(value),
      },
    }));
  };

  const handleSubmitMarks = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Marks submitted:', marks);
    console.log('Selected grade:', selectedGrade);
    setSubmitted(true);
    setMarks({}); // Clear marks after submission
    setSelectedSubjectId(null); // Reset selected subject
    setSelectedGrade(null); // Reset selected grade
    setTimeout(() => setSubmitted(false), 3000); // Clear message after 3 seconds
  };

  const handleSaveComment = () => {
    console.log('Comment saved:', comment);
    setComment(''); // Clear comment after saving
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Enter Marks</h1>

      <form onSubmit={handleSubmitMarks}>
        <div className="flex mb-4 space-x-4">
          <div className="w-1/3">
            <label className="block mb-2">Select Subject:</label>
            <select
              value={selectedSubjectId || ''}
              onChange={handleSubjectChange}
              className="border rounded p-2 w-full"
            >
              <option value="" disabled>Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject.subjectId} value={subject.subjectId}>
                  {subject.subject}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/3">
            <label className="block mb-2">Select Grade:</label>
            <select
              value={selectedGrade || ''}
              onChange={handleGradeChange}
              className="border rounded p-2 w-full"
            >
              <option value="" disabled>Select a grade</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedSubjectId && selectedGrade && (
          <>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Learner</th>
                  <th className="border border-gray-300 p-2">Assignment Name</th>
                  <th className="border border-gray-300 p-2">Total Mark</th>
                  <th className="border border-gray-300 p-2">Mark Obtained</th>
                  <th className="border border-gray-300 p-2">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {learners.map((learner) => (
                  <tr key={learner.id}>
                    <td className="border border-gray-300 p-2">
                      {`${learner.fullName} ${learner.surname}`}
                    </td>
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
                        placeholder="Total Mark"
                        className="border rounded p-1 w-full"
                        onChange={(e) => {
                          const totalMark = Number(e.target.value);
                          handleMarkChange(learner.id, totalMark, marks[learner.id]?.obtained?.toString() || '');
                        }}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={marks[learner.id]?.obtained || ''}
                        onChange={(e) => handleMarkChange(learner.id, marks[learner.id]?.total || 0, e.target.value)}
                        className="border rounded p-1 w-full"
                        min={0} // Prevent negative values
                        max={100} // Assuming marks are out of 100; adjust as needed
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      {marks[learner.id]?.total && marks[learner.id]?.obtained !== undefined
                        ? `${((marks[learner.id].obtained / marks[learner.id].total) * 100).toFixed(2)}%`
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded"
            >
              Submit Marks
            </button>
          </>
        )}
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
