"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  GlobalOutlined,
  GithubOutlined,
  DatabaseOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { motion, useInView } from "framer-motion";
import Title from "../shared/Title";
import { ImageUrl } from "@/redux/Api/baseApi";


const ProjectSection = ({ projectsData }) => {
  const projects = projectsData?.projects || [];

  return (
    <section className="">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title title="Featured Deployments" />
      </motion.div>

      <div className="space-y-16">
        {projects.map((project, index) => (
          <ProjectDisplay key={project._id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

const ProjectDisplay = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Image slider state
  const images = [
    project.bannerImage,
    project.secondImage,
    project.thirdImage,
  ].filter(Boolean);
  console.log(images)

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* --- BROWSER FRAME --- */}
      <div className="relative border-b border-white/10 pb-16">
        {/* Browser Top Bar */}
        <div className="border rounded-2xl border-white/10 overflow-hidden mb-4">
          <div className="bg-[#1a1a1a] px-4 py-1 border-b border-white/10 flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>

            {/* Mock URL Bar */}
            <div className="flex-1 max-w-xl mx-auto bg-black/40 rounded-lg py-1.5 px-4 border border-white/5 flex items-center gap-2">
              <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                Secure
              </span>
              <span className="text-gray-400 text-xs truncate">
                {project.websiteLink || "#"}
              </span>
            </div>
          </div>

          {/* Website Image Content with Slider */}
          <div className="relative aspect-[16/9] overflow-hidden group">
            {images.length > 0 && (
              <img
                key={currentIndex}
                src={`${images[currentIndex]}`}
                alt={project.title || project.name}
                className="object-cover object-top transition-all duration-700"
                fill
                priority
              />
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-40" />

            {/* Dots Indicator - Only Bottom Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "bg-[#72ebc2] scale-125"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Current Image Label */}
            <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
              {currentIndex === 0 ? "Banner" : currentIndex === 1 ? "Second View" : "Third View"}
            </div>
          </div>
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="">
          {/* Header & Tech Stack */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-2xl italic text-white">
                {project.title || project.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies?.map((t, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-white/5 text-gray-400 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 min-w-[240px]">
              <a
                href={project.websiteLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group/btn px-6 py-2 rounded-xl bg-[#72ebc2] text-black font-bold hover:shadow-[0_0_30px_rgba(114,235,194,0.3)] transition-all"
              >
                <span>Live Preview</span>
                <GlobalOutlined className="text-xl group-hover/btn:rotate-12 transition-transform" />
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={project.uiCodeLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all"
                >
                  <GithubOutlined /> UI Code
                </a>
                <a
                  href={project.apiCodeLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all"
                >
                  <DatabaseOutlined /> API Code
                </a>
              </div>
            </div>
          </div>

          {/* Core Features List */}
          <div className="space-y-4">
            <h4 className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-8">
              Platform Capabilities
            </h4>

            {project.features?.map((feature, i) => (
              <motion.div
                key={feature._id || i}
                whileHover={{ x: 5 }}
                className="bg-gradient-to-b from-white/5 to-white/2 border border-white/10 rounded-2xl p-6 transition-all hover:border-[#72ebc2]/30"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircleFilled className="text-[#10b981] text-xl" />
                  </div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    <span className="font-bold text-white">
                      {feature.title} –{" "}
                    </span>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectSection;