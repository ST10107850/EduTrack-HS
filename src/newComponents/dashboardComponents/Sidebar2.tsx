import React from 'react';

const Sidebar2: React.FC = () => {
  return (
    <div className="bg-beigeDark w-60 p-4 h-screen">
      <h1 className="text-2xl font-bold text-orangePrimary mb-6">PHOPET</h1>
      <div className="space-y-4">
        <h2 className="text-orangePrimary font-semibold">Actions</h2>
        <ul>
          {['New pet', 'Create image', 'Categories', 'New book'].map(action => (
            <li className="text-gray-700 py-2">{action}</li>
          ))}
        </ul>
        {/* Add other sections (Your Space, Admin) */}
      </div>
    </div>
  );
};

export default Sidebar2;
