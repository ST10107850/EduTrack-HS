// src/context/AuthContext.tsx
import React, { createContext, useContext, useReducer } from "react";

interface User {
  profilePicture: string;
  fullName: string;
  id: string;
  email: string;
  phoneNumber: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null; // Add user to the state
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null, // Initialize user as null
};
type AuthAction = { type: "LOGIN" } | { type: "LOGOUT" };

const AuthContext = createContext<any>(null);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
