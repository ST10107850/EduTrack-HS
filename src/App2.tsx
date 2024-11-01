import React from 'react';
import Navbar3 from './newComponents/Navbar3';
import Hero from './newComponents/Hero';
import About2 from './newComponents/About2';
import Section2 from './newComponents/MeetOurStaff';
import Section3 from './newComponents/Section3';
import MeetOurStaff from './newComponents/MeetOurStaff';
import DashboardLayout from './Layout/DashboardLayout';

const App2: React.FC = () => {
  return (
    <>
      {/* <Navbar3 />
      <div className="w-full h-screen overflow-y-scroll">
        <ul id="cards" className="list-none p-0 grid grid-cols-1 gap-4">
          <li id="card1" className="card w-full">
            <div className="card-body sticky top-0 w-full rounded-2xl shadow-lg flex items-center justify-center min-h-screen">
              <Hero />
            </div>
          </li>
          <li id="card2" className="card w-full">
            <div className="card-body sticky top-0 w-full rounded-2xl shadow-lg flex items-center justify-center h-[150vh] bg-gray-400">
              <About2 />
            </div>
          </li>
          <li id="card3" className="card w-full">
            <div className="card-body sticky top-0 w-full rounded-2xl shadow-lg flex items-center justify-center min-h-screen ">
              <MeetOurStaff />
            </div>
          </li>
          <li id="card4" className="card w-full">
            <div className="card-body sticky top-0 w-full rounded-2xl shadow-lg flex items-center justify-center min-h-screen bg-pink-300">
              <Section3 />
            </div>
          </li>
        </ul>
      </div> */}



      <DashboardLayout />
    </>
  );
}

export default App2;
