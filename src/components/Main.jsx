"use client";
import { Suspense, useEffect } from "react";
import HomePage from "@/components/HomePage/HomePage";

export default function Main() {


  return (
    <div className="relative min-h-screen overflow-hidden bg-[#161616] bg-cover bg-center">
    
  

    
 

      {/* 🌟 Main content */}
      <div className="relative z-10 font-clash">
        <Suspense
          fallback={<div className="text-center py-10">Loading...</div>}
        >
          <HomePage />
        </Suspense>
      </div>
    </div>
  );
}
