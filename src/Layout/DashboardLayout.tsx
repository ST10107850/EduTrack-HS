import React from 'react';
import Sidebar2 from '../newComponents/dashboardComponents/Sidebar2';
import Greeting from '../newComponents/dashboardComponents/Greeting';
import HistoricTable from '../newComponents/dashboardComponents/HistoricTable';
import StatusCards from '../newComponents/dashboardComponents/StatusCards';

const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar2 />
      <main className="flex-1 bg-beigeLight p-8">
        <Greeting />
        <div className="grid grid-cols-3 gap-6">
          <HistoricTable />
          <StatusCards />
        </div>
      
      </main>
    </div>
  );
};

export default Dashboard;
