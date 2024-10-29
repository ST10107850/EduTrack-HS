
import React, { createContext, useReducer, useContext, ReactNode, ReactElement } from 'react';
import { User } from '../services/authService';

// Define the structure of the authentication state
interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    
}

// Define action types for the reducer
type AuthAction = 
    | { type: 'REGISTER' | 'LOGIN'; payload: User }
    | { type: 'LOGOUT' };

// Initialize the authentication state
const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

// Reducer function to handle state changes based on action types
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'REGISTER':
            return { ...state, isAuthenticated: true, user: action.payload };
        case 'LOGIN':
            // Set user and authentication status when logged in or registered
            return { ...state, isAuthenticated: true, user: action.payload };
        case 'LOGOUT':
            // Clear user and authentication status on logout
            return { ...state, isAuthenticated: false, user: null };
        default:
            return state;
    }
};

// Create a context to provide and consume authentication state
const AuthContext = createContext<{ state: AuthState; dispatch: React.Dispatch<AuthAction> } | undefined>(undefined);

// Provider component to wrap the application and provide authentication state
export const AuthProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

// Custom hook to use the authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
