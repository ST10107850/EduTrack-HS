import { useState, useEffect } from "react";
import data from "../data/data.json";
import { Link, useNavigate } from "react-router-dom";

export const ManageUsers = ({ userType }) => {
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
    id: "",
    fullName: "",
    phoneNumber: 0,
    emailAddress: "",
    address: "",
    password: "",
  });

  const totalLearners = data.learners ? data.learners.length : 0;
  const totalTeachers = data.teachers ? data.teachers.length : 0;
  const totalParents = data.parents ? data.parents.length : 0;

  console.log(totalLearners, totalParents, totalTeachers);
  

  useEffect(() => {
    setLearners(data.learners);
    setTeachers(data.teachers);
  }, []);

  const displayedUsers = userType === "teachers" ? teachers : learners;
  const setUsers = userType === "teachers" ? setTeachers : setLearners;

  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate(userType === "teachers" ? "/new-teacher" : "/new-learner");
  };

  const handleSaveNewUser = () => {
    const updatedUsers = [
      ...displayedUsers,
      { ...newUser, id: Date.now().toString() },
    ];
    setUsers(updatedUsers);
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

  const handleViewUser = (userId: number) => {
    navigate(`/view-user/${userId.toString()}`);
  };

  return (
    <div className="relative flex flex-col justify-center items-center text-gray-800">
      <h1 className="text-5xl text-secondaryColor mb-16 font-bold">
        Showing Results For "{userType}"
      </h1>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-8 w-3/4">
        <div className="bg-primaryColor p-4 text-white rounded shadow">
          <h3 className="text-lg font-bold">Total Number Of Learners</h3>
          <p className="text-2xl">{totalLearners}</p>
        </div>
        <div className="bg-[#A0D3E8] p-4 rounded shadow">
          <h3 className="text-lg font-bold">Total Number Of Teachers</h3>
          <p className="text-2xl">{totalTeachers}</p>
        </div>
        <div className="bg-[#4A90E2] p-4 rounded shadow text-white">
          <h3 className="text-lg font-bold">Total Number Of Parents</h3>
          <p className="text-2xl">{totalParents}</p>
        </div>
      </div>

      <div className="flex w-3/4 justify-end mb-4">
        <Link
          to={userType === "teachers" ? "/new-teacher" : "/new-learner"}
          className="bg-secondaryColor text-white rounded-md px-3 py-1"
        >
          Add New
        </Link>
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
                      onChange={(e) =>
                        setNewUser({ ...newUser, fullName: e.target.value })
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      value={newUser.phoneNumber}
                      onChange={(e) =>
                        setNewUser({
                          ...newUser,
                          phoneNumber: Number(e.target.value),
                        })
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="email"
                      value={newUser.emailAddress}
                      onChange={(e) =>
                        setNewUser({ ...newUser, emailAddress: e.target.value })
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center">
                    <button
                      className="text-green-500"
                      onClick={() => handleSaveEditUser(index)}
                    >
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.fullName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.phoneNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.emailAddress}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center">
                    <a
                      href="#"
                      className="text-blue-500"
                      onClick={() => handleEditUser(index)}
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="text-red-500"
                      onClick={() => handleDeleteUser(index)}
                    >
                      Delete
                    </a>
                    <a
                      href="#"
                      className="text-[#A0D3E8]"
                      onClick={() => handleViewUser(user.id)}
                    >
                      View
                    </a>
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
                  onChange={(e) =>
                    setNewUser({ ...newUser, fullName: e.target.value })
                  }
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={newUser.phoneNumber}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      phoneNumber: Number(e.target.value),
                    })
                  }
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="email"
                  value={newUser.emailAddress}
                  onChange={(e) =>
                    setNewUser({ ...newUser, emailAddress: e.target.value })
                  }
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center">
                <button className="text-green-500" onClick={handleSaveNewUser}>
                  Save
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
