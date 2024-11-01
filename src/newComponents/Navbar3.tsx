import React from 'react'

const Navbar3 = () => {
  return (
    <div className='w-full px-20 py-5 flex fixed justify-between bg-transparent'>
          <div className="text-2xl font-bold text-primaryColor">
              <span className="inline">Edu</span>
              <span className="inline text-orange-500">Track</span>
              <span className="inline">HS</span>
          </div>


          <div className='text-base justify-between gap-5 font-light'>
            <a className='pr-10' href='#'> Sign In</a>
            <a href='#'> Create An Account</a>
          </div>

      
    </div>
  )
}

export default Navbar3
