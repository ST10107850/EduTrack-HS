import { useState, useEffect } from "react";
import data from "../data/data.json";
import {  useNavigate } from "react-router-dom";

export const ManageUsers = ({ userType }: { userType: string }) => {


  type User = { 
    id: string; 
    fullName: string; 
    phoneNumber: number; 
    emailAddress: string;
    address: string;
    password: string;
  };

  const [teachers, setTeachers] = useState<User[]>([]);
  const [learners, setLearners] = useState<User[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    id: '',
    fullName: '',
    phoneNumber: 0,
    emailAddress: '',
    address: '',
    password: '',
  });

  useEffect(() => {
    setLearners(data.learners);
    setTeachers(data.teachers);
  }, []);

  const displayedUsers = userType === "teachers" ? teachers : learners;
  const setUsers = userType === "teachers" ? setTeachers : setLearners;

  // const handleAddNew = () => {
  //   setIsAdding(true);
  //   setNewUser({ id: '', fullName: '', phoneNumber: 0, emailAddress: '', address: '', password: '' });
  // };


  const navigate = useNavigate();
  const handleAddNew = () => {
    if (userType === "teachers") {
      navigate("/new-teacher");
    } else if (userType === "learners") {
      navigate("/new-learner");
    }
  };

  const handleSaveNewUser = () => {
    const updatedUsers = [...displayedUsers, { ...newUser, id: Date.now().toString() }];
    if (userType === "teachers") {
      setTeachers(updatedUsers);
    } else {
      setLearners(updatedUsers);
    }
    setIsAdding(false);
  };

  const handleEditUser = (index: number) => {
    setEditingIndex(index);
  };

  const handleSaveEditUser = (index: number) => {
    const updatedUsers = [...displayedUsers];
    updatedUsers[index] = newUser;
    setUsers(updatedUsers);
    setEditingIndex(null);
  };

  const handleDeleteUser = (index: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = [...displayedUsers];
      updatedUsers.splice(index, 1);
      setUsers(updatedUsers);
    }
  };

  return (
    <div className="relative flex flex-col md:my-0 my-12 justify-center items-center md:h-[90vh] text-gray-800">
      <h1 className="text-5xl mx-7 md:mx-0 text-secondaryColor mb-16 font-bold">
        Showing Results For "{userType}"
      </h1>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-8 w-3/4">
        <div className="bg-primaryColor p-4 text-white rounded shadow">
          <h3 className="text-lg font-bold">Total Number Of Active Users</h3>
          <p className="text-2xl">100</p>
        </div>

        <div className="bg-[#A0D3E8] p-4 rounded shadow">
          <h3 className="text-lg font-bold">Total Number Of Teachers</h3>
          <p className="text-2xl">20</p>
        </div>

        <div className="bg-[#4A90E2] p-4 rounded shadow text-white">
          <h3 className="text-lg font-bold">Total Number Of Parents</h3>
          <p className="text-2xl">80</p>
        </div>
      </div>

      <div className="flex w-3/4 justify-end mb-4">
        <button onClick={handleAddNew}  className="bg-secondaryColor text-white rounded-md px-3 py-1">
          Add New
        </button>
      </div>

      <table className="table-auto border-collapse border border-gray-300 w-3/4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Full Names</th>
            <th className="border border-gray-300 px-4 py-2">Contacts</th>
            <th className="border border-gray-300 px-4 py-2">Emails</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={newUser.fullName}
                      onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      value={newUser.phoneNumber}
                      onChange={(e) => setNewUser({ ...newUser, phoneNumber: Number(e.target.value) })}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="email"
                      value={newUser.emailAddress}
                      onChange={(e) => setNewUser({ ...newUser, emailAddress: e.target.value })}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center">
                    <button className="text-green-500" onClick={() => handleSaveEditUser(index)}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border border-gray-300 px-4 py-2">{user.fullName}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.phoneNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.emailAddress}</td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center">
                    <a href="#" className="text-blue-500" onClick={() => handleEditUser(index)}>Edit</a>
                    <a href="#" className="text-red-500" onClick={() => handleDeleteUser(index)}>Delete</a>
                    <a href="#" className="text-[#A0D3E8]">View</a>
                  </td>
                </>
              )}
            </tr>
          ))}
          {isAdding && (
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  value={newUser.fullName}
                  onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={newUser.phoneNumber}
                  onChange={(e) => setNewUser({ ...newUser, phoneNumber: Number(e.target.value) })}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="email"
                  value={newUser.emailAddress}
                  onChange={(e) => setNewUser({ ...newUser, emailAddress: e.target.value })}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center">
                <button className="text-green-500" onClick={handleSaveNewUser}>Save</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
