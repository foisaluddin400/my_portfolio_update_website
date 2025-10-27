"use client";

import React, { useRef } from "react";
import { Progress } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import Title from "../shared/Title";
import { motion, useInView } from "framer-motion";

// Language dots function
const renderDots = (filled) => {
  const totalDots = 15;
  return (
    <div className="flex gap-2 mt-2">
      {[...Array(totalDots)].map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full ${
            i < filled ? "bg-[#72ebc2]" : "bg-gray-500"
          }`}
        ></div>
      ))}
    </div>
  );
};

const SkillSection = () => {
  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3, // Reduced from 0.5 to 0.3 for faster animation
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05, // Reduced from 0.1 to 0.05 for faster stagger
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
        duration: 0.25, // Reduced from 0.4 to 0.25 for faster animation
        ease: "easeOut",
      },
    },
  };

  // Refs for each section to track visibility
  const techSkillsRef = useRef(null);
  const langSkillsRef = useRef(null);
  const commSkillsRef = useRef(null);
  const knowledgeRef = useRef(null);

  // useInView hooks for each section
  const isTechSkillsInView = useInView(techSkillsRef, {
    once: true,
    amount: 0.2,
  });
  const isLangSkillsInView = useInView(langSkillsRef, {
    once: true,
    amount: 0.2,
  });
  const isCommSkillsInView = useInView(commSkillsRef, {
    once: true,
    amount: 0.2,
  });
  const isKnowledgeInView = useInView(knowledgeRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <div className="text-gray-200 mt-16">
      <div
        style={{
          borderBottom: "1px solid transparent",
          borderImage:
            "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
        }}
      >
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <Title title={"Skill"} />
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Technology Skills */}
        <motion.div
          ref={techSkillsRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isTechSkillsInView ? "visible" : "hidden"}
          style={{
            borderRight: "1px solid transparent",
            borderImage:
              "linear-gradient(to bottom, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
          }}
        >
          <div
            style={{
              borderBottom: "1px solid transparent",
              borderImage:
                "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
            }}
            className="flex items-center gap-3 mb-12 p-4"
          >
            <motion.div variants={childVariants}>
              <div className="w-12 h-12 rounded-full border-2 border-[#72ebc2] flex items-center justify-center">
                <h1 className="w-6 h-6 text-[#72ebc2]">💻</h1>
              </div>
            </motion.div>
            <motion.h2
              className="text-xl md:text-2xl font-bold text-white tracking-wide"
              variants={childVariants}
            >
             Technology Skills
            </motion.h2>
          </div>

          <motion.div className="space-y-4 pr-6" variants={sectionVariants}>
            {[
              { skill: "React", percent: 85 },
              { skill: "Next.js", percent: 90 },
              { skill: "Node.js", percent: 75 },
              { skill: "Express.js", percent: 70 },
              { skill: "MongoDB", percent: 70 },
              { skill: "Tailwind CSS", percent: 90 },
              { skill: "Redux", percent: 80 },
              { skill: "RESTful APIs", percent: 80 },
              { skill: "JSON & AJAX", percent: 85 },
            ].map((item, index) => (
              <motion.div key={index} variants={childVariants}>
                <p>{item.skill}</p>
                <Progress
                  percent={item.percent}
                  strokeColor="#72ebc2"
                  format={(percent) => (
                    <span style={{ color: "white" }}>{percent}%</span>
                  )}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Language Skills */}
         <motion.div
          ref={commSkillsRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isCommSkillsInView ? "visible" : "hidden"}
          style={{
            borderRight: "1px solid transparent",
            borderImage:
              "linear-gradient(to bottom, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
          }}
        >
          <div
            style={{
              borderRight: "1px solid transparent",
              borderBottom: "1px solid transparent",
              borderImage:
                "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
            }}
            className="flex items-center gap-3 mb-12 p-4"
          >
            <motion.div variants={childVariants}>
              <div className="w-12 h-12 rounded-full border-2 border-[#72ebc2] flex items-center justify-center">
                <h1 className="w-6 h-6 text-[#72ebc2]">🗣️</h1>
              </div>
            </motion.div>
            <motion.h2
              className="text-xl md:text-2xl font-bold text-white tracking-wide"
              variants={childVariants}
            >
              Software Skills
            </motion.h2>
          </div>
          <motion.div
            className="flex gap-6 flex-wrap"
            variants={sectionVariants}
          >
            {[
              { skill: "GitHub", percent: 85 },
  { skill: "Git", percent: 80 },
  { skill: "VS Code", percent: 90 },
  { skill: "Figma", percent: 75 },
  { skill: "Postman", percent: 80 },
  { skill: "Vercel", percent: 85 },
  { skill: "Netlify", percent: 80 },
   { skill: "Framer Motion", percent: 85 },
  { skill: "Canva", percent: 70 },
  { skill: "Dialogflow", percent: 75 }, // updated chatbot tool
  { skill: "Chrome DevTools", percent: 90 },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                variants={childVariants}
              >
                <Progress
                  type="circle"
                  percent={item.percent}
                  strokeColor="#72ebc2"
                  format={(percent) => (
                    <span style={{ color: "white" }}>{percent}%</span>
                  )}
                />
                <p className="mt-2">{item.skill}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Communication Skills */}
     
  <motion.div
          ref={langSkillsRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isLangSkillsInView ? "visible" : "hidden"}
        >
          <div
            style={{
              borderRight: "1px solid transparent",
              borderBottom: "1px solid transparent",
              borderImage:
                "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
            }}
            className="flex items-center gap-3 mb-12 p-4"
          >
            <motion.div variants={childVariants}>
              <div className="w-12 h-12 rounded-full border-2 border-[#72ebc2] flex items-center justify-center">
                <h1 className="w-6 h-6 text-[#72ebc2]">🌍</h1>
              </div>
            </motion.div>
            <motion.h2
              className="text-xl md:text-2xl font-bold text-white tracking-wide"
              variants={childVariants}
            >
              Language Skills
            </motion.h2>
          </div>
          <motion.div className="space-y-3" variants={sectionVariants}>
            {[
              { lang: "English", dots: 12 },
              { lang: "Bangla", dots: 15 },
              { lang: "Hindi", dots: 8 },
            ].map((item, index) => (
              <motion.div key={index} variants={childVariants}>
                <p>{item.lang}</p>
                {renderDots(item.dots)}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        {/* Knowledge */}
        <motion.div
          ref={knowledgeRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isKnowledgeInView ? "visible" : "hidden"}
        >
          <div
            style={{
              borderRight: "1px solid transparent",
              borderBottom: "1px solid transparent",
              borderImage:
                "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
            }}
            className="flex items-center gap-3 mb-12 p-4"
          >
            <motion.div variants={childVariants}>
              <div className="w-12 h-12 rounded-full border-2 border-[#72ebc2] flex items-center justify-center">
                <h1 className="w-6 h-6 text-[#72ebc2]">✅</h1>
              </div>
            </motion.div>
            <motion.h2
              className="text-xl md:text-2xl font-bold text-white tracking-wide"
              variants={childVariants}
            >
              Knowledge
            </motion.h2>
          </div>
          <motion.ul className="space-y-2" variants={sectionVariants}>
            {[
              "Time Management",
              "Problem Solving",
              "Team Collaboration",
              "Project Planning",
              "Adaptability",
            ].map((item, index) => (
              <motion.li key={index} variants={childVariants}>
                <CheckOutlined className="text-[#72ebc2] mr-2" /> {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillSection;
