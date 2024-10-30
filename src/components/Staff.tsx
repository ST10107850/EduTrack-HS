import React, { useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaQuoteLeft } from "react-icons/fa";
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

const Staff: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = React.useRef<Slider>(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        beforeChange: (oldIndex: number, newIndex: number) => setCurrentSlide(newIndex),
    };

    const handleNext = () => {
        sliderRef.current?.slickNext();
    };

    const handlePrev = () => {
        sliderRef.current?.slickPrev();
    };

    return (
        <section className="bg-blue-50 py-12 px-8 md:px-20">
            <h1 className="text-center text-4xl font-bold text-blue-800 mb-10">Hear From Our Teachers</h1>
            <div className="flex flex-col md:flex-row items-center md:space-x-12 space-y-8 md:space-y-0">
                <div className="w-full md:w-1/2">
                    <Slider ref={sliderRef} {...settings}>
                        {teacherArray.map((teacher, index) => (
                            <div key={index} className="flex items-center justify-center">
                                <img
                                    src={teacher.src}
                                    alt={teacher.alt}
                                    className="w-[80%] h-auto object-cover rounded-lg shadow-lg"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="w-full md:w-1/2 p-4 text-center md:text-left bg-white rounded-lg shadow-lg px-6 py-8">
                    <FaQuoteLeft className="text-3xl text-blue-500 mb-4" />
                    <p className="text-lg italic font-medium text-gray-700 mb-6">
                        "{teacherArray[currentSlide].description}"
                    </p>
                    <p className="text-md font-semibold text-gray-800 mt-2">{teacherArray[currentSlide].name}</p>
                    <p className="text-sm font-medium text-gray-500">{teacherArray[currentSlide].title}</p>
                    
                    <div className="flex justify-center md:justify-start space-x-4 mt-6">
                        <button onClick={handlePrev} className="text-blue-500 hover:text-blue-700">
                            <IoChevronBackCircleSharp size={32} />
                        </button>
                        <button onClick={handleNext} className="text-blue-500 hover:text-blue-700">
                            <IoChevronForwardCircle size={32} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Staff;
