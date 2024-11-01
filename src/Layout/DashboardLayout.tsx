import React from 'react';
import Sidebar2 from '../newComponents/dashboardComponents/Sidebar2';
import Greeting from '../newComponents/dashboardComponents/Greeting';
import HistoricTable from '../newComponents/dashboardComponents/HistoricTable';
import StatusCards from '../newComponents/dashboardComponents/StatusCards';
import { FaChevronDown } from 'react-icons/fa';
import { BiUser } from 'react-icons/bi';
import UserTable from '../newComponents/dashboardComponents/UserTable';

const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar2 title="EduTrackHS" />


      <main className="flex-1 py-10 text-tertiaryColor bg-beigeLight p-8">
        {/* <Greeting /> */}

        {/* Container for aligning button to the right */}
        <div className="flex justify-end mb-32">
          <button className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition">
            <BiUser />
            <span className="font-medium">Tshepo</span>
            <FaChevronDown />
          </button>
        </div>

        {/* Main dashboard content */}
        <div className="w-full font-medium flex justify-between">
          <div className="flex-col">
            <p className="mb-2">Your dashboard</p>
            <h1 className="text-7xl">HI, Tshepo</h1>
          </div>

          <p className="w-[40%]">
            Welcome to your dashboard! Here you can manage the users on the platform by adding new users, editing or deleting the records.
          </p>
        </div>


        <div className=" grid md:grid-cols-3 text-tertiaryColor grid-cols-1 gap-4 mt-8 mb-8 w-3/4">
        <div className=" p-4  rounded shadow">
          <h3 className="text-lg font-light">Total Number Of Active Users</h3>
          <p className="text-2xl">100</p>
        </div>
        <div className=" p-4 rounded shadow">
          <h3 className="text-lg font-light">Total Number Of Teachers</h3>
          <p className="text-2xl">20</p>
        </div>
        <div className="bg-transparent p-4 rounded shadow ">
          <h3 className="text-lg font-light">Total Number Of Parents</h3>
          <p className="text-2xl">80</p>
        </div>

       

        
      </div>


      <UserTable />
      


      </main>
    </div>
  );
};

export default Dashboard;
