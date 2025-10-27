'use client';

import { Briefcase, GraduationCap } from 'lucide-react';
import Title from '../shared/Title';
import SkillSecton from './Skill';
import { motion } from 'framer-motion'; // Import Framer Motion
import { Suspense } from 'react';

const experienceItems = [
  {
    id: 'exp-1',
    title: 'Team Leader',
    company: 'Facebook Inc.',
    location: 'United States',
    description: 'Collaborate with creative and development teams.',
    dateRange: '2018 - Present',
    actionLabel: 'RECOMMENDATION',
    actionType: 'recommendation',
  },
  {
    id: 'exp-2',
    title: 'Web Developer',
    company: 'Upwork Inc.',
    location: 'Remote',
    description: 'Monitored technical aspects of the front-end delivery for projects.',
    dateRange: '2016 - 2018',
    actionLabel: 'RECOMMENDATION',
    actionType: 'recommendation',
  },
  {
    id: 'exp-3',
    title: 'Web Developer',
    company: 'Upwork Inc.',
    location: 'Remote',
    description: 'Monitored technical aspects of the front-end delivery for projects.',
    dateRange: '2016 - 2018',
    actionLabel: 'RECOMMENDATION',
    actionType: 'recommendation',
  },
];

const educationItems = [
  {
    id: 'edu-1',
    title: 'Stanford University',
    company: 'United States',
    location: 'Stanford University Private',
    description: 'University in Stanford, California',
    dateRange: '2010 - 2014',
    actionLabel: 'CERTIFICATE',
    actionType: 'certificate',
  },
  {
    id: 'edu-2',
    title: 'Programming Course',
    company: 'London',
    location: 'Coursework - Git, WordPress, Javascript, iOS, Android.',
    description: '',
    dateRange: '2009 - 2010',
    actionLabel: 'CERTIFICATE',
    actionType: 'certificate',
  },
  {
    id: 'edu-3',
    title: 'Programming Course',
    company: 'London',
    location: 'Coursework - Git, WordPress, Javascript, iOS, Android.',
    description: '',
    dateRange: '2009 - 2010',
    actionLabel: 'CERTIFICATE',
    actionType: 'certificate',
  },
];

export function ResumeTimeline() {
  // Parent container animation variants for staggering children (same as AboutMe)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger child animations by 0.2s
      },
    },
  };

  // Animation variants for individual sections and items (same as AboutMe)
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
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className=""
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div
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
        <motion.div
          style={{
            borderRight: '1px solid transparent',
            borderImage: 'linear-gradient(to bottom, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
          }}
          className="space-y-8"
          variants={sectionVariants}
        >
          <div
            style={{
              borderRight: '1px solid transparent',
              borderBottom: '1px solid transparent',
              borderImage: 'linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
            }}
            className="flex items-center gap-3 mb-12 p-4"
          >
            <motion.div variants={sectionVariants}>
              <div className="w-12 h-12 rounded-full border-2 border-[#72ebc2] flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-[#72ebc2]" />
              </div>
            </motion.div>
            <motion.h2
              className="text-xl md:text-2xl font-bold text-white tracking-wide"
              variants={sectionVariants}
            >
              EXPERIENCE
            </motion.h2>
          </div>

          <motion.div className="relative pl-[23px] space-y-12" variants={sectionVariants}>
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#72ebc2] to-green-400/30" />

            {experienceItems.map((item) => (
              <motion.div key={item.id} className="relative" variants={sectionVariants}>
                <div className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-[#72ebc2]" />

                <div
                  style={{
                    borderBottom: '1px solid transparent',
                    borderImage: 'linear-gradient(to left, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
                  }}
                  className="space-y-3 pb-9"
                >
                  <motion.div
                    className="inline-block px-3 py-1 rounded border border-[#72ebc2] bg-green-400/10 text-[#72ebc2] text-xs font-mono"
                    variants={sectionVariants}
                  >
                    {item.dateRange}
                  </motion.div>

                  <motion.h3 className="text-lg  text-white" variants={sectionVariants}>
                    {item.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm text-gray-400 font-medium"
                    variants={sectionVariants}
                  >
                    {item.company}
                  </motion.p>
                  <motion.p
                    className="text-sm text-gray-400 leading-relaxed"
                    variants={sectionVariants}
                  >
                    {item.description}
                  </motion.p>

                  <motion.a
                    href="#"
                    className="inline-flex items-center gap-2 text-xs  text-white hover:text-[#72ebc2] transition-colors mt-2"
                    variants={sectionVariants}
                  >
                    {item.actionLabel}
                    <span className="text-[#72ebc2]">›</span>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Education Section */}
        <motion.div className="space-y-8" variants={sectionVariants}>
          <div
            style={{
              borderRight: '1px solid transparent',
              borderBottom: '1px solid transparent',
              borderImage: 'linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
            }}
            className="flex items-center gap-3 mb-12 p-4"
          >
            <motion.div variants={sectionVariants}>
              <div className="w-12 h-12 rounded-full border-2 border-[#72ebc2] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#72ebc2]" />
              </div>
            </motion.div>
            <motion.h2
              className="text-xl md:text-2xl font-bold text-white tracking-wide"
              variants={sectionVariants}
            >
              EDUCATION
            </motion.h2>
          </div>

          <motion.div className="relative pl-[23px] space-y-12" variants={sectionVariants}>
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#72ebc2] to-green-400/30" />

            {educationItems.map((item) => (
              <motion.div key={item.id} className="relative" variants={sectionVariants}>
                <div className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-[#72ebc2]" />

                <div
                  style={{
                    borderBottom: '1px solid transparent',
                    borderImage: 'linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
                  }}
                  className="space-y-3 pb-9"
                >
                  <motion.div
                    className="inline-block px-3 py-1 rounded border border-[#72ebc2] bg-green-400/10 text-[#72ebc2] text-xs font-mono"
                    variants={sectionVariants}
                  >
                    {item.dateRange}
                  </motion.div>

                  <motion.h3 className="text-lg  text-white" variants={sectionVariants}>
                    {item.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm text-gray-400 font-medium"
                    variants={sectionVariants}
                  >
                    {item.company}
                  </motion.p>
                  <motion.p
                    className="text-sm text-gray-400 leading-relaxed"
                    variants={sectionVariants}
                  >
                    {item.location}
                  </motion.p>

                  <motion.a
                    href="#"
                    className="inline-flex items-center gap-2 text-xs  text-white hover:text-[#72ebc2] transition-colors mt-2"
                    variants={sectionVariants}
                  >
                    {item.actionLabel}
                    <span className="text-[#72ebc2]">›</span>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Skills Section */}
      <motion.div variants={sectionVariants}>
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}><SkillSecton /></Suspense>
      </motion.div>
    </motion.div>
  );
}