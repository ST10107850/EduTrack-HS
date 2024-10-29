import React, { useState } from "react"; // Import useState to manage local state for errors
import { useForm } from "../hooks/useForm";
import { useAuthActions } from "../hooks/useAuthActions";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import { toast } from "react-toastify";

const LoginForm: React.FC = () => {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });
  const { handleLogin } = useAuthActions();
  const navigate = useNavigate(); // Initialize useNavigate
  const [error, setError] = useState<string | null>(null); // State to store error messages

  // Submit handler for login
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const user = await handleLogin(values.email, values.password); // Log in the user
      resetForm(); // Reset the form fields
      // Pass both full name and surname to the dashboard
      navigate("/parent-dashboard", {
        state: { fullName: user.fullName, surname: user.surname },
      });
    } catch (error) {
      console.error("Login error: ", error); // Log the error for debugging
      toast.warning(error instanceof Error ? error.message : "Login failed"); // Show the error if login fails
    }
  };
  const isFormFilled = values.email && values.password;

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {" "}
      {/* Change background to white */}
      <form onSubmit={onSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-primaryColor">
          Login
        </h2>

        {/* Display error message if there is an error */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
          />
        </div>
        <div className="mb-4">
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
          />
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
          Sign in
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-secondaryColor underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
