import React from 'react';

const HistoricTable: React.FC = () => {
  return (
    <div className="bg-white shadow-md p-6">
      <h3 className="text-xl font-semibold">Historic</h3>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th>Concept</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {Array(5).fill(0).map((_, i) => (
            <tr key={i} className="border-t">
              <td>Create model</td>
              <td>13/08/2024</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoricTable;
