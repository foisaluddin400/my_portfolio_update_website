'use client';

import React from 'react';
import { Progress } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Title from '../shared/Title';
import { motion } from 'framer-motion'; // Import Framer Motion

const SkillSection = () => {
  // Language dots function
  const renderDots = (filled) => {
    const totalDots = 15;
    return (
      <div className="flex gap-2 mt-2">
        {[...Array(totalDots)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < filled ? 'bg-[#72ebc2]' : 'bg-gray-500'
            }`}
          ></div>
        ))}
      </div>
    );
  };

  // Parent container animation variants (same as AboutMe)
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
      className="text-gray-200 mt-16"
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
          <Title title={'Skill'} />
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Technology Skills */}
        <motion.div
          style={{
            borderRight: '1px solid transparent',
            borderImage: 'linear-gradient(to bottom, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
          }}
          className=""
          variants={sectionVariants}
        >
          <div
            style={{
              borderBottom: '1px solid transparent',
              borderImage: 'linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
            }}
            className="flex items-center gap-3 mb-12 p-4"
          >
            <motion.div variants={sectionVariants}>
              <div className="w-12 h-12 rounded-full border-2 border-[#72ebc2] flex items-center justify-center">
                <h1 className="w-6 h-6 text-[#72ebc2]">💻</h1>
              </div>
            </motion.div>
            <motion.h2
              className="text-xl md:text-2xl font-bold text-white tracking-wide"
              variants={sectionVariants}
            >
              Technology Skills
            </motion.h2>
          </div>

          <motion.div className="space-y-4 pr-6" variants={sectionVariants}>
            <motion.div variants={sectionVariants}>
              <p>React</p>
              <Progress
                percent={85}
                strokeColor="#72ebc2"
                format={(percent) => <span style={{ color: 'white' }}>{percent}%</span>}
              />
            </motion.div>
            <motion.div variants={sectionVariants}>
              <p>Node.js</p>
              <Progress
                percent={75}
                strokeColor="#72ebc2"
                format={(percent) => <span style={{ color: 'white' }}>{percent}%</span>}
              />
            </motion.div>
            <motion.div variants={sectionVariants}>
              <p>MongoDB</p>
              <Progress
                percent={70}
                strokeColor="#72ebc2"
                format={(percent) => <span style={{ color: 'white' }}>{percent}%</span>}
              />
            </motion.div>
            <motion.div variants={sectionVariants}>
              <p>JavaScript</p>
              <Progress
                percent={90}
                strokeColor="#72ebc2"
                format={(percent) => <span style={{ color: 'white' }}>{percent}%</span>}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Language Skills */}
        <motion.div variants={sectionVariants}>
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
                <h1 className="w-6 h-6 text-[#72ebc2]">🌍</h1>
              </div>
            </motion.div>
            <motion.h2
              className="text-xl md:text-2xl font-bold text-white tracking-wide"
              variants={sectionVariants}
            >
              Language Skills
            </motion.h2>
          </div>
          <motion.div className="space-y-3" variants={sectionVariants}>
            <motion.div variants={sectionVariants}>
              <p>English</p>
              {renderDots(12)}
            </motion.div>
            <motion.div variants={sectionVariants}>
              <p>Bangla</p>
              {renderDots(15)}
            </motion.div>
            <motion.div variants={sectionVariants}>
              <p>Hindi</p>
              {renderDots(8)}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Communication Skills */}
        <motion.div
          style={{
            borderRight: '1px solid transparent',
            borderImage: 'linear-gradient(to bottom, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
          }}
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
                <h1 className="w-6 h-6 text-[#72ebc2]">🗣️</h1>
              </div>
            </motion.div>
            <motion.h2
              className="text-xl md:text-2xl font-bold text-white tracking-wide"
              variants={sectionVariants}
            >
              Communication Skills
            </motion.h2>
          </div>
          <motion.div className="flex gap-6 flex-wrap" variants={sectionVariants}>
            <motion.div className="flex flex-col items-center" variants={sectionVariants}>
              <Progress
                type="circle"
                percent={80}
                strokeColor="#72ebc2"
                format={(percent) => <span style={{ color: 'white' }}>{percent}%</span>}
              />
              <p className="mt-2">Listening</p>
            </motion.div>
            <motion.div className="flex flex-col items-center" variants={sectionVariants}>
              <Progress
                type="circle"
                percent={75}
                strokeColor="#72ebc2"
                format={(percent) => <span style={{ color: 'white' }}>{percent}%</span>}
              />
              <p className="mt-2">Speaking</p>
            </motion.div>
            <motion.div className="flex flex-col items-center" variants={sectionVariants}>
              <Progress
                type="circle"
                percent={90}
                strokeColor="#72ebc2"
                format={(percent) => <span style={{ color: 'white' }}>{percent}%</span>}
              />
              <p className="mt-2">Teamwork</p>
            </motion.div>
            <motion.div className="flex flex-col items-center" variants={sectionVariants}>
              <Progress
                type="circle"
                percent={85}
                strokeColor="#72ebc2"
                format={(percent) => <span style={{ color: 'white' }}>{percent}%</span>}
              />
              <p className="mt-2">Presentation</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Knowledge */}
        <motion.div variants={sectionVariants}>
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
                <h1 className="w-6 h-6 text-[#72ebc2]">✅</h1>
              </div>
            </motion.div>
            <motion.h2
              className="text-xl md:text-2xl font-bold text-white tracking-wide"
              variants={sectionVariants}
            >
              Knowledge
            </motion.h2>
          </div>
          <motion.ul className="space-y-2" variants={sectionVariants}>
            {[
              'Time Management',
              'Problem Solving',
              'Team Collaboration',
              'Project Planning',
              'Adaptability',
            ].map((item, index) => (
              <motion.li key={index} variants={sectionVariants}>
                <CheckOutlined className="text-[#72ebc2] mr-2" /> {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillSection;