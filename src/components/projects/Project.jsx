"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  GlobalOutlined,
  GithubOutlined,
  DatabaseOutlined,
  CheckCircleFilled,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { motion, useInView } from "framer-motion";
import Title from "../shared/Title";

// Ensure these paths match your project structure
import project1 from "../../../public/img/project_1.png";
import project4 from "../../../public/img/project_4.png";
import project3 from "../../../public/img/project_3.jpg";
const ProjectSection = () => {
  const projects = [
    {
      id: 1,
      title: "Profitable Businesses for Sale",
      url: "https://profitablebusinessesforsale.com",
      image: project1,
      tech: ["Next.js", "Node.js", "MongoDB", "Tailwind", "Redux"],
      features: [
        {
          title: "Secure Business & Reviewer System",
          desc: "Business owners can securely sign up, upload products, and create campaigns, while reviewers can purchase products, join campaigns, and earn rewards.",
        },
        {
          title: "Campaign, Review & Commission Workflow",
          desc: "Businesses send products via Shippo, reviewers submit image/video reviews, earn payments, and receive commissions from sales generated through their reviews.",
        },
        {
          title: "Full E-commerce, Social Feed & Admin Panel",
          desc: "Includes direct product purchasing, social feed with like/comment/follow features, and a complete admin panel to manage users, products, campaigns, and platform activity.",
        },
      ],
      links: { live: "#", frontend: "#", backend: "#" },
    },
    {
      id: 2,
      title: "ShopFlow Customizer",
      url: "https://shopflow-express.io",
      image: project4,
      tech: ["React", "Fabric.js", "Stripe", "Express", "Cloudinary"],
      features: [
        {
          title: "Live Product Customizer",
          desc: "Canvas-based editor using Fabric.js allowing drag-and-drop text, clipart, and colors with real-time 360° zoom previews.",
        },
        {
          title: "Stripe Payment Integration",
          desc: "Secure checkout handling Credit Cards, Apple Pay, and Google Pay with automated webhook processing for order status.",
        },
        {
          title: "Advanced Admin Dashboard",
          desc: "Comprehensive control for inventory tracking, sales analytics, design approval queues, and automated low-stock alerts.",
        },
      ],
      links: { live: "#", frontend: "#", backend: "#" },
    },

        {
      id: 2,
      title: "ShopFlow Customizer",
      url: "https://shopflow-express.io",
      image: project3,
      tech: ["React", "Fabric.js", "Stripe", "Express", "Cloudinary"],
      features: [
        {
          title: "Live Product Customizer",
          desc: "Canvas-based editor using Fabric.js allowing drag-and-drop text, clipart, and colors with real-time 360° zoom previews.",
        },
        {
          title: "Stripe Payment Integration",
          desc: "Secure checkout handling Credit Cards, Apple Pay, and Google Pay with automated webhook processing for order status.",
        },
        {
          title: "Advanced Admin Dashboard",
          desc: "Comprehensive control for inventory tracking, sales analytics, design approval queues, and automated low-stock alerts.",
        },
      ],
      links: { live: "#", frontend: "#", backend: "#" },
    },
 
  ];

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
          <ProjectDisplay key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

const ProjectDisplay = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className=" "
    >
      {/* --- BROWSER FRAME --- */}
      <div className="relative  border-b border-white/10 pb-16 ">
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
                {project.url}
              </span>
            </div>
          </div>

          {/* Website Image Content */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              className="object-cover object-top transition-transform duration-[3000ms] hover:scale-105"
              fill
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-40" />
          </div>
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="">
          {/* Header & Tech Stack */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-2xl italic text-white ">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((t) => (
                  <span
                    key={t}
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
                href={project.links.live}
                className="flex items-center justify-between group/btn px-6 py-2 rounded-xl bg-[#72ebc2] text-black font-bold hover:shadow-[0_0_30px_rgba(114,235,194,0.3)] transition-all"
              >
                <span>Live Preview</span>
                <GlobalOutlined className="text-xl group-hover/btn:rotate-12 transition-transform" />
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={project.links.frontend}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all"
                >
                  <GithubOutlined /> UI Code
                </a>
                <a
                  href={project.links.backend}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all"
                >
                  <DatabaseOutlined /> API Code
                </a>
              </div>
            </div>
          </div>

          {/* Core Features List (Styled as per image_ce3a3d.png) */}
          <div className="space-y-4">
            <h4 className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-8">
              Platform Capabilities
            </h4>

            {project.features.map((feature, i) => (
              <motion.div
                key={i}
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
                    {feature.desc}
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
