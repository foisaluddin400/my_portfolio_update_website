"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Cloud, Settings, Star, BookOpen } from "lucide-react";
import {
  IoSchoolOutline,
  IoMailOpenOutline,
  IoLogoInstagram,
} from "react-icons/io5";
import { ImBlog } from "react-icons/im";
import { SlSocialFacebook } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";
import { FiPhoneCall } from "react-icons/fi";
import { PiGooglePhotosLogoLight } from "react-icons/pi";

import profile from "../../../public/profile.png";
import AboutMe from "./AboutMe";
import { ResumeTimeline } from "../resume/Resume";
import Blog from "../blogs/Blog";
import ProjectPage from "../projects/Project";
import Contact from "../contact/Contact";
import ServicesSection from "./ServicesSection";
import ClientReview from "./ClientReview";
import SkillSection from "../resume/Skill";
import { ImageUrl } from "@/redux/Api/baseApi";

export default function HomePage({ aboutData, blogsData, skillsData, profileData, projectsData, reviewsData, servicesData, resumeData }) {

  const [activeSection, setActiveSection] = useState("about");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const isManualScroll = useRef(false);

  const navItems = [
    { icon: User, id: "about", label: "About" },
    { icon: Settings, id: "sectionServices", label: "Services" },
    { icon: IoSchoolOutline, id: "resume", label: "Resume" },
    { icon: BookOpen, id: "skills", label: "Skills" },
    { icon: PiGooglePhotosLogoLight, id: "projects", label: "Projects" },
    { icon: ImBlog, id: "blogs", label: "Blog" },
    { icon: Star, id: "clientReviews", label: "Reviews" },
    { icon: IoMailOpenOutline, id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (isManualScroll.current) return;
      const sections = document.querySelectorAll("section[id]");
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      let current = "about";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - viewportHeight * 0.3) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    isManualScroll.current = true;

    // Blog details খোলা থাকলে আগে close করো
    if (selectedBlog) setSelectedBlog(null);

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 20, behavior: "smooth" });
      }
      setTimeout(() => { isManualScroll.current = false; }, 1200);
    }, 50);
  };

  const handleSelectBlog = (blog) => {
    setSelectedBlog(blog);
    setActiveSection("blogs");
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToBlogs = () => {
    setSelectedBlog(null);
    setTimeout(() => {
      const el = document.getElementById("blogs");
      if (el) window.scrollTo({ top: el.offsetTop - 20, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="text-white selection:bg-[#72ebc2]/30">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[25%_65%_5%] gap-8 md:gap-12 relative">

        {/* ==================== PROFILE CARD ==================== */}
        <aside className="md:sticky m-4 md:m-0 md:top-4 md:h-[calc(100vh-2rem)] flex items-center">
          <div className="w-full md:max-w-none max-w-md mx-auto md:mx-0">
            <div className="relative p-[1.6px] overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/2 bg-[#151a18] backdrop-blur-xl group">
              <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,#72ebc2_180deg,#72ebc2_270deg,transparent_360deg)]" />
              <div className="relative bg-[#151a18f5] rounded-[22px] overflow-hidden">
                <div className="relative">
                  <img
                    src={`${ImageUrl}/${profileData?.profileImage}`}
                    alt="Profile"
                    className="w-full md:p-5 p-7 h-[480px] md:h-[320px] lg:h-[380px] object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-black/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#72ebc2] animate-pulse" />
                    <span className="text-[10px]">2 Projects</span>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h1 className="text-xl font-bold tracking-tight">{profileData?.name}</h1>
                  <p className="text-[#72ebc2] text-xs font-medium mt-1">{profileData?.professionName}</p>
                  <div className="flex justify-center gap-3 mt-4">
                    {[SlSocialFacebook, TfiEmail, FiPhoneCall, IoLogoInstagram].map((Icon, i) => (
                      <button key={i} className="p-2 rounded-full border border-white/5 text-gray-400 hover:text-[#72ebc2] transition-all">
                        <Icon size={16} />
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-6">
                    <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs hover:bg-[#72ebc2] hover:text-black transition-all">
                      <Cloud size={14} /> Resume
                    </button>
                    <button className="py-2.5 rounded-xl bg-[#72ebc2] text-black text-xs font-bold hover:bg-[#5fd4af] transition-all">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ==================== MAIN CONTENT ==================== */}
        <main className="w-full">
          <div className="py-8 px-4 lg:px-0 pb-24 md:pb-10">
            <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>

              {/* ---- Blog details খোলা থাকলে শুধু blogs section দেখাবে ---- */}
              {selectedBlog ? (
                <section id="blogs" className="scroll-mt-10">
                  <Blog
                    blogsData={blogsData}
                    selectedBlog={selectedBlog}
                    onSelectBlog={handleSelectBlog}
                    onBack={handleBackToBlogs}
                  />
                </section>
              ) : (
                // ---- Normal view: সব sections ----
                <div className="space-y-16">
                  <section id="about" className="scroll-mt-10"><AboutMe aboutData={aboutData} /></section>
                  <section id="sectionServices" className="scroll-mt-10"><ServicesSection servicesData={servicesData} /></section>
                  <section id="resume" className="scroll-mt-10"><ResumeTimeline resumeData={resumeData} /></section>
                  <section id="skills" className="scroll-mt-10"><SkillSection skillsData={skillsData} /></section>
                  <section id="projects" className="scroll-mt-10"><ProjectPage projectsData={projectsData} /></section>
                  <section id="blogs" className="scroll-mt-10">
                    <Blog
                      blogsData={blogsData}
                      selectedBlog={selectedBlog}
                      onSelectBlog={handleSelectBlog}
                      onBack={handleBackToBlogs}
                    />
                  </section>
                  <section id="clientReviews" className="scroll-mt-10"><ClientReview ClientReview={reviewsData} /></section>
                  <section id="contact" className="scroll-mt-10"><Contact profileData={profileData} /></section>
                </div>
              )}

            </Suspense>
          </div>
        </main>

        {/* ==================== DESKTOP NAVIGATION ==================== */}
        <aside className="hidden md:block">
          <div className="sticky top-4 h-[calc(100vh-2rem)] flex items-center justify-center">
            <div className="relative p-[1.6px] overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/2 bg-[#151a18] backdrop-blur-xl group">
              <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,#72ebc2_180deg,#72ebc2_270deg,transparent_360deg)]" />
              <nav className="relative bg-[#151a18f5] rounded-[22px] py-4 px-2 flex flex-col gap-6 shadow-2xl border border-white/5">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`p-3 rounded-full transition-all relative group/nav flex items-center justify-center ${
                        isActive ? "text-[#72ebc2]" : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      <item.icon className="w-5 h-5 relative z-10" />
                      <span className="absolute right-14 opacity-0 group-hover/nav:opacity-100 transition-opacity bg-[#1f1e1e] text-[#72ebc2] text-[10px] uppercase tracking-tighter py-1 px-3 rounded border border-white/10 pointer-events-none whitespace-nowrap">
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activePill"
                          className="absolute inset-0 border border-[#72ebc2] bg-[#72ebc2]/10 rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </aside>

        {/* ==================== MOBILE BOTTOM NAV ==================== */}
        <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md p-[1.6px] overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/2 bg-[#151a18] backdrop-blur-xl group z-[100]">
          <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,#72ebc2_180deg,#72ebc2_270deg,transparent_360deg)]" />
          <div className="relative bg-[#151a18f5] rounded-[22px] h-16 flex justify-around items-center border border-white/5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex flex-col items-center justify-center flex-1 h-full relative"
                >
                  <item.icon className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-[#72ebc2] scale-110" : "text-gray-500 hover:text-gray-300"}`} />
                  {isActive && (
                    <motion.div
                      layoutId="mobileActivePill"
                      className="absolute -top-[1px] w-8 h-[3px] bg-[#72ebc2] rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

      </div>
    </div>
  );
}