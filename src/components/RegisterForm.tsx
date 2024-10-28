import React, { useState } from 'react'; // Import useState to manage local state for errors
import { useForm } from '../hooks/useForm';
import { useAuthActions } from '../hooks/useAuthActions';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation

const RegisterForm: React.FC = () => {
    const { values, handleChange, resetForm } = useForm({ fullName: '', email: '', password: '' });
    const { handleRegister } = useAuthActions();
    const navigate = useNavigate(); // Initialize useNavigate
    const [error, setError] = useState<string | null>(null); // State to store error messages

    // Submit handler for registration
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await handleRegister(values); // Register the user
            resetForm(); // Reset the form fields
            navigate('/login'); // Navigate to login page upon successful registration
        } catch (error) {
            // Capture and set the error message
            setError(error instanceof Error ? error.message : "Registration failed"); // Show the error if registration fails
        }
    };

    // Check if all fields are filled
    const isFormFilled = values.fullName && values.email && values.password;

    return (
        <div className="flex items-center justify-center min-h-screen bg-white"> {/* Change background to white */}
            <form onSubmit={onSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4 text-primaryColor">Register</h2>
                
                {/* Display error message if there is an error */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="mb-4">
                    <input 
                        name="fullName" 
                        value={values.fullName} 
                        onChange={handleChange} 
                        placeholder="Full Names" 
                        required 
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-secondaryColor"
                    />
                </div>
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
                    disabled={!isFormFilled} // Disable the button if not all fields are filled
                    className={`w-full py-2 rounded transition duration-200 ${isFormFilled ? "bg-[#060721] text-white hover:bg-gray-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                >
                    Signup
                </button>
                <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-secondaryColor underline">
                        Login here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;