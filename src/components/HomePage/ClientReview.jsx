'use client';

import React, { useState, useEffect, useRef } from 'react';
import Title from '../shared/Title';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const ClientReview = () => {
  const reviews = [
    {
      name: 'John Doe',
      review:
        'Amazing work! The website exceeded my expectations with its sleek design and performance. Highly recommend!',
      date: 'October 20, 2025',
    },
    {
      name: 'Jane Smith',
      review:
        'Professional and timely delivery. The UI/UX is top-notch, and the support was excellent.',
      date: 'October 15, 2025',
    },
    {
      name: 'Mike Johnson',
      review:
        'A pleasure to work with. The backend solutions were robust and perfectly tailored to our needs.',
      date: 'October 10, 2025',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Animation variants for review section
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3, // Fast animation (same as others)
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.05, // Fast stagger (same as others)
      },
    },
  };

  // Animation variants for child elements
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25, // Fast child animation (same as others)
        ease: 'easeOut',
      },
    },
  };

  // Animation variants for slide transitions
  const slideVariants = {
    enter: { opacity: 0, x: 50 },
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3, // Match section duration
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.05, // Match stagger
      },
    },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  // Ref for the review section
  const reviewRef = useRef(null);
  const isInView = useInView(reviewRef, {
    once: true,
    amount: 0.2,
  });

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
  }, []);

  return (
    <div className="pt-16 pb-11">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <Title title={'Client Feedback'} />
      </motion.div>
      <motion.div
        ref={reviewRef}
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-4xl mx-auto text-center mt-16"
      >
        <div className="relative">
          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full flex-shrink-0"
              >
                <motion.p
                  variants={childVariants}
                  className="text-gray-300 text-lg md:text-3xl leading-relaxed mb-4 italic"
                >
                  {reviews[currentIndex].review}
                </motion.p>
                <motion.h4
                  variants={childVariants}
                  className="text-white font-semibold text-lg"
                >
                  {reviews[currentIndex].name}
                </motion.h4>
                <motion.p
                  variants={childVariants}
                  className="text-gray-400 text-sm"
                >
                  {reviews[currentIndex].date}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.div
            variants={childVariants}
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-4"
          >
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
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientReview;