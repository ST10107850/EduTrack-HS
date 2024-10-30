import React from "react"; 
import { useForm } from "../hooks/useForm";
import { useAuthActions } from "../hooks/useAuthActions";
import { Link, useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import learnersData from "../data/data.json"; // Adjust the path to your JSON file

const RegisterForm: React.FC = () => {
  const { values, handleChange, resetForm } = useForm({
    fullName: "",
    emailAddress: "",
    password: "",
    surname: "",
    idNumber: "",
    address: "",
    phoneNumber: "",
    learnerID: "",
    confirmPassword: "",
  });

  const { handleRegister } = useAuthActions();
  const navigate = useNavigate(); 

  // Check if the provided idNumber is valid
  const isIdNumberValid = (idNumber: string) => {
    return learnersData.learners.some(learner => learner.idNumber === idNumber);
  };

  // Check if the provided learnerID is valid against the JSON data
  const isLearnerIDValid = (learnerID: string) => {
    return learnersData.learners.some(learner => learner.idNumber === learnerID);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (values.password !== values.confirmPassword) {
      toast.warn("Passwords do not match");
      return;
    }

    // Validate learnerID
    if (!isLearnerIDValid(values.learnerID)) {
      toast.error("Learner ID not found in the database");
      console.log("Invalid learner ID");
      return; // Stop the submission if learnerID is invalid
    }

    // Validate idNumber
    if (!isIdNumberValid(values.idNumber)) {
      toast.error("ID Number not found in learners");
      return; // Stop the submission if idNumber is invalid
    }

    try {
      await handleRegister(values); 
      resetForm();
      toast.success("Registered successfully");
      navigate("/login"); 
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
    }
  };

  const isFormFilled =
    values.fullName &&
    values.emailAddress &&
    values.password &&
    values.surname &&
    values.idNumber &&
    values.address &&
    values.phoneNumber &&
    values.learnerID;

  return (
    <div className="flex items-center w-full justify-center h-screen bg-white">
      <form
        onSubmit={onSubmit}
        className="bg-white my-5 p-8 rounded shadow-md max-w-5xl"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-primaryColor">
          Register
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            name="fullName"
            placeholder="Full Names"
            value={values.fullName}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
          />
          <input
            name="surname"
            placeholder="Surname"
            value={values.surname}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
          />
        </div>

        <div className="mb-4">
          <input
            name="idNumber"
            type="text"
            placeholder="ID Number"
            value={values.idNumber}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
          />
        </div>

        <div className="mb-4">
          <input
            name="address"
            placeholder="Home Address"
            value={values.address}
            onChange={handleChange}
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
              value={values.emailAddress}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
            />
          </div>
          <div className="mb-4">
            <input
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
              value={values.phoneNumber}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
            />
          </div>
        </div>

        <div className="mb-4">
          <input
            name="learnerID"
            placeholder="Learner ID Number"
            value={values.learnerID}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="mb-4">
            <input
              name="password"
              placeholder="Create Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
            />
          </div>
          <div className="mb-4">
            <input
              name="confirmPassword"
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChange={handleChange}
              type="password"
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormFilled}
          className={`w-full py-2 rounded transition duration-200 ${
            isFormFilled
              ? "bg-[#060721] text-white hover:bg-gray-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Signup
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-secondaryColor underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
