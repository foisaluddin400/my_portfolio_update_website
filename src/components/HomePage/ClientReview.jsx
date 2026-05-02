'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Title from '../shared/Title';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const ClientReview = () => {
  const reviews = [
    {
      name: 'John Doe',
      review: 'Amazing work! The website exceeded my expectations with its sleek design and performance. Highly recommend!',
      date: 'Oct 2025',
      role: 'Founder @ TechFlow'
    },
    {
      name: 'Jane Smith',
      review: 'Professional and timely delivery. The UI/UX is top-notch, and the support was excellent.',
      date: 'Oct 2025',
      role: 'Product Manager'
    },
    {
      name: 'Mike Johnson',
      review: 'A pleasure to work with. The backend solutions were robust and perfectly tailored to our needs.',
      date: 'Oct 2025',
      role: 'CTO'
    },
    // ... rest of your reviews
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewRef = useRef(null);
  const isInView = useInView(reviewRef, { once: true, amount: 0.2 });

  // Memoized navigation to prevent effect re-runs
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // 5 seconds feels more premium than 3
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className=" relative overflow-hidden" ref={reviewRef}>
      {/* Decorative Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Title title={'Client Feedback'} />
      </motion.div>

      <div className=" px-10 mt-20 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            {/* Large Decorative Quote Mark */}
            <span className="absolute -top-12 -left-4 md:-left-10 text-[160px] leading-none text-[#72ebc2]/10 font-serif select-none">
              “
            </span>

            <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8  shadow-2xl">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white text-xl md:text-2xl py-9 leading-tight md:leading-[1.2] font-medium tracking-tight mb-10"
              >
                {reviews[currentIndex].review}
              </motion.p>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-white/10 pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#72ebc2] to-teal-600 flex items-center justify-center text-black font-bold">
                    {reviews[currentIndex].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg leading-none mb-1">
                      {reviews[currentIndex].name}
                    </h4>
                    <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold">
                      {reviews[currentIndex].role || "Client"}
                    </p>
                  </div>
                </div>

                <div className="text-gray-500 text-sm font-mono">
                  {reviews[currentIndex].date}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation & Progress Section */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Progress Indicators */}
          <div className="flex gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 transition-all duration-500 rounded-full ${
                  currentIndex === idx ? 'w-12 bg-[#72ebc2]' : 'w-4 bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Minimalist Controls */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="group p-4 bg-white/5 hover:bg-[#72ebc2] border border-white/10 rounded-2xl transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="group p-4 bg-white/5 hover:bg-[#72ebc2] border border-white/10 rounded-2xl transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientReview;