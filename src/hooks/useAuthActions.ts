import { useAuth } from '../context/AuthContext';
import { loginUser, registerUser, User } from '../services/authService';

// Hook to handle authentication actions
export const useAuthActions = () => {
    const { dispatch } = useAuth();

    // Handle user registration
    const handleRegister = async (userData: User) => {
        try {
            const newUser = await registerUser(userData); // Call the register service
            dispatch({ type: 'REGISTER', payload: newUser }); // Dispatch the register action
        } catch (error) {
            console.error("Registration failed:", error); // Log any errors
            throw error;
        }
    };

    // Handle user login
    const handleLogin = async (email: string, password: string) => {
        try {
            const user = await loginUser(email, password); // Call the login service
            dispatch({ type: 'LOGIN', payload: user }); // Dispatch the login action
        } catch (error) {
            console.error("Login failed:", error); // Log any errors
            throw error; // Propagate the error to the form
        }
    };

    return { handleRegister, handleLogin };
};
