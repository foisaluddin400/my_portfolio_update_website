"use client";

import React from "react";
import Title from "../shared/Title";
import { motion } from "framer-motion";

const SkillSection = ({ skillsData }) => {
  const skills = skillsData?.skills || [];

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

  return (
    <div className="text-gray-200">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <Title title="Skill" />
      </motion.div>

      <div
        style={{
          borderTop: "1px solid transparent",
          borderLeft: "1px solid transparent",
          borderImage:
            "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
        }}
        className="grid 2xl:grid-cols-1 gap-4"
      >
        {skills.map((category) => (
          <motion.div
            key={category._id}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div
              style={{
                borderRight: "1px solid transparent",
                borderBottom: "1px solid transparent",
                borderImage:
                  "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
              }}
              className="flex pl-3 items-center gap-3 mb-8 py-4"
            >
              <motion.div variants={childVariants}>
                <div className="w-12 h-12 rounded-full border-2 border-[#72ebc2] flex items-center justify-center">
                  <span className="text-[#72ebc2] text-xl">💻</span>
                </div>
              </motion.div>

              <motion.h2
                variants={childVariants}
                className="text-xl md:text-2xl font-bold text-white tracking-wide"
              >
                {category.category}
              </motion.h2>
            </div>

            <motion.div
              className="grid lg:grid-cols-6 grid-cols-4 gap-2 pl-3 lg:gap-3"
              variants={sectionVariants}
            >
              {category.skills?.map((skill) => (
                <motion.div
                  key={skill._id}
                  variants={childVariants}
                  className="flex flex-col items-center p-4 bg-gradient-to-b from-white/5 to-white/2 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={skill.skillIconImage}
                    alt={skill.languageName}
                    className="w-12 h-12 object-contain mb-2"
                  />

                  <p className="text-white text-sm lg:text-md lg:font-medium text-center">
                    {skill.languageName}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillSection;