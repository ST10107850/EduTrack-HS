import React from 'react';

const StatusCards: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white shadow-md p-6 text-center">
        <h3 className="text-xl font-semibold">Tokens Status</h3>
        <p className="text-4xl text-orangePrimary">50</p>
        <p>Used Tokens</p>
        <p className="text-4xl text-orangePrimary">202</p>
        <p>Available Tokens</p>
      </div>
      <div className="bg-white shadow-md p-6 text-center">
        <h3 className="text-xl font-semibold">Your Subscription</h3>
        <p>Current Plan: Lovely Pet</p>
        <p>Next Payment: 12/2024</p>
        <button className="mt-4 bg-orangePrimary text-white px-4 py-2 rounded">Upgrade plan</button>
      </div>
    </div>
  );
};

export default StatusCards;
