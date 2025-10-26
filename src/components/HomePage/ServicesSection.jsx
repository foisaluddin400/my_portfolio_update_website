'use client';

import React, { useRef } from 'react';
import { FaLaptopCode, FaServer, FaPaintBrush } from 'react-icons/fa';
import Title from '../shared/Title';
import { motion, useInView } from 'framer-motion';

const ServicesSection = () => {
  const services = [
    {
      icon: <FaLaptopCode size={40} className="text-yellow-400 mb-3" />,
      title: 'Frontend Development',
      description:
        'Crafting responsive and interactive UI with React, Tailwind CSS, and modern tools.',
    },
    {
      icon: <FaServer size={40} className="text-teal-400 mb-3" />,
      title: 'Backend Development',
      description:
        'Building scalable server-side applications and APIs using Node.js and databases.',
    },
    {
      icon: <FaPaintBrush size={40} className="text-pink-400 mb-3" />,
      title: 'UI/UX Design',
      description:
        'Designing visually appealing and user-friendly interfaces for better experience.',
    },
    {
      icon: <FaLaptopCode size={40} className="text-yellow-400 mb-3" />,
      title: 'Frontend Development',
      description:
        'Crafting responsive and interactive UI with React, Tailwind CSS, and modern tools.',
    },
    {
      icon: <FaServer size={40} className="text-teal-400 mb-3" />,
      title: 'Backend Development',
      description:
        'Building scalable server-side applications and APIs using Node.js and databases.',
    },
    {
      icon: <FaPaintBrush size={40} className="text-pink-400 mb-3" />,
      title: 'UI/UX Design',
      description:
        'Designing visually appealing and user-friendly interfaces for better experience.',
    },
  ];

  // Animation variants for service cards
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3, // Fast animation (same as SkillSection, Blog, ProjectPage)
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

  return (
    <div className="mt-20">
      {/* Services Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <Title title={'My Services'} />
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => {
          // Create a ref for each service card
          const cardRef = useRef(null);
          const isInView = useInView(cardRef, {
            once: true,
            amount: 0.2,
          });

          return (
            <motion.div
              key={idx}
              ref={cardRef}
              variants={sectionVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-all duration-300 relative"
              style={{
                borderTop: '1px solid transparent',
                borderRight: '1px solid transparent',
                borderBottom: '1px solid transparent',
                borderLeft: '1px solid transparent',
                borderImage:
                  'linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
              }}
            >
              <motion.div variants={childVariants}>
                {service.icon}
              </motion.div>
              <motion.h3
                variants={childVariants}
                className="text-xl font-semibold text-white mb-2"
              >
                {service.title}
              </motion.h3>
              <motion.p
                variants={childVariants}
                className="text-gray-300"
              >
                {service.description}
              </motion.p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesSection;