"use client";

import React, { useRef } from "react";
import { CheckOutlined } from "@ant-design/icons";
import Title from "../shared/Title";
import { motion, useInView } from "framer-motion";
import reactImg from "../../../public/react.png";
import nextImg from "../../../public/next.png";
import nodeImg from "../../../public/node.png";
import expressImg from "../../../public/express.png";
import mongoImg from "../../../public/mongo.png";
import githubImg from "../../../public/github.png";
import gitImg from "../../../public/git.png";
import vscodeImg from "../../../public/vscode.png";
import figmaImg from "../../../public/figma.png";

const SkillSection = () => {
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  // Refs and inView hooks
  const techRef = useRef(null);
  const softRef = useRef(null);
  const langRef = useRef(null);
  const knowledgeRef = useRef(null);

  const isTechInView = useInView(techRef, { once: true, amount: 0.2 });
  const isSoftInView = useInView(softRef, { once: true, amount: 0.2 });
  const isLangInView = useInView(langRef, { once: true, amount: 0.2 });
  const isKnowledgeInView = useInView(knowledgeRef, {
    once: true,
    amount: 0.2,
  });

  // Skill data with images
  const techSkills = [
    { name: "React", img: reactImg },
    { name: "Next.js", img: nextImg },
    { name: "Node.js", img: nodeImg },
    { name: "Express.js", img: expressImg },
    { name: "MongoDB", img: mongoImg },
  ];

  const softSkills = [
    { name: "GitHub", img: githubImg },
    { name: "Git", img: gitImg },
    { name: "VS Code", img: vscodeImg },
    { name: "Figma", img: figmaImg },
  ];

  return (
    <div className="text-gray-200 mt-16 space-y-16">
      {/* Section Title */}
      <motion.div variants={sectionVariants} initial="hidden" animate="visible">
        <Title title="Skill" />
      </motion.div>

      <div
        style={{
          borderTop: "1px solid transparent",
          borderImage:
            "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
        }}
        className="grid 2xl:grid-cols-2  gap-4"
      >
        {/* Technology Skills */}
        <motion.div
          ref={techRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isTechInView ? "visible" : "hidden"}
        >
          <div  style={{
              borderRight: "1px solid transparent",
              borderBottom: "1px solid transparent",
              borderImage:
                "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
            }} className="flex items-center gap-3 mb-8 py-4">
            <motion.div variants={childVariants}>
              <div className="w-12 h-12 rounded-full border-2 border-[#72ebc2] flex items-center justify-center">
                <span className="text-[#72ebc2] text-xl">💻</span>
              </div>
            </motion.div>
            <motion.h2
              variants={childVariants}
              className="text-xl md:text-2xl font-bold text-white tracking-wide"
            >
              Technology Skills
            </motion.h2>
          </div>

          <motion.div
            className="grid lg:grid-cols-5 grid-cols-4 gap-2 lg:gap-3"
            variants={sectionVariants}
          >
            {techSkills.map((skill, index) => (
              <motion.div
                key={index}
                variants={childVariants}
                className="flex flex-col items-center p-4 bg-gradient-to-b from-white/5 to-white/2 rounded-xl shadow-lg  hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={skill.img.src}
                  alt={skill.name}
                  className="w-12 h-12 object-contain mb-2"
                />
                <p className="text-white text-sm lg:text-md lg:font-medium">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Software Skills */}
        <motion.div
          style={{
            borderLeft: "1px solid transparent",

            borderImage:
              "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
          }}
          ref={softRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isSoftInView ? "visible" : "hidden"}
        >
          <div
            style={{
              borderRight: "1px solid transparent",
              borderBottom: "1px solid transparent",
              borderImage:
                "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
            }}
            className="flex items-center gap-3 mb-8 py-4 pl-3"
          >
            <motion.div variants={childVariants}>
              <div className="w-12 h-12 rounded-full border-2 border-[#72ebc2] flex items-center justify-center">
                <span className="text-[#72ebc2] text-xl">🗂️</span>
              </div>
            </motion.div>
            <motion.h2
              variants={childVariants}
              className="text-xl md:text-2xl font-bold text-white tracking-wide"
            >
              Software Skills
            </motion.h2>
          </div>

          <motion.div
            className="grid lg:grid-cols-5 grid-cols-4 gap-2 pl-3 lg:gap-3"
            variants={sectionVariants}
          >
            {softSkills.map((skill, index) => (
              <motion.div
                key={index}
                variants={childVariants}
                className="flex flex-col items-center p-4 bg-gradient-to-b from-white/5 to-white/2  rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={skill.img.src}
                  alt={skill.name}
                  className="w-12 h-12 object-contain mb-2"
                />
                <p className="text-white text-sm lg:text-md lg:font-medium">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Language Skills */}
      <div className=" grid lg:grid-cols-2">
        <motion.div
          ref={langRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isLangInView ? "visible" : "hidden"}
        >
          <div style={{
              borderRight: "1px solid transparent",
              borderBottom: "1px solid transparent",
              borderImage:
                "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
            }} className="flex items-center gap-3 mb-8 pb-4">
            <motion.div variants={childVariants}>
              <div className="w-12 h-12 rounded-full border-2 border-[#72ebc2] flex items-center justify-center">
                <span className="text-[#72ebc2] text-xl">🌍</span>
              </div>
            </motion.div>
            <motion.h2
              variants={childVariants}
              className="text-xl md:text-2xl font-bold text-white tracking-wide"
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
                <div className="flex gap-2 mt-2">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${i < item.dots ? "bg-[#72ebc2]" : "bg-gray-500"}`}
                    />
                  ))}
                </div>
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
          <div    style={{
              borderRight: "1px solid transparent",
              borderBottom: "1px solid transparent",
              borderImage:
                "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
            }} className="flex items-center gap-3 mb-8 pb-4 mt-5 lg:mt-0">
            <motion.div variants={childVariants}>
              <div className="w-12 h-12 rounded-full border-2 border-[#72ebc2] flex items-center justify-center">
                <span className="text-[#72ebc2] text-xl">✅</span>
              </div>
            </motion.div>
            <motion.h2
              variants={childVariants}
              className="text-xl md:text-2xl font-bold text-white tracking-wide"
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
              <motion.li
                key={index}
                variants={childVariants}
                className="flex items-center"
              >
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
