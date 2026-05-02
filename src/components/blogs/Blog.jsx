"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Title from "../shared/Title";

// Standardizing imports
import blog1 from "../../../public/blog1.png";
import blog2 from "../../../public/blog2.png";
import blog3 from "../../../public/blog3.png";
import blog4 from "../../../public/blog4.png";
import blog5 from "../../../public/blog5.png";
import blog6 from "../../../public/blog6.png";
import blog7 from "../../../public/blog7.png";
import blog8 from "../../../public/blog8.png";
import blog9 from "../../../public/blog9.png";
import blog11 from "../../../public/blog11.png";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const BlogCard = ({ item }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group relative flex flex-col bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#72ebc2]/50 transition-all duration-500 shadow-2xl"
    >
      {/* Visual Header: Image with Overlay */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
        
        {/* Floating Date Badge */}
        <div className="absolute top-4 left-4">
          <span className="backdrop-blur-md bg-black/40 border border-white/10 text-[#72ebc2] px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
            {item.date}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#72ebc2] transition-colors duration-300 leading-snug">
          {item.title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
          {item.description}
        </p>

        {/* Footer: Tags */}
        <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {item.tags?.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] uppercase font-bold tracking-widest text-gray-500 border border-white/10 px-2 py-1 rounded group-hover:border-[#72ebc2]/30 group-hover:text-gray-300 transition-all"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Blog() {
  const blogs = [
    {
      id: 11,
      title: "Next.js 15 – What’s New and Why It’s a Game Changer",
      image: blog11,
      date: "Nov 1, 2025",
      description: "Next.js 15 introduces server actions, turbo pack, and an improved cache system — redefining modern web development.",
      tags: ["Next.js", "React", "Performance"],
    },
    {
      id: 10,
      title: "The Real Struggle Behind Becoming a Web Developer",
      image: blog9,
      date: "July 10, 2025",
      description: "Behind every successful web developer is a story of failure, patience, and perseverance. Here’s mine on building a problem-solving mindset.",
      tags: ["Motivation", "Career"],
    },
    {
      id: 7,
      title: "Overcoming State Management Complexity in React",
      image: blog6,
      date: "Nov 5, 2025",
      description: "Managing large-scale React states can be challenging. A hybrid approach using Redux Toolkit and Context API solved my synchronization issues.",
      tags: ["React", "Redux", "Context"],
    },
    {
        id: 8,
        title: "Optimizing MongoDB Queries for Fast API Response",
        image: blog7,
        date: "Oct 22, 2025",
        description: "Reducing API response time using MongoDB indexes, aggregation pipelines, and lean queries for scalable backend performance.",
        tags: ["Node.js", "MongoDB", "Backend"],
    },
    {
        id: 9,
        title: "Integrate JWT Authentication in MERN Stack",
        image: blog8,
        date: "Aug 28, 2025",
        description: "A complete guide to building secure authentication using JWT, bcrypt, and Axios interceptors for route protection.",
        tags: ["Security", "MERN", "Auth"],
    },
    {
        id: 1,
        title: "Building a Profitable Multi-Role Marketplace",
        image: blog9,
        date: "Nov 7, 2025",
        description: "Developing a MERN based business marketplace designed to connect sellers, buyers, and investors with secure RBAC systems.",
        tags: ["MERN", "Business", "RBAC"],
    }
  ];

  return (
    <section className=" ">
      <div className="">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className=""
        >
          <Title title={"Digital Insights"} />
         
        </motion.div>

        {/* Dynamic Grid: 1 col on mobile, 2 on tablet, 2 on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
          {blogs.map((item) => (
            <BlogCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}