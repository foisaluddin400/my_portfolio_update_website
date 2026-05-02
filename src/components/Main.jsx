"use client";
import { Suspense, useEffect } from "react";
import HomePage from "@/components/HomePage/HomePage";

export default function Main() {


  return (
    <div className=" bg-[#111816] bg-cover bg-center">
    
  

    
 

      {/* 🌟 Main content */}
      <div className=" z-10 font-clash">
        <Suspense
          fallback={<div className="text-center py-8">Loading...</div>}
        >
          <HomePage />
        </Suspense>
      </div>
    </div>
  );
}
