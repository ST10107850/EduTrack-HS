// ViewResults.tsx
import React from "react";
import { useParams } from "react-router-dom";
import data from "../data/data.json";

export const ViewResults = () => {
  const { id } = useParams(); // Retrieve the ID from the URL parameters
  console.log("Retrieved ID from URL:", id); 

  // Check if id is valid and find the user in the teachers data
  const user = data.teachers.find((u) => String(u.id) === id);
  console.log("User found:", user); // Debugging output

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">User Details</h1>
      <p><strong>Full Name:</strong> {user.fullName}</p>
      <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
      <p><strong>Email Address:</strong> {user.emailAddress}</p>
      <p><strong>Address:</strong> {user.address || "N/A"}</p>
    </div>
  );
};
