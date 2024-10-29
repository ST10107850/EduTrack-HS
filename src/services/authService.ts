
// Define a User interface for type safety
export interface User {
    id?: number;
    fullName: string;
    email: string;
    password: string;
}

// API base URL for the JSON Server
const API_URL = 'http://localhost:8000/parents';

// Function to register a new user
export const registerUser = async (userData: User): Promise<User> => {

    // Send a POST request to create a new user in the JSON Server
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    // Throw error if registration fails
    if (!response.ok) throw new Error("Registration failed");
    return response.json(); // Return the registered user
};

// Function to log in an existing user
export const loginUser = async (email: string, password: string): Promise<User> => {
    // Send a GET request to verify the user's credentials
    const response = await fetch(`${API_URL}?email=${email}&password=${password}`);
    const users = await response.json();
    
    // Check if the credentials are valid
    if (users.length === 0) throw new Error("Invalid credentials");
    
    return users[0]; // Return the user if found
};



