
// Define a User interface for type safety
export interface User {
    id?: number;
    fullName: string;
    surname: string;
    email: string;
    password: string;
}

// API base URL for the JSON Server
const API_URL = '/api/parents';

// Function to register a new user
export const registerUser = async (userData: User): Promise<User> => {
    // Send a POST request to create a new user in the JSON Server
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    // Throw error if registration fails
    if (!response.ok) {
        const errorText = await response.text(); // Get the response body
        throw new Error(`Registration failed: ${errorText}`);
    }

    return response.json(); // Return the registered user
};


// Function to log in an existing user
export const loginUser = async (email: string, password: string): Promise<User> => {
    const response = await fetch(`${API_URL}?email=${email}&password=${password}`);

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Login error:', response.status, errorText);
        throw new Error("Failed to connect to the server. Status: " + response.status + ". Response: " + errorText);
    }

    const users = await response.json();
    if (users.length === 0) throw new Error("Invalid credentials");

    return users[0]; // Ensure this user object has the surname
};






