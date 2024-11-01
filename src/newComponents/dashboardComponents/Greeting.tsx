import React from 'react';

const Greeting: React.FC = () => {
  return (
    <div className="w-full font-medium flex justify-between">
    <div className="flex-col">
      <p className="mb-2">Your dashboard</p>
      <h1 className="text-7xl">HI, Tshepo</h1>
    </div>

    <p className="w-[40%]">
      Welcome to your dashboard! Here you can manage the users on the platform by adding new users, editing or deleting the records.
    </p>
  </div>
  );
};

export default Greeting;
