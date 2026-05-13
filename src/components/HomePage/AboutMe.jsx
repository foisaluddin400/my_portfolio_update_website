"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import nn from "../../../public/img/nn.png";
import ServicesSection from "./ServicesSection";
import ClientReview from "./ClientReview";
import CountUp from "react-countup"; // ← add this package
import Title from "../shared/Title";
import Image from "next/image";

const gradients = [
  "from-[#72ebc2] via-[#4cc9f0] to-[#4895ef]",
  "from-[#a78bfa] via-[#7c3aed] to-[#4c1d95]",
  "from-[#60a5fa] via-[#3b82f6] to-[#1d4ed8]",
];

const AboutMe = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [gradientIndex, setGradientIndex] = useState(0);

  const texts = [
    "Full Stack Web and Mobile App",
  ];

  // Better typing effect
  useEffect(() => {
    let timer;
    const current = texts[textIndex];

    if (!isDeleting && displayText.length < current.length) {
      timer = setTimeout(
        () => {
          setDisplayText(current.slice(0, displayText.length + 1));
        },
        60 + Math.random() * 40,
      );
    } else if (isDeleting && displayText.length > 0) {
      timer = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length - 1));
      }, 35);
    } else if (!isDeleting && displayText.length === current.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
      setGradientIndex((prev) => (prev + 1) % gradients.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex]);

  // Auto change gradient every full cycle
  useEffect(() => {
    const t = setInterval(() => {
      setGradientIndex((i) => (i + 1) % gradients.length);
    }, 12000);
    return () => clearInterval(t);
  }, []);

  const stats = [
    
    { end: 38, suffix: "+", label: "Loved Reviews" },
    { end: 30, suffix: "+", label: "Projects Delivered" },
    { end: 2, suffix: "+", label: "Years Focused Journey" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 35 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const refs = [useRef(), useRef(), useRef(), useRef()];
  const inViews = refs.map((ref) =>
    useInView(ref, { once: true, amount: 0.25 }),
  );

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="relative overflow-hidden"
    >
      {/* =================== HERO =================== */}
      <div className="lg:grid grid-cols-4">
        <motion.div ref={refs[0]} className="col-span-3 ">
          <motion.div variants={item}>
            <Title title="About Me" fancy />
          </motion.div>

          <div className="mt-10 md:mt-5">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-3xl lg:text-2xl xl:text-3xl font-bold "
              variants={item}
            >
              Hi, I'm a{"\n"}
              <h1
                className={`bg-gradient-to-r ${gradients[gradientIndex]} bg-clip-text text-transparent inline-block tracking-tight leading-tight min-h-[80px]`}
              >
                {displayText}
                <span className="animate-blink-fast">|</span>
              </h1>
            </motion.h1>

            <motion.div
              variants={item}
              className="mt-8 md:mt-7 max-w-3xl space-y-6 text-gray-400/90 text-lg md:text-base leading-relaxed"
            >
              <p>
                Passionate <strong className="text-white/90">MERN stack</strong>{" "}
                developer focused on creating
                <span className="text-white/80"> beautiful</span>,{" "}
                <span className="text-white/80">fast</span> and
                <span className="text-white/80"> intuitive</span> digital
                experiences.
              </p>

              <p>
                I specialize in React, Next.js, TypeScript, TailwindCSS, Framer
                Motion and love turning complex ideas into clean, maintainable,
                and delightful interfaces.
              </p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="flex items-center col-span-1 justify-center h-full relative">
          {/* Outer rotating circle */}
          <motion.div
            className="w-20 h-20 rounded-full border border-cyan-400/30 flex items-center justify-center relative"
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Inner pulse dot */}
            <motion.div
              className="w-3 h-3  bg-cyan-400 rounded-full"
              animate={{ scale: [1, 1.8, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Scroll arrow bottom */}
          <motion.div
            className="absolute  flex flex-col items-center text-cyan-300"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            
            <div className="w-[1px] h-6 bg-cyan-300/50 mt-1"></div>
            <div className="text-lg">↓</div>
          </motion.div>
        </motion.div>
      </div>

      {/* =================== STATS =================== */}
      <motion.div ref={refs[1]} variants={item} className="mt-20 md:mt-11">
        <div className="">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 py-6 md:py-5 ">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="text-4xl md:text-5xl lg:text-5xl font-bold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text  text-[#72ebc2]">
                  <CountUp
                    end={stat.end}
                    duration={2.2}
                    delay={0.4 + i * 0.15}
                    enableScrollSpy
                    scrollSpyDelay={300}
                  />
                  {stat.suffix}
                </div>
                <div className="mt-3 text-sm md:text-base text-gray-600/80 font-medium group-hover:text-cyan-400/90 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes blink-fast {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-blink-fast {
          animation: blink-fast 0.7s infinite;
        }
      `}</style>
    </motion.section>
  );
};

export default AboutMe;
