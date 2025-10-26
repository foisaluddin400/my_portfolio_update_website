import React from "react";

const Title = ({ title }) => {
  return (
    <div
    
      className="relative  mb-6"
    >
      <div className="w-[50px] h-[25px] rounded-full bg-gradient-to-r from-[#01ffea77]  to-[#0000002f] "></div>

      <div className="absolute text-2xl top-0 -mt-1 ml-4 ">{title}</div>
    </div>
  );
};

export default Title;
