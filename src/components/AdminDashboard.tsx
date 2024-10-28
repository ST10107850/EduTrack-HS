import React from 'react'
import { BiLogOut, BiSolidDashboard, BiSolidNotification, BiSolidUser } from 'react-icons/bi'

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="h-[95vh] w-64 bg-gray-900 text-white flex flex-col gap-10 justify-between px-4 py-6">
        {/* Logo */}
        {/* <div className="flex items-center space-x-2 px-4 py-4">
          <div className="bg-indigo-600 p-2 rounded-full">
  
            <img src="/path/to/logo.svg" alt="Logo" className="h-6 w-6" />
          </div>
          <h1 className="text-lg font-bold">COURSECONNECT</h1>
        </div> */}

        {/* Menu items */}
        <div className="flex flex-col gap-80 space-y-6">
          <div className="px-4 py-2 flex items-center space-x-2 ">
            {/* <span className="material-icons">dashboard</span> */}
            <BiSolidDashboard />
            <h1 className='uppercase text-lg font-bold'>Dashboard</h1>
          </div>


    

          
          <div className="px-4 py-2 flex flex-col items-center gap-5">

          <div className="px-4 py-2 flex items-center space-x-2">
           <BiSolidUser />
            <h2 className='uppercase text-base font-bold'>Manage Users</h2>
          </div>

            <button className='border w-full p-2 hover:bg-white hover:text-black'>Teachers</button>
            <button className='border w-full p-2 hover:bg-white hover:text-black'>Learners</button>
            
          </div>



          {/* <div className="px-4 py-2 flex items-center space-x-2 ">
          
          </div> */}

          {/* <div className="px-4 py-2 flex items-center space-x-2">
           <BiSolidNotification />
            <h2 className='uppercase text-xl font-bold'>Notifications</h2>
          </div> */}

    
        </div>


        {/* Logout */}
        {/* <div className="flex items-center space-x-2 px-4 py-4 mt-6 border-t border-gray-700 hover:bg-gray-800 rounded">
        <BiLogOut />
          <span>Log Out</span>
        </div> */}
      </div>

      {/* Main content placeholder */}
      <div className="flex-1 p-8 bg-gray-100">
        {/* Content goes here */}
      </div>
    </div>
  )
}

export default AdminDashboard
