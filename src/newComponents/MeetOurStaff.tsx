import React, { useRef, useEffect } from "react";
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
  const slideWidth = 1600; // Width for 4 images (400px * 4)

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 3000);
    return () => clearInterval(interval); // Clear on component unmount
  }, []);

  const scrollLeft = () => {
    if (cardRef.current) {
      // Scroll left by slide width
      cardRef.current.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (cardRef.current) {
      // Scroll right by slide width
      cardRef.current.scrollBy({ left: slideWidth, behavior: 'smooth' });

      // Infinite scrolling
      const maxScrollLeft = cardRef.current.scrollWidth - cardRef.current.clientWidth;
      if (cardRef.current.scrollLeft + slideWidth >= maxScrollLeft) {
        setTimeout(() => {
          cardRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }, 300);
      }
    }
  };

  return (
    <div className='w-full rounded-3xl px-4 mt-10 md:px-10 bg-backgroundColor flex flex-col items-center justify-center space-y-10 py-10'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-5xl md:text-9xl font-bold'>Meet Our Staff</h1>
        <p className='text-lg md:text-2xl gap-4 text-tertiaryColor leading-9 mt-7 w-full md:w-[50%] text-center'>
          Each member of our staff brings a wealth of experience, passion, and a commitment to fostering a positive and engaging learning environment. They are here to inspire, support, and guide every student, making learning an enriching journey for all.
        </p>
      </div>
  
      <div className="flex items-center flex-wrap">
        <button onClick={scrollLeft} className="hover:text-orange-700">
          <IoChevronBackCircleSharp size={32} />
        </button>
  
        <div ref={cardRef} className="flex overflow-x-auto space-x-6 scrollbar-hide px-4 w-full max-w-screen-xl">
          {[...teacherArray, ...teacherArray.slice(0, 4)].map((teacher, index) => (
            <div 
              key={index} 
              className="relative flex-none w-[400px] h-[413px] bg-cover bg-center rounded-lg shadow-lg" 
              style={{ backgroundImage: `url(${teacher.src})` }}
            >
              <div className="absolute bottom-0 left-0 bg-backgroundColor2 rounded-lg p-4 w-full">
                <h2 className="text-3xl font-bold">{teacher.name}</h2>
                <p className="text-tertiaryColor">{teacher.title}</p>
              </div>
            </div>
          ))}
        </div>
  
        <button onClick={scrollRight} className="hover:text-orange-700">
          <IoChevronForwardCircle size={32} />
        </button>
      </div>
    </div>
  );
  
};

export default MeetOurStaff;
