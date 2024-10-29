import React, { useState } from "react";
import data from "../Data/data.json";
import { toast } from "react-toastify";
import { Grade } from "../Types/types";
import { Subjects } from "../Types/types";
import { useApi } from "../hooks/ApiContext";

export const NewLearner = () => {
  const { apiUrl } = useApi(); 
  const grades: Grade[] = data.grades;
  const subjects: Subjects[] = data.subjects;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    surname: "",
    idNumber: "",
    address: "",
    emailAddress: "",
    phoneNumber: "",
    gradeId: "",
    subjectID: "",
  });
  const [addedSubjects, setAddedSubjects] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addSubject = () => {
    if (formData.subjectID && !addedSubjects.includes(formData.subjectID)) {
      setAddedSubjects((prevSubjects) => [...prevSubjects, formData.subjectID]);
      setFormData((prevData) => ({ ...prevData, subjectID: "" }));
    }
  };

  const removeSubject = (index: number) => {
    setAddedSubjects((prevSubjects) =>
      prevSubjects.filter((_, i) => i !== index)
    );
  };

  const validateInputs = () => {
    const idNumberRegex = /^\d{13}$/;
    const phoneNumberRegex = /^\d{10}$/;

    if (!idNumberRegex.test(formData.idNumber)) {
      toast.error("ID Number must be 13 digits.");
      return false;
    }

    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      toast.error("Phone Number must be 10 digits.");
      return false;
    }

    return true;
  };

  const handleNextStep = () => setStep((prevStep) => prevStep + 1);
  const handlePrevStep = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const learnerData = {
      fullName: formData.fullName,
      surname: formData.surname,
      idNumber: formData.idNumber,
      address: formData.address,
      emailAddress: formData.emailAddress,
      phoneNumber: formData.phoneNumber,
      gradeId: formData.gradeId,
      subjects: addedSubjects,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(learnerData),
      });

      if (response.ok) {
        toast.success("Learner data submitted successfully");
        setStep(1);
        setFormData({
          fullName: "",
          surname: "",
          idNumber: "",
          address: "",
          emailAddress: "",
          phoneNumber: "",
          gradeId: "",
          subjectID: "",
        });
        setAddedSubjects([]);
      } else {
        const errorText = await response.text();
        console.error("Failed to submit learner data:", errorText);
      }
    } catch (error) {
      console.error("Error submitting learner data:", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-10 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-primaryColor">
          Learner Registration
        </h2>

        <div className="flex justify-between mb-6">
          <span
            className={`flex-1 ${step >= 1 ? "bg-blue-500" : "bg-gray-300"} h-2 mr-1 rounded`}
          />
          <span
            className={`flex-1 ${step >= 2 ? "bg-blue-500" : "bg-gray-300"} h-2 rounded`}
          />
        </div>

        {step === 1 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                name="fullName"
                placeholder="Full Names"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
              />
              <input
                name="surname"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleInputChange}
                required
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
              />
            </div>
            <div className="mb-4">
              <input
                name="idNumber"
                type="text" // Changed to text for input
                placeholder="ID Number"
                value={formData.idNumber}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
              />
            </div>
            <div className="mb-4">
              <input
                name="address"
                placeholder="Home Address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="mb-4">
                <input
                  name="emailAddress"
                  placeholder="Email Address"
                  type="email"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
                />
              </div>
              <div className="mb-4">
                <input
                  name="phoneNumber"
                  type="text" // Changed to text for input
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-3 bg-blue-500 text-white rounded mt-4 text-lg"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center mb-4">
              <div className="mr-2">
                <select
                  name="gradeId"
                  value={formData.gradeId}
                  onChange={handleInputChange}
                  required
                  disabled={addedSubjects.length > 0}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
                >
                  <option value="">Select Grade</option>
                  {grades.map((grade) => (
                    <option value={grade.gradeId} key={grade.gradeId}>
                      {grade.grade}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  name="subjectID"
                  value={formData.subjectID}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option value={subject.subjectId} key={subject.subjectId}>
                      {subject.subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={addSubject}
                className="bg-blue-500 text-white px-8 py-2 text-center rounded text-lg"
              >
                Add
              </button>
            </div>

            <ul className="list-none mb-4 border border-gray-200 rounded-lg p-4">
              {addedSubjects.map((subjectID, index) => {
                const subject = subjects.find((sub) => sub.subjectId === subjectID);
                return (
                  <li key={index} className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-700">{subject ? subject.subject : subjectID}</span>
                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="py-3 px-6 bg-gray-300 text-gray-700 rounded text-lg"
              >
                Back
              </button>
              <button
                type="submit"
                className="py-3 px-6 bg-blue-500 text-white rounded text-lg"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
