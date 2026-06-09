'use client';

import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import Title from '../shared/Title';
import { motion } from 'framer-motion';

const experienceItems = [
  {
    id: 'exp-1',
    title: 'Frontend Developer',
    company: 'Twoinsoft Technology',
    location: 'Feni, Bangladesh',
    description:
      'Developed and maintained responsive user interfaces using React, Tailwind CSS, and Framer Motion. Collaborated with backend developers to integrate RESTful APIs and optimize performance.',
    dateRange: '2023 - 2024',
  },
  {
    id: 'exp-2',
    title: 'MERN Stack Developer (Intern)',
    company: 'Betopia IT Institute',
    location: 'Dhaka, Bangladesh',
    description:
      'Worked on full-stack projects using MongoDB, Express, React, and Node.js. Built dynamic admin dashboards and e-commerce modules as part of real-world client projects.',
    dateRange: '2024 - 2025',
  },
  {
    id: 'exp-3',
    title: 'Spoken English Course',
    company: 'Mentors English Language Institute',
    location: 'Dhaka, Bangladesh',
    description:
      'Improved English communication and presentation skills to enhance professional collaboration and client interaction. Focused on fluency, pronunciation, and confidence in public speaking.',
    dateRange: '2024',
  },
];

const educationItems = [
  {
    id: 'edu-1',
    title: 'Feni Polytechnic Institute',
    company: 'Feni, Bangladesh',
    location: 'Computer Science and Engineering',
    description: 'Diploma in Computer Science and Engineering',
    dateRange: '2020 - 2024',
  },
  {
    id: 'edu-2',
    title: 'Betopia IT Institute',
    company: 'Dhaka, Bangladesh',
    location: 'MERN Stack Development',
    description: 'Professional training focused on full-stack web development using MongoDB, Express, React, and Node.js.',
    dateRange: '2024 - 2025',
  },
  {
    id: 'edu-3',
    title: 'Twoinsoft Technology',
    company: 'Feni, Bangladesh',
    location: 'MERN Stack Development',
    description: 'Hands-on project-based learning in modern web application development with the MERN stack.',
    dateRange: '2023 - 2024',
  },
];

export function ResumeTimeline({resumeData}) {
  // Animation for the overall container
console.log(resumeData)
const resumes = resumeData?.resumes || [];

const experienceItems = resumes.filter(
  (item) => item.type === "experience"
);

const educationItems = resumes.filter(
  (item) => item.type === "education"
);



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  // Standard section slide-up
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Timeline Line "Drawing" Animation
  const lineVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: 'easeInOut', delay: 0.2 },
    },
  };

  // Timeline Dot "Pop" Animation
  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 15, delay: 0.6 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className=""
    >
      {/* Header Section */}
      <div
        className=""
        style={{
          borderBottom: '1px solid transparent',
          borderImage: 'linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
        }}
      >
        <motion.div variants={sectionVariants}>
          <Title title={'My Resume'} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        
        {/* Experience Section */}
        <motion.div className="space-y-8" variants={sectionVariants}>
          <div
            style={{
              borderRight: '1px solid transparent',
              borderBottom: '1px solid transparent',
              borderImage: 'linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
            }}
            className="flex items-center gap-4 mb-12 p-4"
          >
            <div className="w-12 h-12 rounded-full border-2 border-[#72ebc2] flex items-center justify-center shadow-[0_0_15px_rgba(114,235,194,0.2)]">
              <Briefcase className="w-6 h-6 text-[#72ebc2]" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">EXPERIENCE</h2>
          </div>

          <div className="relative pl-[23px] space-y-12">
            {/* Animated Vertical Line */}
            <motion.div
              variants={lineVariants}
              className="absolute left-2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#72ebc2] via-[#72ebc2]/50 to-transparent origin-top"
            />

            {experienceItems.map((item) => (
  <motion.div
    key={item._id}
    className="relative"
    variants={sectionVariants}
  >
    <motion.div
      variants={dotVariants}
      className="absolute -left-[21px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#72ebc2] shadow-[0_0_10px_#72ebc2] z-10"
    />

    <div
      style={{
        borderBottom: "1px solid transparent",
        borderImage:
          "linear-gradient(to left, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
      }}
      className="space-y-3 pb-9"
    >
      <div className="inline-block px-3 py-1 rounded border border-[#72ebc2]/30 bg-[#72ebc2]/10 text-[#72ebc2] text-xs font-mono">
        {item.startingYear} -{" "}
        {item.running ? "Present" : item.passingYear || "Present"}
      </div>

      <h3 className="text-lg text-white font-semibold">
        {item.title}
      </h3>

      <p className="text-sm text-[#72ebc2]/80 font-medium">
        {item.instituteName}
      </p>

      <p className="text-sm text-gray-400 leading-relaxed">
        {item.description}
      </p>
    </div>
  </motion.div>
))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div className="space-y-8" variants={sectionVariants}>
          <div
            style={{
              borderRight: '1px solid transparent',
              borderBottom: '1px solid transparent',
              borderImage: 'linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
            }}
            className="flex items-center gap-4 mb-12 p-4"
          >
            <div className="w-12 h-12 rounded-full border-2 border-[#72ebc2] flex items-center justify-center shadow-[0_0_15px_rgba(114,235,194,0.2)]">
              <GraduationCap className="w-6 h-6 text-[#72ebc2]" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">EDUCATION</h2>
          </div>

          <div className="relative pl-[23px] space-y-12">
            {/* Animated Vertical Line */}
            <motion.div
              variants={lineVariants}
              className="absolute left-2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#72ebc2] via-[#72ebc2]/50 to-transparent origin-top"
            />

            {educationItems.map((item) => (
  <motion.div
    key={item._id}
    className="relative"
    variants={sectionVariants}
  >
    <motion.div
      variants={dotVariants}
      className="absolute -left-[21px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#72ebc2] shadow-[0_0_10px_#72ebc2] z-10"
    />

    <div
      style={{
        borderBottom: "1px solid transparent",
        borderImage:
          "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
      }}
      className="space-y-3 pb-9"
    >
      <div className="inline-block px-3 py-1 rounded border border-[#72ebc2]/30 bg-[#72ebc2]/10 text-[#72ebc2] text-xs font-mono">
        {item.startingYear} -{" "}
        {item.running ? "Present" : item.passingYear || "Present"}
      </div>

      <h3 className="text-lg text-white font-semibold">
        {item.title}
      </h3>

      <p className="text-sm text-[#72ebc2]/80 font-medium">
        {item.instituteName}
      </p>

      <p className="text-sm text-gray-400 leading-relaxed">
        {item.description}
      </p>
    </div>
  </motion.div>
))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}