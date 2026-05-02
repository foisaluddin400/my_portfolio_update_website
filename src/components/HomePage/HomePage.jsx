"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Cloud } from "lucide-react";
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

// Assets & Components
import profile from "../../../public/profile.png";
import AboutMe from "./AboutMe";
import { ResumeTimeline } from "../resume/Resume";
import Blog from "../blogs/Blog";
import ProjectPage from "../projects/Project";
import Contact from "../contact/Contact";
import ServicesSection from "./ServicesSection";
import ClientReview from "./ClientReview";
import SkillSection from "../resume/Skill";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("about");

  const navItems = [
    { icon: User, id: "about", label: "About" },
    { icon: User, id: "sectionServices", label: "Services" },
    { icon: User, id: "clientReviews", label: "Client Reviews" },
    { icon: IoSchoolOutline, id: "resume", label: "Resume" },
    { icon: IoSchoolOutline, id: "skills", label: "Skills" },
    { icon: ImBlog, id: "blogs", label: "Blog" },
    { icon: PiGooglePhotosLogoLight, id: "projects", label: "Projects" },
    { icon: IoMailOpenOutline, id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 20,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className=" text-white  selection:bg-[#72ebc2]/30">
      {/* 
         CONTAINER: Centered, Max-Width, and Grid Layout 
         Desktop: 25% (profile) | 70% (content) | 5% (nav)
      */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[25%_65%_5%] gap-12  relative">
        {/* --- 1. LEFT SECTION (Profile Card - 25%) --- */}
        <aside className="hidden md:block">
          <div className="sticky top-4 h-[calc(100vh-2rem)] flex items-center">
            {/* Main Container with 'overflow-hidden' to clip the rotating gradient */}
            <div className="relative w-full p-[1.6px] overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/2 bg-[#151a18] to-transparent backdrop-blur-xl group">
              {/* 
          1. THE ANIMATED BORDER LAYER 
          We create a large rotating square behind the content.
          The 'animate-spin-slow' handles the circular movement.
      */}
              <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,#72ebc2_180deg,#72ebc2_270deg,transparent_360deg)]" />

              {/* 
          2. THE INNER CONTENT BOX 
          This sits on top of the moving gradient, hiding everything except the 2px edge.
      */}
              <div className="relative w-full h-full bg-[#151a18f5] rounded-[22px] overflow-hidden">
                <div className="relative">
                  <Image
                    src={profile}
                    alt="Profile"
                    className="w-full p-5 h-[320px] lg:h-[380px] object-cover"
                  />

                  {/* Availability Badge */}
                  <div className="absolute top-4 right-4 bg-black/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#72ebc2] animate-pulse" />
                    <span className="text-[10px]">Available</span>
                  </div>
                </div>

                <div className="p-6 text-center">
                  <h1 className="text-xl font-bold tracking-tight">
                    Momtaj Uddin
                  </h1>
                  <p className="text-[#72ebc2] text-xs font-medium mt-1">
                    MERN Stack Developer
                  </p>

                  {/* Social Icons */}
                  <div className="flex justify-center gap-3 mt-4">
                    {[
                      SlSocialFacebook,
                      TfiEmail,
                      FiPhoneCall,
                      IoLogoInstagram,
                    ].map((Icon, i) => (
                      <button
                        key={i}
                        className="p-2 rounded-full border border-white/5 text-gray-400 hover:text-[#72ebc2] transition-all"
                      >
                        <Icon size={16} />
                      </button>
                    ))}
                  </div>

                  {/* Action Buttons */}
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

        {/* --- 2. MIDDLE SECTION (Main Content - 70%) --- */}
        <main className="w-full">
          <div className="space-y-16 py-8 pb-24 md:pb-10">
            <Suspense
              fallback={
                <div className="h-screen flex items-center justify-center">
                  Loading...
                </div>
              }
            >
              <section id="about" className="scroll-mt-10">
                <AboutMe />
              </section>
  <section id="sectionServices" className="scroll-mt-10">
               <ServicesSection />
              </section>

               


              <section id="resume" className="scroll-mt-10">
                <ResumeTimeline />
              </section>

              <section id="skills" className="scroll-mt-10">
                <SkillSection />
              </section>

 <section id="projects" className="scroll-mt-10">
                <ProjectPage />
              </section>
               
              <section id="blogs" className="scroll-mt-10">
                <Blog />
              </section>
             
              <section id="clientReviews" className="scroll-mt-10">
                <ClientReview />
              </section>
              <section id="contact" className="scroll-mt-10">
                <Contact />
              </section>
            </Suspense>
          </div>
        </main>

        {/* --- 3. RIGHT SECTION (Navigation - 5%) --- */}
        <aside className="hidden md:block">
          <div className="sticky top-4 h-[calc(100vh-2rem)] flex items-center justify-center">
            <nav className="bg-[#1f1e1e] border border-white/5 rounded-full py-1 px-1 flex flex-col gap-6 shadow-2xl">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`p-2 rounded-full transition-all relative group ${
                    activeSection === item.id
                      ? "text-[#72ebc2]"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <item.icon className="w-5 h-5 relative z-10" />
                  <span className="absolute right-14 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1f1e1e] text-[#72ebc2] text-[10px] uppercase tracking-tighter py-1 px-3 rounded border border-white/10 pointer-events-none whitespace-nowrap">
                    {item.label}
                  </span>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 border border-[#72ebc2] bg-[#72ebc2]/5 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* --- MOBILE BOTTOM NAV --- */}
        <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-16 bg-[#1f1e1e]/90 backdrop-blur-xl border border-white/10 rounded-2xl flex justify-around items-center z-[100]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex flex-col items-center justify-center flex-1 h-full relative"
              >
                <item.icon
                  className={`w-5 h-5 transition-transform ${isActive ? "text-[#72ebc2] -translate-y-1" : "text-gray-500"}`}
                />
                {isActive && (
                  <motion.div
                    layoutId="mobileActive"
                    className="absolute -top-1 w-8 h-1 bg-[#72ebc2] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
