import React from 'react';
import { GoGoal } from "react-icons/go";
import { FaEye, FaUser } from "react-icons/fa";
import { GiStairs } from "react-icons/gi";

const About: React.FC = () => {
  return (
    <section className="text-lg bg-blue-100 py-6 px-10">
      <h1 className="font-bold text-center text-3xl mb-8">About Us</h1>
      
      <div className="flex justify-between flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[50%] lg:w-2/3">
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg space-y-4">
            <GiStairs className="text-blue-600 bg-blue-200 p-2 rounded-full" size={30} />
            <h2 className="font-bold text-xl">Our Mission</h2>
            <p>Our mission is to provide a nurturing and inclusive environment where students are encouraged to excel academically, grow socially, and develop lifelong values of curiosity, integrity, and respect.</p>
          </div>
          
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg space-y-4">
            <FaEye className="text-blue-600 bg-blue-200 p-2 rounded-full" size={30} />
            <h2 className="font-bold text-xl">Vision Statement</h2>
            <p>To inspire and empower every student to reach their full potential, cultivating compassionate, innovative leaders who make a positive impact in a global society.</p>
          </div>

          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg space-y-4">
            <GoGoal className="text-blue-600 bg-blue-200 p-2 rounded-full" size={30} />
            <h2 className="font-bold text-xl">Our Goal</h2>
            <p>Our goal is to provide an enriching, well-rounded education that promotes academic excellence, personal growth, and social responsibility. We aim to cultivate critical thinking, creativity, and resilience in our students, ensuring they are well-prepared for lifelong learning and success.</p>
          </div>

          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg space-y-4">
            <FaUser className="text-blue-600 bg-blue-200 p-2 rounded-full" size={30} />
            <h2 className="font-bold text-xl">Why Us</h2>
            <p>Choosing our school means joining a community that prioritizes individual growth, academic achievement, and ethical values. We stand out through our commitment to personalized learning, a highly qualified and passionate teaching staff, and an environment that celebrates diversity and inclusion.</p>
          </div>
        </div>
        
        <div className="w-full lg:w-1/3">
          <img
            src='./12.jpg'
            alt="Our Culture"
            className="w-full h-[50vh] rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
