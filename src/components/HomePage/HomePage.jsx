"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Menu,
  User,
  Grid3x3,
  MessageCircle,
  Mail,
  Play,
  Cloud,
  Send,
} from "lucide-react";
import { SlSocialFacebook } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";
import { FiPhoneCall } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io";
import cover1 from "../../../public/cover_1.png";
import cover2 from "../../../public/cover_2.jpg";
import cover3 from "../../../public/cover_3.png";
import cover4 from "../../../public/cover_4.png";
import profile from "../../../public/profile.png";
import AboutMe from "./AboutMe";
import { ResumeTimeline } from "../resume/Resume";
import Blog from "../blogs/Blog";
import ProjectPage from "../projects/Project";
import Contact from "../contact/Contact";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("About");
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0);
  const [isLeftSectionVisible, setIsLeftSectionVisible] = useState(true);

  const navItems = [
    { icon: User, label: "About", id: "about" },
    { icon: Grid3x3, label: "Resume", id: "resume" },
    { icon: Play, label: "Blogs", id: "blogs" },
    { icon: MessageCircle, label: "Projects", id: "projects" },
    { icon: Mail, label: "Contact", id: "contact" },
  ];

  const menuContent = {
    About: <AboutMe />,
    Resume: <ResumeTimeline />,
    Blogs: <Blog />,
    Projects: <ProjectPage />,
    Contact: <Contact />,
  };

  // Array of cover images
  const coverImages = [cover1, cover2, cover3, cover4];

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCoverIndex((prevIndex) => (prevIndex + 1) % coverImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [coverImages.length]);

  // Handle tab change with smooth scrolling on mobile and left section visibility
  const handleTabChange = (label, sectionId) => {
    setActiveTab(label);
    // Only hide left section for mobile screens (≤640px) when not on "About" tab
    if (window.innerWidth <= 640) {
      setIsLeftSectionVisible(label === "About");
    } else {
      setIsLeftSectionVisible(true); // Keep left section visible for md and lg screens
    }
    // Smooth scrolling for mobile (≤640px)
    if (window.innerWidth <= 640) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = window.innerHeight * 0.9; // 90vh
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      }
    }
  };

  // Animation variants for cover image
  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Animation variants for section content
  const sectionVariants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="sm:block md:flex min-h-screen text-white">
      {/* Left-Side Section (Hidden for non-About tabs on mobile only) */}
      {isLeftSectionVisible && (
        <div className="sm:w-full md:w-[360px] lg:w-[460px] md:flex md:flex-col md:items-center md:fixed md:overflow-y-auto">
          <div className="flex items-center md:h-screen">
            {/* Navigation Menu (Desktop) */}
            <div className="hidden md:flex">
              <div
                className="bg-white/6 backdrop-blur-md border border-white/10 z-50 rounded-xl sm:w-full sm:mx-auto md:w-auto md:py-2 md:mr-3"
                style={{
                  WebkitBackdropFilter: "blur(10px)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="flex flex-col sm:justify-center sm:gap-2 md:gap-0">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleTabChange(item.label, item.id)}
                      className={`flex items-center gap-3 p-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-[#72ebc2] relative group ${
                        activeTab === item.label
                          ? "text-[#72ebc2] border-l border-[#72ebc2]"
                          : "text-gray-500"
                      }`}
                    >
                      <item.icon className="w-5 h-5 z-10" />
                      <span className="absolute bottom-[-2rem] md:left-10 sm:left-1/2 md:top-1/2 sm:-translate-x-1/2 md:-translate-y-1/2 opacity-0 transform sm:-translate-y-2 md:translate-x-4 transition-all duration-300 ml-3 ease-in-out whitespace-nowrap group-hover:opacity-100 group-hover:sm:-translate-y-0 group-hover:md:translate-x-0">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Card */}
            <div className="sm:mt-4 md:mt-0 md:-ml-9 w-full max-w-md mx-auto">
              <div
                className="md:rounded-xl overflow-hidden bg-white/6 backdrop-blur-md bg-[#2222226e] border border-white/10 shadow-lg"
                style={{
                  WebkitBackdropFilter: "blur(10px)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="flex flex-col items-center">
                  <div
                    className="relative w-full md:rounded-lg mb-4"
                    style={{ height: "200px" }}
                  >
                    <motion.div
                      key={currentCoverIndex}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 1.5 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={coverImages[currentCoverIndex]}
                        alt="Cover Image"
                        width={1000}
                        height={200}
                        className="object-cover w-full md:w-[310px] lg:w-[370px] h-full md:rounded-md"
                      />
                    </motion.div>
                    <Image
                      src={profile}
                      alt="RK Foisal"
                      width={500}
                      height={500}
                      className="object-cover w-[120px] h-[120px] rounded-full border border-[#72ebc2] absolute -bottom-12 left-1/2 transform -translate-x-1/2 shadow-md"
                    />
                  </div>
                  <h2 className="text-2xl mt-16 text-white">RK Foisal</h2>
                  <p className="text-sm text-gray-300 mb-2 mt-2">Software Engineer</p>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-400 shadow-sm" />
                    <span className="text-xs text-gray-300">Available for work</span>
                  </div>
                  <div className="flex gap-4 mt-11">
                    <div className="group relative flex items-center">
                      <span className="border border-gray-600 text-gray-400 hover:bg-[#72ebc2]/10 rounded-full w-[40px] h-[40px] flex justify-center items-center transition-all duration-300 group-hover:border-[#72ebc2] group-hover:text-[#72ebc2]">
                        <SlSocialFacebook size={18} />
                      </span>
                      <span className="absolute bottom-12 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm text-[#72ebc2]">
                        Facebook
                      </span>
                    </div>
                    <div className="group relative flex items-center">
                      <span className="border border-gray-600 text-gray-400 hover:bg-[#72ebc2]/10 rounded-full w-[40px] h-[40px] flex justify-center items-center transition-all duration-300 group-hover:border-[#72ebc2] group-hover:text-[#72ebc2]">
                        <TfiEmail size={18} />
                      </span>
                      <span className="absolute bottom-12 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm text-[#72ebc2]">
                        Email
                      </span>
                    </div>
                    <div className="group relative flex items-center">
                      <span className="border border-gray-600 text-gray-400 hover:bg-[#72ebc2]/10 rounded-full w-[40px] h-[40px] flex justify-center items-center transition-all duration-300 group-hover:border-[#72ebc2] group-hover:text-[#72ebc2]">
                        <FiPhoneCall size={18} />
                      </span>
                      <span className="absolute bottom-12 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm text-[#72ebc2]">
                        Phone
                      </span>
                    </div>
                    <div className="group relative flex items-center">
                      <span className="border border-gray-600 text-gray-400 hover:bg-[#72ebc2]/10 rounded-full w-[40px] h-[40px] flex justify-center items-center transition-all duration-300 group-hover:border-[#72ebc2] group-hover:text-[#72ebc2]">
                        <IoLogoInstagram size={18} />
                      </span>
                      <span className="absolute bottom-12 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm text-[#72ebc2]">
                        Instagram
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full mt-11">
                    <button
                      style={{
                        borderTop: "1px solid transparent",
                        borderRight: "1px solid transparent",
                        borderImage: "linear-gradient(to left, #72ebc2, rgb(22, 22, 22)) 1",
                      }}
                      className="flex items-center justify-center gap-2 p-2 bg-white/6 hover:bg-[#72ebc2]/10 text-[#72ebc2]"
                    >
                      <Cloud className="" /> Resume
                    </button>
                    <button
                      style={{
                        borderTop: "1px solid transparent",
                        borderLeft: "1px solid transparent",
                        borderImage: "linear-gradient(to right, #72ebc2, rgb(22, 22, 22)) 1",
                      }}
                      className="flex items-center justify-center gap-2 p-2 bg-white/6 hover:bg-[#72ebc2]/10 text-[#72ebc2]"
                    >
                      <Cloud className="" /> Download CV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation (Always Visible) */}
      <div className="md:hidden">
        <div
          className="bg-white/6 flex bottom-2 fixed left-1/2 transform -translate-x-1/2 backdrop-blur-md border border-white/10 z-50 rounded-xl sm:w-full sm:mx-auto md:w-auto px-2"
          style={{
            WebkitBackdropFilter: "blur(10px)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex flex-row sm:justify-center sm:gap-2 md:gap-0">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleTabChange(item.label, item.id)}
                className={`flex items-center gap-3 p-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-[#72ebc2] relative group ${
                  activeTab === item.label
                    ? "text-[#72ebc2] border-b border-[#72ebc2]"
                    : "text-gray-500"
                }`}
              >
                <item.icon className="w-5 h-5 z-10" />
                <span
                  className="absolute -top-7 left-1/2 transform -translate-x-1/2 opacity-0 transition-all duration-300 ease-in-out whitespace-nowrap group-hover:opacity-100 group-hover:translate-y-2"
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="sm:mt-4 flex md:items-center md:w-full mt-5 md:mt-0">
        <div
          className={`w-full ${
            isLeftSectionVisible ? "md:ml-[370px] lg:ml-[450px]" : "md:ml-0"
          } md:w-full flex-1 md:h-[99vh] bg-white/6 backdrop-blur-md border bg-[#2222226e] border-white/10 md:rounded-2xl sm:min-h-[calc(100vh-4rem)] md:overflow-y-auto lg:p-8 p-3 pb-16 md:pb-6 custom-scrollbar`}
          style={{
            WebkitBackdropFilter: "blur(10px)",
            backdropFilter: "blur(10px)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-gray-200 text-lg w-full"
            >
              {menuContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}