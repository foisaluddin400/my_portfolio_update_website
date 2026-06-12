"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Title from '../shared/Title';
import Image from 'next/image';



const ServiceCard = ({ service }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.05 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
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
        {/* Rotating Gradient Border */}
        <div 
          className="absolute inset-[-1000%] animate-border-rotate"
          style={{
            background: 'conic-gradient(from 0deg, #72ebc2 0%, rgba(76, 249, 255, 0) 25%, rgba(76, 249, 255, 0) 50%, #72ebc2 100%)',
          }}
        />

        {/* Card Content */}
        <div className="relative z-10 h-full w-full p-6 rounded-[11px] bg-gradient-to-br from-white/5 to-white/2 border border-white/10 bg-[#151a18] backdrop-blur-xl flex flex-col items-center justify-center text-center">
          
          {/* Dynamic Icon Image */}
          {service.iconImage && (
            <motion.div variants={childVariants} className="mb-4">
              <Image
                src={`${service.iconImage}`}
                alt={service.title}
                width={70}
                height={70}
                className="object-contain drop-shadow-lg"
              />
            </motion.div>
          )}

          <motion.h3
            variants={childVariants}
            className="text-xl font-semibold text-white mb-3"
          >
            {service.title}
          </motion.h3>

          <motion.p
            variants={childVariants}
            className="text-gray-400 text-base leading-relaxed"
          >
            {service.description}
          </motion.p>
        </div>
      </motion.div>
    </>
  );
};

const ServicesSection = ({ servicesData }) => {
  
  const services = servicesData?.services || [];
console.log(servicesData)
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.1 },
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

      {services.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={service._id || idx} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          No services available yet.
        </div>
      )}
    </div>
  );
};

export default ServicesSection;