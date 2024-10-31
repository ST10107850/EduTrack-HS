// Profile.tsx
import React from "react";
import { useAuth } from "../context/AuthContext"; // Adjust the import path

const Profile: React.FC = () => {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    console.log("No data")
    return <div>Please log in to view your profile.</div>;
  }

  const user = state.user; // This should not be null if authenticated

  if (!user) {
    return <div>No user data available.</div>; // Handle this case
  }

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50 gap-4">
      <div className="p-8 max-w-lg w-full bg-white border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Basic Info</h2>
        <div className="flex items-center mb-4">
          <img
            src={user?.profilePicture || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4 border"
          />
          <label className="cursor-pointer text-blue-600 hover:underline">
            Edit Profile Picture
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{user?.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">ID Number:</span>
            <span>{user?.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Password:</span>
            <span>******</span> {/* Avoid displaying password */}
          </div>
        </div>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => console.log("Edit Basic Info clicked")}
        >
          Edit
        </button>
      </div>

      <div className="p-8 max-w-lg w-full bg-white border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Contact Info</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phone:</span>
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => console.log("Edit Contact Info clicked")}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Profile;
