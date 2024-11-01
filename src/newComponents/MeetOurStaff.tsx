import React, { useRef } from "react";
import { IoChevronForwardCircle, IoChevronBackCircleSharp } from "react-icons/io5";

type Teacher = {
  src: string;
  alt: string;
  name: string;
  title: string;
  description: string;
};

const teacherArray: Teacher[] = [
  {
    src: '1.jpg',
    alt: 'Teacher 1',
    name: 'Alice Johnson',
    title: 'Mathematics Teacher',
    description: 'Alice inspires students to explore the beauty of mathematics. Her innovative teaching methods make learning engaging and fun.'
  },
  {
    src: '6.jpg',
    alt: 'Teacher 2',
    name: 'Michael Thompson',
    title: 'Science Teacher',
    description: 'Michael brings the wonders of science to life. His hands-on experiments spark curiosity and encourage critical thinking among students.'
  },
  {
    src: '3.jpg',
    alt: 'Teacher 3',
    name: 'Sarah Lee',
    title: 'English Teacher',
    description: 'With a passion for literature, Sarah helps students discover the power of words. Her creative lessons foster a love for reading and writing.'
  },
  {
    src: '8.jpg',
    alt: 'Teacher 4',
    name: 'James Carter',
    title: 'History Teacher',
    description: 'James brings history to life through storytelling and interactive lessons. He encourages students to understand the past and its impact on the present.'
  },
  {
    src: '7.jpg',
    alt: 'Teacher 5',
    name: 'Emily Davis',
    title: 'Art Teacher',
    description: 'Emily nurtures creativity and self-expression in her students. Her art classes provide a space for students to explore their artistic talents.'
  },
];

const MeetOurStaff: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (cardRef.current) {
      cardRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (cardRef.current) {
      cardRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className='w-full rounded-3xl px-10 h-[120vh] bg-black flex flex-col items-center'>
      <div className='justify-center mt-28'>
        <h1 className='text-9xl font-bold'>Meet Our Staff</h1>
        <p className='text-2xl gap-4 text-white leading-9 mt-7'>
          Each member of our staff brings a wealth of experience, passion, and a commitment to fostering a positive and engaging learning environment. They are here to inspire, support, and guide every student, making learning an enriching journey for all.
        </p>
      </div>

      <div className="flex items-center mt-10">
        <button onClick={scrollLeft} className="text-orange-400 hover:text-orange-700">
          <IoChevronBackCircleSharp size={32} />
        </button>

        <div ref={cardRef} className="flex overflow-x-auto space-x-6 scrollbar-hide px-4">
          {teacherArray.map((teacher, index) => (
            <div 
              key={index} 
              className="relative flex-none w-[400px] h-[413px] bg-cover bg-center rounded-lg shadow-lg" 
              style={{ backgroundImage: `url(${teacher.src})` }}
            >
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 rounded-lg p-4 w-full">
                <h2 className="text-3xl font-bold ">{teacher.name}</h2>
                <p className="text-white">{teacher.title}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={scrollRight} className="text-orange-400 hover:text-orange-700">
          <IoChevronForwardCircle size={32} />
        </button>
      </div>
    </div>
  );
};

export default MeetOurStaff;
