import React, { useEffect, useState } from 'react';

type UserData = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  profilePicture: string; // Add profilePicture type if necessary
};

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null); // State to hold user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/data.json'); // Adjust the endpoint as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: UserData = await response.json(); // Fetch data from JSON file
        setUserData(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching user data:', error); // Handle any errors
      }
    };

    fetchUserData(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once on mount

  // Return loading state or user data
  if (!userData) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50 gap-4">
      <div className="p-8 max-w-lg w-full bg-white border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Basic Info</h2>
        {/* Edit Profile Picture Section */}
        <div className="flex items-center mb-4">
          <img 
            src={userData.profilePicture} // Ensure this URL is correct
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4 border"
          />
          <label className="cursor-pointer text-blue-600 hover:underline">
            Edit Profile Picture
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>
        {/* User Information */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{userData.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">ID Number:</span>
            <span>{userData.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Password:</span>
            <span>{userData.password}</span>
          </div>
        </div>
        {/* Edit Button */}
        <button 
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => console.log("Edit Basic Info clicked")}
        >
          Edit
        </button>
      </div>

      <div className="p-8 max-w-lg w-full bg-white border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Contact Info</h2>
        
        {/* User Information */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{userData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phone:</span>
            <span>{userData.phoneNumber}</span>
          </div>
        </div>
        {/* Edit Button */}
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
