import React, { useState } from 'react';

type User = {
  id: number;
  name: string;
  contact: string;
  email: string;
};

const usersData: User[] = [
  { id: 1, name: 'Alice Smith', contact: '123-456-7890', email: 'alice@example.com' },
  { id: 2, name: 'Bob Johnson', contact: '234-567-8901', email: 'bob@example.com' },
  { id: 3, name: 'Carol Williams', contact: '345-678-9012', email: 'carol@example.com' },
  // Add more users as needed
];

const UserTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(usersData.length / rowsPerPage);

  const paginatedUsers = usersData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="my-8 w-full bg-white rounded-lg shadow p-6">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Contact</th>
            <th className="py-2">Email</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id} className="border-b border-gray-200">
              <td className="py-3">{user.name}</td>
              <td className="py-3">{user.contact}</td>
              <td className="py-3">{user.email}</td>
              <td className="py-3">
                <button className="text-blue-500 hover:underline">View</button>
                <button className="text-blue-500 hover:underline ml-4">Edit</button>
                <button className="text-red-500 hover:underline ml-4">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-600 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-600 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
