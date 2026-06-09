import React from 'react'

import { FaArrowLeft } from "react-icons/fa";

import { useRouter } from 'next/navigation';

export const Navigate = ({title}) => {
    const route = useRouter();
  return (
    <div className='font-montserrat'>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1
            onClick={() => route.back()}
            className="flex gap-3 cursor-pointer"
          >
            <button className="border mt-[5px] text-sm w-5 h-5 rounded-full flex justify-center items-center text-white">
              <FaArrowLeft></FaArrowLeft>
            </button>
            <span className="text-lg text-white italic text-[16px]">{title}</span>
          </h1>
          
        </div>
    </div>
  )
}
