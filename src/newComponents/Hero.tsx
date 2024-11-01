import React from 'react';

const Hero = () => {
  return (
    <div className='relative w-full h-screen flex items-center text-tertiaryColor'>
      {/* Blurred background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(/sch.jpg)`,
          filter: 'blur(3px)',
          zIndex: -1,
        }}
      ></div>
      {/* Overlay to darken the background for better text readability */}
      <div className="absolute inset-0 bg-backgroundColor bg-opacity-30 z-0"></div>
      {/* Content container */}
      <div className='relative bg-backgroundColor p-6 md:p-8 lg:p-10 mx-5 md:mx-20 rounded z-10 text-center'>
        <h2 className='text-lg md:text-xl font-roboto'>Welcome To</h2>
        <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-[111px] leading-none font-bowlby font-semibold'>
          Johannesburg <br /> Secondary <br /> School
        </h1>
      </div>
    </div>
  );
}

export default Hero;
