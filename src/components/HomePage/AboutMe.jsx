'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import ServicesSection from './ServicesSection';
import ClientReview from './ClientReview';
import Title from '../shared/Title';
import { motion, useInView } from 'framer-motion';

const AboutMe = () => {
  // Animation variants for parent container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Fast stagger (same as others)
      },
    },
  };

  // Animation variants for sections
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

  // Refs for each section
  const aboutRef = useRef(null);
  const satisfactionRef = useRef(null);
  const servicesRef = useRef(null);
  const reviewRef = useRef(null);

  // useInView hooks
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.2 });
  const isSatisfactionInView = useInView(satisfactionRef, { once: true, amount: 0.2 });
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.2 });
  const isReviewInView = useInView(reviewRef, { once: true, amount: 0.2 });

    const texts = [
    'Creative Front-End Developer',
    'Turning Ideas into Web Reality',
    'MERN Stack Web Developer',
    'JavaScript & React Enthusiast',
    'Building Modern Web Experiences',
    'Bringing Designs to Life with Code',
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    let timeout;

    if (!isDeleting && displayedText.length < currentText.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      }, 100);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length - 1));
      }, 50);
    } else if (!isDeleting && displayedText.length === currentText.length) {
      // Wait before deleting
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayedText.length === 0) {
      // Move to next text
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTextIndex]);

  return (
    <motion.div
      className=""
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* About Me Section */}
      <motion.div
        ref={aboutRef}
        variants={sectionVariants}
        initial="hidden"
        animate={isAboutInView ? 'visible' : 'hidden'}
        className="mb-16"
      >
        <motion.div
          variants={childVariants}
          style={{
            borderBottom: '1px solid transparent',
            borderImage:
              'linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
          }}
        >
          <Title title={'About Me'} />
        </motion.div>
        <motion.h1
          variants={childVariants}
          className="mt-9 mb-4 text-5xl"
        >
          I am a <span className="text-[#72ebc2]">{displayedText}</span>
        </motion.h1>
        <motion.p
  variants={childVariants}
  className="text-gray-500 text-sm leading-relaxed mb-4"
>
  I&apos;m a passionate MERN Stack and Front-End Developer with a knack for crafting
  visually stunning and highly functional web applications.
</motion.p>

<motion.p
  variants={childVariants}
  className="text-gray-500 text-sm md:text-sm leading-relaxed mb-4"
>
  My focus is on building seamless user experiences using modern technologies
  like React, Node.js, Express, and MongoDB. I love designing sleek UI
  components, optimizing performance, and bringing creative ideas to life with
  clean, efficient code.
</motion.p>

<motion.p
  variants={childVariants}
  className="text-gray-500 text-lg md:text-sm leading-relaxed"
>
  Let&apos;s collaborate to turn your vision into reality with modern,
  performance-driven, and visually engaging web solutions that stand out in the
  digital world!
</motion.p>

      </motion.div>

      {/* Client Satisfaction Section */}
      <motion.div
        ref={satisfactionRef}
        variants={sectionVariants}
        initial="hidden"
        animate={isSatisfactionInView ? 'visible' : 'hidden'}
        className="mb-16"
      >
        <motion.div
          variants={childVariants}
          style={{
            borderTop: '1px solid transparent',
            borderBottom: '1px solid transparent',
            borderImage:
              'linear-gradient(to left, rgb(65, 65, 65), rgba(255, 255, 255, 0)) 1',
          }}
          className="grid  lg:grid-cols-4 text-center grid-cols-2 py-4 justify-between gap-8 text-gray-500"
        >
          {[
            { value: '100%', label: 'Clients Satisfied' },
            { value: '38+', label: 'Positive Feedback' },
            { value: '30+', label: 'Project Completed' },
            { value: '2+', label: 'Years Experience' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={childVariants}
              className="gap-5 hover:scale-105 transition-transform duration-300"
            >
              <h3 className="font-bold font-style lg:text-5xl text-3xl mb-2">{item.value}</h3>
              <p className="text-sm">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Services Section */}
      <motion.div
        ref={servicesRef}
        variants={sectionVariants}
        initial="hidden"
        animate={isServicesInView ? 'visible' : 'hidden'}
      >
        <ServicesSection />
      </motion.div>

      {/* Client Review Section */}
      <motion.div
        ref={reviewRef}
        variants={sectionVariants}
        initial="hidden"
        animate={isReviewInView ? 'visible' : 'hidden'}
      >
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}><ClientReview /></Suspense>
      </motion.div>
    </motion.div>
  );
};

export default AboutMe;