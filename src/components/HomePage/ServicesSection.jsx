import React from "react";
import { FaLaptopCode, FaServer, FaPaintBrush } from "react-icons/fa";
import Title from "../shared/Title";
const ServicesSection = () => {
  const services = [
    {
      icon: <FaLaptopCode size={40} className="text-yellow-400 mb-3" />,
      title: "Frontend Development",
      description:
        "Crafting responsive and interactive UI with React, Tailwind CSS, and modern tools.",
    },
    {
      icon: <FaServer size={40} className="text-teal-400 mb-3" />,
      title: "Backend Development",
      description:
        "Building scalable server-side applications and APIs using Node.js and databases.",
    },
    {
      icon: <FaPaintBrush size={40} className="text-pink-400 mb-3" />,
      title: "UI/UX Design",
      description:
        "Designing visually appealing and user-friendly interfaces for better experience.",
    },
    {
      icon: <FaLaptopCode size={40} className="text-yellow-400 mb-3" />,
      title: "Frontend Development",
      description:
        "Crafting responsive and interactive UI with React, Tailwind CSS, and modern tools.",
    },
    {
      icon: <FaServer size={40} className="text-teal-400 mb-3" />,
      title: "Backend Development",
      description:
        "Building scalable server-side applications and APIs using Node.js and databases.",
    },
    {
      icon: <FaPaintBrush size={40} className="text-pink-400 mb-3" />,
      title: "UI/UX Design",
      description:
        "Designing visually appealing and user-friendly interfaces for better experience.",
    },
  ];

  return (
    <div className="mt-20">
      {/* Services Section */}
      <div className="">
        <Title title={"My Services"}></Title>
        <div className="grid grid-cols-1 lg:grid-cols-3  gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl shadow-lg text-center animate-fadeIn delay-[${idx * 100}ms] hover:scale-105 transition-all duration-300 relative"
              style={{
                borderTop: "1px solid transparent",
                borderRight: "1px solid transparent",
                borderBottom: "1px solid transparent",
                borderLeft: "1px solid transparent",
                borderImage:
                  "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
              }}
            >
              {service.icon}
              <h3 className="text-xl font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
          <style jsx>{`
            @keyframes fadeIn {
              0% {
                opacity: 0;
                transform: translateY(10px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.8s ease-out forwards;
            }
            .delay-0 {
              animation-delay: 0ms;
            }
            .delay-100 {
              animation-delay: 100ms;
            }
            .delay-200 {
              animation-delay: 200ms;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
