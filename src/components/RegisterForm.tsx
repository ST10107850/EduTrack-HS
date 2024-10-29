import React, { useState } from "react"; // Import useState to manage local state for errors
import { useForm } from "../hooks/useForm";
import { useAuthActions } from "../hooks/useAuthActions";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import { toast } from "react-toastify";

const RegisterForm: React.FC = () => {
  const { values, handleChange, resetForm } = useForm({
    fullName: "",
    emailAddress: "", // Update to match input field
    password: "",
    surname: "",
    idNumber: "",
    address: "",
    phoneNumber: "",
    learnerID: "",
    confirmPassword: "" // Added learner ID field
  });

  const { handleRegister } = useAuthActions();
  const navigate = useNavigate(); // Initialize useNavigate
  const [error, setError] = useState<string | null>(null); // State to store error messages

  // Submit handler for registration
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (values.password !== values.confirmPassword) {
        toast.warn("Passwords do not match");
        return;
    }

    try {
        await handleRegister(values); // Register the user
        resetForm(); 
        toast.success("Registered successfully")// Reset the form fields
        navigate("/login"); // Navigate to login page upon successful registration
    } catch (error) {
        toast.error(error instanceof Error ? error.message : "Registration failed"); // Show the error if registration fails
    }
};


  // Check if all fields are filled
  const isFormFilled =
    values.fullName &&
    values.emailAddress &&
    values.password &&
    values.surname &&
    values.idNumber &&
    values.address &&
    values.phoneNumber &&
    values.learnerID; // Ensure learnerID is also checked

  return (
    <div className="flex items-center justify-center h-auto bg-white">
      {/* Change background to white */}
      <form onSubmit={onSubmit} className="bg-white my-5 p-8 rounded shadow-md max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-4 text-primaryColor">Register</h2>

        {/* Display error message if there is an error */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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
              type="password" // Use password type for secure input
              value={values.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
            />
          </div>
          <div className="mb-4">
            <input
              name="confirmPassword" // Add confirm password field
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChange={handleChange}
              type="password" // Use password type for secure input
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormFilled} // Disable the button if not all fields are filled
          className={`w-full py-2 rounded transition duration-200 ${
            isFormFilled ? "bg-[#060721] text-white hover:bg-gray-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
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
