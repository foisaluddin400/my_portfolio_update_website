'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import nn from '../../../public/img/nn.png'
import ServicesSection from './ServicesSection';
import ClientReview from './ClientReview';
import CountUp from 'react-countup';           // ← add this package
import Title from '../shared/Title';
import Image from 'next/image';

const gradients = [
  'from-[#72ebc2] via-[#4cc9f0] to-[#4895ef]',
  'from-[#a78bfa] via-[#7c3aed] to-[#4c1d95]',
  'from-[#60a5fa] via-[#3b82f6] to-[#1d4ed8]',
];

const AboutMe = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [gradientIndex, setGradientIndex] = useState(0);

  const texts = [
    "Creative Front-End Developer",
    "MERN Stack Craftsman",
    "Turning Vision into Pixel-Perfect Reality",
    "React • TypeScript • Performance Enthusiast",
    "Building Tomorrow's Web Experiences Today",
  ];

  // Better typing effect
  useEffect(() => {
    let timer;
    const current = texts[textIndex];

    if (!isDeleting && displayText.length < current.length) {
      timer = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length + 1));
      }, 60 + Math.random() * 40);
    } 
    else if (isDeleting && displayText.length > 0) {
      timer = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length - 1));
      }, 35);
    } 
    else if (!isDeleting && displayText.length === current.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } 
    else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
      setGradientIndex((prev) => (prev + 1) % gradients.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex]);

  // Auto change gradient every full cycle
  useEffect(() => {
    const t = setInterval(() => {
      setGradientIndex(i => (i + 1) % gradients.length);
    }, 12000);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { end: 100, suffix: "%", label: "Client Satisfaction" },
    { end: 38,  suffix: "+", label: "Loved Reviews" },
    { end: 30,  suffix: "+", label: "Projects Delivered" },
    { end: 2,   suffix: "+", label: "Years Focused Journey" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const item = {
    hidden: { opacity: 0, y: 35 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  const refs = [useRef(), useRef(), useRef(), useRef()];
  const inViews = refs.map(ref => useInView(ref, { once: true, amount: 0.25 }));

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="relative overflow-hidden"
    >
   

      {/* =================== HERO =================== */}
      <div className='lg:grid grid-cols-2'>
        <motion.div ref={refs[0]} className=" ">
        <motion.div variants={item}>
          <Title title="About Me" fancy />
        </motion.div>

        <div className="mt-10 md:mt-16">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-3xl lg:text-2xl xl:text-4xl font-bold tracking-tight leading-tight"
            variants={item}
          >
            Hi, I'm a{"\n"}
            <span className={`bg-gradient-to-r ${gradients[gradientIndex]} bg-clip-text text-transparent inline-block min-w-[20ch]`}>
              {displayText}
              <span className="animate-blink-fast">|</span>
            </span>
          </motion.h1>

          <motion.div 
            variants={item}
            className="mt-8 md:mt-12 max-w-3xl space-y-6 text-gray-400/90 text-lg md:text-xl leading-relaxed"
          >
            <p>
              Passionate <strong className="text-white/90">MERN stack</strong> developer focused on creating 
              <span className="text-white/80"> beautiful</span>, <span className="text-white/80">fast</span> and 
              <span className="text-white/80"> intuitive</span> digital experiences.
            </p>
            
            <p>
              I specialize in React, Next.js, TypeScript, TailwindCSS, Framer Motion 
              and love turning complex ideas into clean, maintainable, and delightful interfaces.
            </p>
          </motion.div>
        </div>
      
      </motion.div>
        <Image src={nn} alt='df'/>
      </div>

      {/* =================== STATS =================== */}
      <motion.div 
        ref={refs[1]}
        variants={item}
        className="mt-20 md:mt-11"
      >
        <div className="">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 py-6 md:py-5 rounded-2xl bg-gradient-to-b from-white/5 to-white/2 backdrop-blur-xl border border-white/10">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="text-4xl md:text-5xl lg:text-5xl font-bold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                  <CountUp
                    end={stat.end}
                    duration={2.2}
                    delay={0.4 + i * 0.15}
                    enableScrollSpy
                    scrollSpyDelay={300}
                  />
                  {stat.suffix}
                </div>
                <div className="mt-3 text-sm md:text-base text-gray-400/80 font-medium group-hover:text-cyan-400/90 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      

      {/* Services & Reviews */}
      <div ref={refs[2]} className="">
        <ServicesSection />
      </div>

      <div ref={refs[3]} className="">
        <ClientReview />
      </div>

      {/* Simple blinking cursor style */}
      <style jsx global>{`
        @keyframes blink-fast {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink-fast {
          animation: blink-fast 0.7s infinite;
        }
      `}</style>
    </motion.section>
  );
};

export default AboutMe;