"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import cover from "../../../public/cover.jpg";
import Title from "../shared/Title";

export default function Blog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const portfolioItems = [
    {
      id: 1,
      image: cover,
      date: "April 28, 2020",
      title: "A Song And Dance Act",
      description:
        "Ex audire suavitate has, ei quodsi tacimates sapientem Ex audire suavitate has, ei quodsi tacimates sapientem sed, Ex audire suavitate has, ei quodsi tacimates sapientem sed, Ex audire suavitate has, ei quodsi tacimates sapientem Ex audire suavitate has, ei quodsi tacimates sapientem sed, pri zril ubique ut. Te cule tation munere noluisse. Enim... sed, pri zril ubique ut. Te cule tation munere noluisse. Enim... pri zril ubique ut. Te cule tation munere noluisse. Enim... pri zril ubique ut. Te cule tation munere noluisse. Enim... sed, pri zril ubique ut. Te cule tation munere noluisse. Enim...",
    },
    {
      id: 2,
      image: cover,
      date: "May 10, 2020",
      title: "Designing the Perfect Layout",
      description:
        "Mea ex primis delicata, vix ne oblique civibus. Id cum bonorum nominavi, ex vel odio vitae officiis definiebas.",
    },
  ];

  const showModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className=" ">
      <Title title={"My Blogs"}></Title>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {portfolioItems.map((item) => (
          <div
            style={{
              borderTop: "1px solid transparent",
              borderRight: "1px solid transparent",
              borderBottom: "1px solid transparent",
              borderLeft: "1px solid transparent",
              borderImage:
                "linear-gradient(to right, rgb(65, 65, 65), rgba(22, 22, 22, 0)) 1",
            }}
            key={item.id}
            className="flex flex-col overflow-hidden p-3 group relative border rounded-xl transition-all duration-300"
          >
            {/* Image Section */}
            <div className="relative w-full h-[440px] mb-6 overflow-hidden rounded-lg">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Icon */}
              <div
                onClick={() => showModal(item)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer"
              >
                <EyeOutlined
                  style={{
                    fontSize: "2rem",
                    color: "white",
                    transform: "scale(0.8)",
                    transition: "transform 0.3s ease",
                  }}
                  className="group-hover:scale-110"
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="flex flex-col gap-3">
              <span className="px-3 py-1 border border-[#72ebc2] text-[#72ebc2] text-sm font-medium rounded w-fit">
                {item.date}
              </span>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                {item.description}
              </p>
              <div className="flex gap-2">
                <button className="border border-[#3f3f3fbe] rounded px-2 text-[#707070e1] text-sm">React Js</button>
                <button className="border border-[#3f3f3fbe] rounded px-2 text-[#707070e1] text-sm">React Js</button>
                <button className="border border-[#3f3f3fbe] rounded px-2 text-[#707070e1] text-sm">React Js</button>

                
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ant Design Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
        bodyStyle={{
          background: "#1a1a1a",
          color: "white",
          borderRadius: "12px",
          margin: -20 - 5,
        }}
        closeIcon={
          <CloseOutlined
            style={{
              color: "#72ebc2", // Cross icon white
              background: "black", // Background black
              border: "1px solid #72ebc2", // White border
              borderRadius: "50%", // Circular background
              padding: "4px", // Thoda space icon er char pashe
              fontSize: "16px",
           
            }}
          />
        }
      >
        {selectedItem && (
          <div className="overflow-hidden rounded-2xl">
            {/* Modal Image */}
            <div className="relative w-full h-64">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="p-6 flex flex-col gap-3">
              <span className="px-3 py-1 border border-[#72ebc2] text-[#72ebc2] text-sm font-medium rounded w-fit">
                {selectedItem.date}
              </span>
              <h3 className="text-2xl font-bold text-white">
                {selectedItem.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedItem.description}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
