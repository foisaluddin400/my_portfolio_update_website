"use client";
import { Suspense, useEffect } from "react";
import HomePage from "@/components/HomePage/HomePage";

export default function Home() {
  useEffect(() => {
    const lines = document.querySelectorAll("#cyberlines line");

    const animate = () => {
      // lines move slowly downward
      lines.forEach((line) => {
        const y1 = parseFloat(line.getAttribute("y1"));
        const y2 = parseFloat(line.getAttribute("y2"));
        let newY1 = y1 + 1;
        let newY2 = y2 + 1;
        if (newY1 > 1080) newY1 = 0;
        if (newY2 > 1080) newY2 = 0;
        line.setAttribute("y1", newY1);
        line.setAttribute("y2", newY2);
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#222222] via-[#0f0f0f] to-[#252525] bg-cover bg-center"
    >
      {/* 🌌 Cyberline animated layer */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          id="cyberlines"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
          className="w-full h-full opacity-80 blur-[0.5px]"
        >
          <g className="lines" stroke="#72ebc2" strokeWidth="1.3">
            {[...Array(25)].map((_, i) => (
              <line
                key={i}
                x1={Math.random() * 1920}
                y1={Math.random() * 1080}
                x2={Math.random() * 1920}
                y2={Math.random() * 1080}
                opacity={0.3 + Math.random() * 0.6}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* ✨ Subtle dark overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>

      {/* 🌟 Main content */}
      <div className="relative z-10 font-clash">
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <HomePage />
        </Suspense>
      </div>
    </div>
  );
}
