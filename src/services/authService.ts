
// Define a User interface for type safety
export interface User {
    id?: number;
    subjects: Array<{
      subjectId: string;
      subject: string;
      gradeIds: number[];
    }>;
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


// Define the URLs for parents and teachers
const PARENTS_API_URL = '/api/parents';
const TEACHERS_API_URL = '/api/teachers';
const ADMIN_API_URL = '/api/admin'

// Function to log in an existing user
export const loginUser = async (email: string, password: string): Promise<User & { role: string }> => {
    // Check if user exists in parents API
    let response = await fetch(`${PARENTS_API_URL}?email=${email}&password=${password}`);

    if (response.ok) {
        const users = await response.json();
        if (users.length > 0) return { ...users[0], role: 'parent' };
    }

    // If not found in parents, check teachers API
    response = await fetch(`${TEACHERS_API_URL}?email=${email}&password=${password}`);
    
    if (response.ok) {
        const users = await response.json();
        if (users.length > 0) return { ...users[0], role: 'teacher' };
    }

    response = await fetch(`${ADMIN_API_URL}?email=${email}&password=${password}`);
    
    if (response.ok) {
        const users = await response.json();
        if (users.length > 0) return { ...users[0], role: 'admin' };
    }

    // If not found in either parents or teachers, throw an error
    throw new Error("Invalid credentials");
};






