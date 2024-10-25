import { useEffect, useState, useRef } from "react";

interface Article {
  title: string;
  description: string;
  date: string;
  image: string | null;
  schoolName: string;
}

export const Newsletter = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchNews = async () => {
    const apiUrl = "/api/schoolNews";
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log("Fetched data: ", data);

      setArticles(data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (articles.length > 0 && !isModalOpen) {
      intervalRef.current = setInterval(() => {
        nextArticle();
      }, 5000);
    }

    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [articles, isModalOpen]);

  const nextArticle = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const handleReadMoreClick = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    intervalRef.current = setInterval(() => {
      nextArticle();
    }, 5000);
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-screen text-gray-800">
      {articles.length > 0 && (
        <h1 className="text-5xl text-secondaryColor mb-16 font-bold ">Welcome to {articles[currentIndex].schoolName}</h1>
      )}
      {articles.length > 0 && (
        <div className="bg-white shadow-md p-6 h-[60vh] w-[70vw] rounded-md flex">
          <div className="w-1/2 h-auto">
            <img
              src={
                articles[currentIndex].image ||
                "https://via.placeholder.com/400"
              }
              alt="Article"
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-start pl-32">
            <div className="w-full">
              <p className="text-gray-500 text-sm mb-5">
                {new Date(articles[currentIndex].date).toLocaleDateString()}
              </p>
              <h1 className="text-3xl font-bold mb-10 text-secondaryColor">
                {articles[currentIndex].title}
              </h1>
              <p className="text-lg mb-10">
                {articles[currentIndex].description.slice(0, 400)}...
              </p>
              <button
                onClick={handleReadMoreClick}
                className="inline-block bg-primaryColor text-white py-2 px-4 rounded-full hover:bg-secondaryColor-dark transition"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-md p-6 w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4 text-secondaryColor">
              {articles[currentIndex].title}
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              {new Date(articles[currentIndex].date).toLocaleDateString()}
            </p>
            <p className="text-lg mb-6">{articles[currentIndex].description}</p>
            <button
              onClick={closeModal}
              className="inline-block bg-primaryColor text-white py-2 px-4 rounded-full hover:bg-secondaryColor-dark transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 flex justify-center w-full space-x-2">
        {articles.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex ? "bg-primaryColor" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};