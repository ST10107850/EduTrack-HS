import React, { useState } from "react";
import data from "../data/data.json";
import { toast } from "react-toastify";
import { Grade, Subjects, teachers } from "../Types/types"; // Ensure all imports are correct
import { useApi } from "../hooks/ApiContext";

export const NewTeacher = () => {
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
  });

  const [gradeSubjectMap, setGradeSubjectMap] = useState<{
    [key: number]: number[];
  }>({});
  const [selectedGradeId, setSelectedGradeId] = useState<number | null>(null);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<number[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleSubjectSelection = (subjectId: number) => {
    setSelectedSubjectIds((prevIds) => {
      if (prevIds.includes(subjectId)) {
        return prevIds.filter((id) => id !== subjectId);
      }
      return [...prevIds, subjectId];
    });
  };

  const addSubjectsToGrade = () => {
    if (selectedGradeId !== null) {
      setGradeSubjectMap((prevMap) => {
        const updatedSubjects = prevMap[selectedGradeId] || [];
        const newSubjects = selectedSubjectIds.filter(
          (id) => !updatedSubjects.includes(id)
        );
        return {
          ...prevMap,
          [selectedGradeId]: [...updatedSubjects, ...newSubjects],
        };
      });
      setSelectedSubjectIds([]);
    }
  };

  const removeSubjectFromGrade = (gradeId: number, subjectId: number) => {
    setGradeSubjectMap((prevMap) => {
      const updatedSubjects = prevMap[gradeId]?.filter(
        (id) => id !== subjectId
      );
      return {
        ...prevMap,
        [gradeId]: updatedSubjects || [],
      };
    });
  };

  const validateInputs = () => {
    const idNumberRegex = /^\d{13}$/;
    const phoneNumberRegex = /^\d{10}$/;
    const emailDomainRegex = /@tshimologong\.co\.za$/; // Regex to check for the specific email domain

    if (!idNumberRegex.test(formData.idNumber)) {
      toast.error("ID Number must be 13 digits.");
      return false;
    }

    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      toast.error("Phone Number must be 10 digits.");
      return false;
    }

    if (!emailDomainRegex.test(formData.emailAddress)) {
      toast.error("Email address must be a @tshimologong.co.za domain.");
      return false;
    }

    return true;
  };

  const handleNextStep = () => setStep((prevStep) => prevStep + 1);
  const handlePrevStep = () => setStep((prevStep) => prevStep - 1);

  // Function to generate a random password
  const generateRandomPassword = (length = 12) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateInputs()) return;

    // Create arrays for grades and subjects
    const gradeIds = Object.keys(gradeSubjectMap).map(Number);
    const subjectIds = Object.values(gradeSubjectMap).flat();

    // Generate a random password
    const password = generateRandomPassword(); // Generate password here

    const teacherData: teachers = {
      id: Date.now(), // Placeholder for ID; adjust as necessary
      fullName: formData.fullName,
      surname: formData.surname,
      idNumber: formData.idNumber,
      address: formData.address,
      emailAddress: formData.emailAddress,
      phoneNumber: formData.phoneNumber,
      gradeId: gradeIds,
      subjects: subjectIds,
      password, // Add the generated password to the teacher data
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherData),
      });

      if (response.ok) {
        toast.success("Teacher data submitted successfully");
        setStep(1);
        setFormData({
          fullName: "",
          surname: "",
          idNumber: "",
          address: "",
          emailAddress: "",
          phoneNumber: "",
        });
        setGradeSubjectMap({});
      } else {
        const errorText = await response.text();
        console.error("Failed to submit teacher data:", errorText);
      }
    } catch (error) {
      console.error("Error submitting teacher data:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-10 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-primaryColor">
          Teachers Registration
        </h2>

        <div className="flex justify-between mb-6">
          <span
            className={`flex-1 ${
              step >= 1 ? "bg-blue-500" : "bg-gray-300"
            } h-2 mr-1 rounded`}
          />
          <span
            className={`flex-1 ${
              step >= 2 ? "bg-blue-500" : "bg-gray-300"
            } h-2 rounded`}
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
                type="text"
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
                  type="text"
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
                  value={selectedGradeId ?? ""}
                  onChange={(e) => setSelectedGradeId(Number(e.target.value))}
                  required
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
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold">Select Subjects</h3>
              <div className="flex flex-col max-h-40 overflow-y-auto border border-gray-300 rounded">
                {subjects.map((subject) => (
                  <label
                    key={subject.subjectId}
                    className="flex items-center p-2 hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSubjectIds.includes(subject.subjectId)}
                      onChange={() => toggleSubjectSelection(subject.subjectId)}
                      className="mr-2"
                    />
                    {subject.subject}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={addSubjectsToGrade}
                className="bg-blue-500 text-white px-8 py-2 text-center rounded text-lg"
              >
                Add Subjects to Grade
              </button>
            </div>

            <div>
              {Object.entries(gradeSubjectMap).map(([gradeId, subjectIds]) => (
                <div key={gradeId} className="mb-4">
                  <h4 className="font-semibold">
                    Grade:{" "}
                    {grades.find((g) => g.gradeId === Number(gradeId))?.grade}
                  </h4>
                  <ul className="list-disc pl-5">
                    {subjectIds.map((subjectId) => (
                      <li key={subjectId}>
                        {
                          subjects.find((s) => s.subjectId === subjectId)
                            ?.subject
                        }
                        <button
                          onClick={() =>
                            removeSubjectFromGrade(Number(gradeId), subjectId)
                          }
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="py-2 px-4 bg-gray-300 text-black rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded"
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
