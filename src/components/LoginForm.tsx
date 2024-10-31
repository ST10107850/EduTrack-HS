// LoginForm.tsx
import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { useAuthActions } from "../hooks/useAuthActions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm: React.FC = () => {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });
  const { handleLogin } = useAuthActions();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Check if credentials match admin credentials
      // if (
      //     values.email === "Admin12345@tshmologong.co.za" &&
      //     values.password === "@Tshimologong12345"
      // ) {
      //     console.log("You have logged in as admin");
      //     handleLogin(values.email, values.password, "admin"); // Pass role to handleLogin
      //     resetForm();
      //     navigate("/admin-dashboard");
      //     return;
      // }

      // Attempt login as parent or teacher
      const user = await handleLogin(values.email, values.password);
      resetForm();

      // Navigate based on user role
      if (user.role === "parent") {
        console.log("You have logged in as parent");
        navigate("/parent-dashboard", {
          state: {
            fullName: user.fullName,
            surname: user.surname,
            emailAddress: user.email,
            phoneNumber: user.phoneNumber,
            parentId: user.id
          },
        });
      } else if (user.role === "teacher") {
        console.log("Logging in as teacher with data:", user);
        const gradeIds =
          user.subjects?.flatMap((subject) => subject.gradeIds) || [];
        const teacherData = {
          fullName: user.fullName,
          surname: user.surname,
          emailAddress: user.email,
          phoneNumber: user.phoneNumber,
          teacherId: user.id,
          gradeId: gradeIds,
        };
        console.log("Extracted gradeIds:", gradeIds);
        navigate("/teachers-dashboard", { state: teacherData });
      } else if (user.role === "admin") {
        console.log("You have logged in as admin");
        navigate("/admin-dashboard", {
          state: { fullName: user.fullName, surname: user.surname },
        });
      } else {
        setError("Unknown role");
      }
    } catch (error) {
      console.error("Login error: ", error);
      toast.warning(error instanceof Error ? error.message : "Login failed");
    }
  };

  const isFormFilled = values.email && values.password;

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-primaryColor">
          Login
        </h2>
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
