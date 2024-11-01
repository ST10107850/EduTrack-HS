import React from 'react';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

const Navbar3 = () => {
  return (
    <div className='w-full px-5 md:px-20 py-4 flex fixed justify-between bg-backgroundColor2 z-10'>
      <div className="text-xl md:text-2xl font-bold text-tertiaryColor">
        <span className="inline">Edu</span>
        <span className="inline text-orange-500">Track</span>
        <span className="inline">HS</span>
      </div>

      <div className='flex items-center space-x-4 md:space-x-5 font-light text-sm md:text-lg'>
        <div className='flex items-center space-x-2 text-tertiaryColor'>
          <CgProfile className='size-6' size={30} /> 

          <Link to='/login' className='pr-4 md:pr-10'>Sign In</Link>
          
          <Link to='/register'>
            <span className='bg-tertiaryColor p-2 rounded-full text-backgroundColor'>Create An Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar3;
