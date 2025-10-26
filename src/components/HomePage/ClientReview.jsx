'use client'
import React, { useState, useEffect } from 'react';
import Title from '../shared/Title';

const ClientReview = () => {
  const reviews = [
    {
      name: "John Doe",
      review: "Amazing work! The website exceeded my expectations with its sleek design and performance. Highly recommend!",
      date: "October 20, 2025",
    },
    {
      name: "Jane Smith",
      review: "Professional and timely delivery. The UI/UX is top-notch, and the support was excellent.",
      date: "October 15, 2025",
    },
    {
      name: "Mike Johnson",
      review: "A pleasure to work with. The backend solutions were robust and perfectly tailored to our needs.",
      date: "October 10, 2025",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // 3000ms = 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="pt-16 pb-11">
      <Title title={'Client Feedback'} />
      <div className="max-w-4xl mx-auto text-center mt-16">
        <div className="relative">
          <div className="transition-all duration-500 ease-in-out">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-all duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {reviews.map((review, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 animate-slideIn">
                    <p className="text-gray-300 text-lg md:text-3xl leading-relaxed mb-4 italic">
                      {review.review}
                    </p>
                    <h4 className="text-white font-semibold text-lg">{review.name}</h4>
                    <p className="text-gray-400 text-sm">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-4">
              <button
                onClick={prevSlide}
                className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-yellow-400/50 transition-colors duration-300"
              >
                &lt;
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-teal-300/50 transition-colors duration-300"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ClientReview;