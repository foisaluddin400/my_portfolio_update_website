"use client";
import React, { useEffect, useState } from "react";
import ServicesSection from "./ServicesSection";
import ClientReview from "./ClientReview";
import Title from "../shared/Title";
import { motion } from "framer-motion"; // Import Framer Motion

const AboutMe = () => {
  // Parent container animation variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger child animations by 0.2s
      },
    },
  };

  // Animation variants for individual sections
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 30, // Slide up from below
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // Smooth 0.5s animation
        ease: "easeOut",
      },
    },
  };
  const texts = [
    "Passionate Web Developer & Problem Solver",
    "I build Web Applications",
    "Full-Stack MERN Developer",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
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
      className=" "
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* About Me Section */}
      <motion.div className="mb-16" variants={sectionVariants}>
        <div
          style={{
            borderBottom: "1px solid transparent",
            borderImage:
              "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
          }}
        >
          <Title title={"About Me"} />
        </div>
        <h1 className="mt-9 mb-4 text-5xl ">
          I am a <span className="text-[#72ebc2]">{displayedText}</span>
        </h1>

        <motion.p
          className=" text-gray-500 text-sm leading-relaxed mb-4"
          variants={sectionVariants}
        >
          I'm a passionate web developer with a knack for crafting visually
          stunning and highly functional web applications.
        </motion.p>
        <motion.p
          className="text-gray-500 text-sm md:text-sm leading-relaxed mb-4"
          variants={sectionVariants}
        >
          My focus is on creating seamless user experiences, leveraging the
          latest technologies to build responsive, scalable, and aesthetically
          pleasing websites. Whether it's designing sleek UI components or
          optimizing performance, I thrive on solving complex challenges with
          creativity and precision.
        </motion.p>
        <motion.p
          className="text-gray-500 text-lg md:text-sm leading-relaxed"
          variants={sectionVariants}
        >
          Let's collaborate to turn your vision into reality with cutting-edge
          web solutions that stand out in the digital world!
        </motion.p>
      </motion.div>

      {/* Client Satisfaction Section */}
      <motion.div className="mb-16" variants={sectionVariants}>
        <div style={{
            borderTop: '1px solid transparent',
          
             borderBottom: '1px solid transparent',
             
            borderImage: 'linear-gradient(to left, rgb(65, 65, 65), rgba(255, 255, 255, 0)) 1',
          }} className="grid lg:grid-cols-4 text-center grid-cols-2 py-4 justify-between gap-8 text-gray-500">
          <motion.div
            className=" gap-5 hover:scale-105 transition-transform duration-300"
            variants={sectionVariants}
          >
            <h3 className="font-bold lg:text-5xl text-3xl mb-2">100%</h3>
            <p className="text-sm ">
              Clients Satisfied
            </p>
          </motion.div>
          <motion.div
            className=" gap-5 hover:scale-105 transition-transform duration-300"
            variants={sectionVariants}
          >
            <h3 className="font-bold lg:text-5xl text-3xl mb-2">100+</h3>
            <p className="text-sm">
              Positive Feedback
            </p>
            
          </motion.div>
          <motion.div
            className="gap-5 hover:scale-105 transition-transform duration-300"
            variants={sectionVariants}
          >
            <h3 className="font-bold lg:text-5xl text-3xl mb-2">30+</h3>
            <p className="text-sm">
              Project Completed
            </p>
          </motion.div>
          <motion.div
            className="gap-5 hover:scale-105 transition-transform duration-300"
            variants={sectionVariants}
          >
            <h3 className="font-bold lg:text-5xl text-3xl mb-2">2+</h3>
            <p className="text-sm">
              Years Experience
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Services Section */}
      <motion.div variants={sectionVariants}>
        <ServicesSection />
      </motion.div>

      {/* Client Review Section */}
      <motion.div variants={sectionVariants}>
        <ClientReview />
      </motion.div>
    </motion.div>
  );
};

export default AboutMe;
