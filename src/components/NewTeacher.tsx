import React, { useState, useEffect } from "react";
import data from "../data/data.json";
import { toast } from "react-toastify";
import { Grade, Subjects, teachers } from "../Types/types";
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

  // Change state to store multiple grades with subjects
  const [gradeSubjectMap, setGradeSubjectMap] = useState<{
    [key: number]: { subjectId: number; subject: string }[];
  }>({});
  const [selectedGrades, setSelectedGrades] = useState<number[]>([]);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<number[]>([]);
  const [existingTeachers, setExistingTeachers] = useState<teachers[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setExistingTeachers(data);
        } else {
          console.error("Failed to fetch teachers");
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, [apiUrl]);

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
    const selectedGradeId = selectedGrades[selectedGrades.length - 1]; // Get the last selected grade ID
    if (selectedGradeId !== null) {
      setGradeSubjectMap((prevMap) => {
        const updatedSubjects = prevMap[selectedGradeId] || [];
        const newSubjects = selectedSubjectIds
          .map((id) => {
            const subjectDetails = subjects.find((subject) => subject.subjectId === id);
            return { subjectId: id, subject: subjectDetails?.subject || "" };
          })
          .filter((subject) => !updatedSubjects.some((s) => s.subjectId === subject.subjectId));

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
        (subject) => subject.subjectId !== subjectId
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
    const emailDomainRegex = /@tshimologong\.co\.za$/;

    if (
      existingTeachers.some((teacher) => teacher.idNumber === formData.idNumber)
    ) {
      toast.error("ID Number already exists.");
      return false;
    }

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

    const subjectsToSave = Object.entries(gradeSubjectMap).flatMap(
      ([gradeId, subjectList]) => {
        return subjectList.map((subject) => {
          return {
            subjectId: subject.subjectId.toString(),
            subject: subject.subject,
            gradeIds: [Number(gradeId)],
          };
        });
      }
    );

    const password = generateRandomPassword();

    const teacherData = {
      id: Date.now(),
      fullName: formData.fullName,
      surname: formData.surname,
      idNumber: formData.idNumber,
      address: formData.address,
      emailAddress: formData.emailAddress,
      phoneNumber: formData.phoneNumber,
      password,
      subjects: subjectsToSave,
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
        setSelectedGrades([]); // Clear selected grades
      } else {
        const errorText = await response.text();
        console.error("Failed to submit teacher data:", errorText);
      }
    } catch (error) {
      console.error("Error submitting teacher data:", error);
    }
  };

  const handleGradeSelection = (gradeId: number) => {
    setSelectedGrades((prevGrades) => {
      if (prevGrades.includes(gradeId)) {
        return prevGrades; // Prevent adding the same grade
      }
      return [...prevGrades, gradeId];
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-primaryColor">
          Teacher Registration
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
                  placeholder="Phone Number"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
                />
              </div>
            </div>
            <button
              onClick={handleNextStep}
              className="bg-primaryColor text-white px-4 py-2 rounded mt-4"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-4">
              <select
                onChange={(e) => handleGradeSelection(Number(e.target.value))}
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor w-full"
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade.gradeId} value={grade.gradeId}>
                    {grade.grade}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Select Subjects:</h3>
              {subjects.map((subject) => (
                <div key={subject.subjectId} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`subject-${subject.subjectId}`}
                    checked={selectedSubjectIds.includes(subject.subjectId)}
                    onChange={() => toggleSubjectSelection(subject.subjectId)}
                  />
                  <label htmlFor={`subject-${subject.subjectId}`} className="ml-2">
                    {subject.subject}
                  </label>
                </div>
              ))}
            </div>
            <button
              onClick={addSubjectsToGrade}
              className="bg-primaryColor text-white px-4 py-2 rounded mt-4"
            >
              Add Subjects
            </button>
            <div className="mt-4 p-4 border border-gray-300 rounded">
              <h3 className="text-lg font-semibold">Selected Grades and Subjects:</h3>
              {selectedGrades.map((gradeId) => (
                <div key={gradeId}>
                  <p className="font-bold">
                    Grade: {grades.find((grade) => grade.gradeId === gradeId)?.grade}
                  </p>
                  <p>Subjects:</p>
                  <ul>
                    {gradeSubjectMap[gradeId]?.map(({ subjectId, subject }) => (
                      <li key={subjectId} className="flex justify-between">
                        {subject} (ID: {subjectId})
                        <button
                          onClick={() => removeSubjectFromGrade(gradeId, subjectId)}
                          className="text-red-500 ml-4"
                        >
                          Remove
                        </button>
                      </li>
                    )) || <li>No subjects added.</li>}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevStep}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-primaryColor text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
