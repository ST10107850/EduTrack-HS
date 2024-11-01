import { FaUniversity } from 'react-icons/fa';
import { BsBook, BsPersonLinesFill } from 'react-icons/bs';
import { GiGraduateCap } from 'react-icons/gi';

const About = () => {
  return (
    <div className="w-full mt-20  rounded-3xl flex flex-col items-center bg-white py-12 px-20">
      {/* Main Title and Description */}
      <div className="text-left mb-16 w-full">
        <h1 className="text-8xl font-bowlby-sc font-bold mb-4">Enjoy Studying at Johannesburg Secondary School</h1>
        <p className="text-2xl text-black font-roboto ">
          Our school offers a diverse range of academic programs in a variety of languages, providing an ideal environment for learning and personal development. Join us to grow academically, socially, and culturally.
        </p>
      </div>

      {/* Cross Layout */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Vertical and Horizontal Lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-b border-gray-300 w-full"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-r border-gray-300 h-full"></div>
        </div>

        {/* Top Section (Our Mission) */}
        <div className="flex flex-col items-start p-6 space-y-4">
          <GiGraduateCap className="text-orange-500" size={50} />
          <h2 className="font-bold text-3xl">Our Mission</h2>
          <p className=" text-base text-black">
            Our mission is to provide a nurturing and inclusive environment where students are encouraged to excel academically, grow socially, and develop lifelong values of curiosity, integrity, and respect.
          </p>
        </div>

        {/* Right Section (Our Vision) */}
        <div className="flex flex-col items-start p-6 space-y-4">
          <FaUniversity className="text-orange-500" size={50} />
          <h2 className="font-bold text-3xl">Our Vision</h2>
          <p className=" text-base text-black">
            To inspire and empower every student to reach their full potential, cultivating compassionate, innovative leaders who make a positive impact in a global society.
          </p>
        </div>

        {/* Left Section (Our Goal) */}
        <div className="flex flex-col items-start p-6 space-y-4">
          <BsBook className="text-orange-500" size={50} />
          <h2 className="font-bold text-3xl">Our Goal</h2>
          <p className=" text-base text-black">
            Our goal is to provide an enriching, well-rounded education that promotes academic excellence, personal growth, and social responsibility. We aim to cultivate critical thinking, creativity, and resilience in our students, ensuring they are well-prepared for lifelong learning and success.
          </p>
        </div>

        {/* Bottom Section (Why Us) */}
        <div className="flex flex-col items-start p-6 space-y-4">
          <BsPersonLinesFill className="text-orange-500" size={50} />
          <h2 className="font-bold text-3xl">Why Us</h2>
          <p className=" text-base text-black">
            Choosing our school means joining a community that prioritizes individual growth, academic achievement, and ethical values. We stand out through our commitment to personalized learning, a highly qualified and passionate teaching staff, and an environment that celebrates diversity and inclusion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
