'use client';

import React, { useRef } from 'react';
import { FaLaptopCode, FaServer, FaPaintBrush, FaCode, FaMobileAlt, FaCloud } from 'react-icons/fa';
import Title from '../shared/Title';
import { motion, useInView } from 'framer-motion';

const ServiceCard = ({ service }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
  };

  return (
    <>
      <style>{`
        @keyframes border-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-border-rotate {
          animation: border-rotate 4s linear infinite;
        }
      `}</style>
      
      <motion.div
        ref={cardRef}
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative p-[1px] rounded-xl overflow-hidden group hover:scale-105 transition-all duration-300"
      >
        {/* The Rotating Gradient Background */}
        <div 
          className="absolute inset-[-1000%] animate-border-rotate"
          style={{
            background: 'conic-gradient(from 0deg, #72ebc2 0%, rgba(76, 249, 255, 0) 25%, rgba(76, 249, 255, 0) 50%, #72ebc2 100%)',
          }}
        />

        {/* The Inner Card Content */}
        <div className="relative z-10 h-full w-full p-6 rounded-[11px] bg-gradient-to-br from-white/5 to-white/2  border border-white/10 bg-[#151a18] to-transparent backdrop-blur-xl text-center flex flex-col items-center justify-center">
       
          <motion.div variants={childVariants}>{service.icon}</motion.div>
          <motion.h3
            variants={childVariants}
            className="text-xl font-semibold text-white mb-2"
          >
            {service.title}
          </motion.h3>
          <motion.p
            variants={childVariants}
            className="text-gray-400 text-base"
          >
            {service.description}
          </motion.p>
        </div>
      </motion.div>
    </>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: <FaLaptopCode size={40} className="text-yellow-400 mb-3" />,
      title: 'Frontend Development',
      description: 'Building responsive, fast, and interactive user interfaces using React, Next.js, and Tailwind CSS.',
    },
    {
      icon: <FaServer size={40} className="text-teal-400 mb-3" />,
      title: 'Backend Development',
      description: 'Developing robust and scalable backend systems with Node.js, Express, and MongoDB.',
    },
    {
      icon: <FaPaintBrush size={40} className="text-pink-400 mb-3" />,
      title: 'UI/UX Design',
      description: 'Designing clean, intuitive, and user-centered interfaces to deliver smooth digital experiences.',
    },
    {
      icon: <FaCode size={40} className="text-blue-400 mb-3" />,
      title: 'Full-Stack Web Development',
      description: 'Combining frontend and backend expertise to build complete, production-ready web applications.',
    },
    {
      icon: <FaMobileAlt size={40} className="text-green-400 mb-3" />,
      title: 'Responsive Design',
      description: 'Ensuring websites look and perform beautifully across all devices — desktop, tablet, and mobile.',
    },
    {
      icon: <FaCloud size={40} className="text-purple-400 mb-3" />,
      title: 'API Integration & Deployment',
      description: 'Integrating REST APIs, managing data flow, and deploying applications using platforms like Vercel and Render.',
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div className="">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <Title title={'My Services'} />
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {services.map((service, idx) => (
          <ServiceCard key={idx} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;