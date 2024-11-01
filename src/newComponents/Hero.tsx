import React from 'react';

const Hero = () => {
  return (
    <div className='w-full h-screen px-20 text-tertiaryColor relative flex items-end'>
      {/* Position the text container at the bottom-left with flex and padding */}
      <div className='w-1/3 mb-10'>
        <h2 className='text-xl font-roboto'>Welcome To</h2>
        <h1 className='text-[111px] leading-none font-bowlby font-semibold'>Johannesburg Secondary School</h1>
      </div>
    </div>
  );
}

export default Hero;
