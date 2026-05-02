"use client";
import React from "react";
import { motion } from "framer-motion";

const Title = ({ title }) => {
  return (
    <div className="relative border border-gray-600 inline-block mb-6 overflow-hidden rounded-full">
      
      {/* Animated highlight */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#72ebc2]/30 to-transparent rounded-full"
        animate={{ x: ["-100%", "0%", "100%"] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear", // important for no pause
        }}
      />

      {/* Title */}
      <h2 className="relative z-10 text-lg  px-4">
        {title}
      </h2>
    </div>
  );
};

export default Title;