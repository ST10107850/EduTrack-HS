// src/components/Card.tsx
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, date }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-gray-500 text-sm">{date}</p>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <a
          href="#"
          className="inline-block bg-primaryColor text-white py-2 px-4 rounded-md hover:bg-secondaryColor-dark transition"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default Card;
