'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Title from '../shared/Title';
import { motion, useInView, AnimatePresence } from 'framer-motion';


const ClientReview = ({ ClientReview }) => {
  const reviews = ClientReview?.reviews || [];
console.log(ClientReview)
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewRef = useRef(null);
  const isInView = useInView(reviewRef, { once: true, amount: 0.2 });

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto slide
  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, reviews.length]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  if (reviews.length === 0) {
    return <div className="text-center py-20 text-gray-400">No reviews available yet.</div>;
  }

  return (
    <div className="relative overflow-hidden" ref={reviewRef}>
      {/* Decorative Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Title title="Client Feedback" />
      </motion.div>

      <div className="px-3 mt-20 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            {/* Large Quote Mark */}
            <span className="absolute -top-12 -left-4 md:-left-10 text-[160px] leading-none text-[#72ebc2]/10 font-serif select-none">
              “
            </span>

            <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white text-xl md:text-2xl py-9 leading-tight md:leading-[1.35] font-medium tracking-tight mb-12"
              >
                {reviews[currentIndex].description}
              </motion.p>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-white/10 pt-8">
                <div className="flex items-center gap-5">
                  {/* Profile Image */}
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#72ebc2]/30 flex-shrink-0">
                    {reviews[currentIndex].profileImage ? (
                      <img
                        src={`${reviews[currentIndex].profileImage}`}
                        alt={reviews[currentIndex].clientName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-[#72ebc2] to-teal-600 flex items-center justify-center text-black font-bold text-2xl">
                        {reviews[currentIndex].clientName?.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-white font-bold text-xl leading-none mb-1.5">
                      {reviews[currentIndex].clientName}
                    </h4>
                    <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold">
                      {reviews[currentIndex].profession || "Client"}
                    </p>
                  </div>
                </div>

                <div className="text-gray-400 text-sm font-mono">
                  {formatDate(reviews[currentIndex].date)}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Section */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Progress Dots */}
          <div className="flex gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 transition-all duration-500 rounded-full ${
                  currentIndex === idx 
                    ? 'w-12 bg-[#72ebc2]' 
                    : 'w-4 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Arrow Controls */}
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