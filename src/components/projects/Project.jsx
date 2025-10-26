"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "antd";
import {
  CodeOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import projectPic from "../../../public/cover.jpg";
import Title from "../shared/Title";

export default function ProjectPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Project One",
      description: "This is a short description of Project One.",
      image: projectPic,
      codeLink: "https://github.com/username/project-one",
      previewLink: "https://project-one-demo.com",
      details: "This is the full detailed description of Project One...",
    },
    {
      id: 2,
      title: "Project Two",
      description: "This is a short description of Project Two.",
      image: projectPic,
      codeLink: "https://github.com/username/project-two",
      previewLink: "https://project-two-demo.com",
      details: "This is the full detailed description of Project Two...",
    },
  ];

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div>
      <Title title={"My Projects"}></Title>
      <div className=" grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {projects.map((project) => (
          <div
            style={{
              borderTop: "1px solid transparent",
              borderRight: "1px solid transparent",
              borderBottom: "1px solid transparent",
              borderLeft: "1px solid transparent",
              borderImage:
                "linear-gradient(to right, rgb(65, 65, 65), rgba(22, 22, 22, 0)) 1",
            }}
            key={project.id}
            className="relative group overflow-hidden"
          >
            {/* Project Image */}
            <div className="relative w-full h-64 overflow-hidden ">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Icons */}
              <div className="absolute inset-0 flex items-center gap-4 justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer">
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#72ebc2] w-[50px] h-[50px] flex justify-center items-center rounded-full text-[#72ebc2] text-xl hover:scale-110 transition transform"
                >
                  <CodeOutlined />
                </a>
                <a
                  href={project.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#72ebc2] w-[50px] h-[50px] flex justify-center items-center rounded-full text-[#72ebc2] text-xl hover:scale-110 transition transform"
                >
                  <EyeOutlined />
                </a>
              </div>
            </div>

            {/* Title & Description */}
            <div className="p-4 flex flex-col gap-2 relative">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  {project.title}
                </h3>
                {/* Always visible Details Icon */}
                <button
                  onClick={() => openModal(project)}
                  className="text-white text-xl hover:text-cyan-400 transition"
                >
                  <InfoCircleOutlined />
                </button>
              </div>
              <p className="text-gray-400">{project.description}</p>
            </div>
          </div>
        ))}

        {/* Project Details Modal */}
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
          {selectedProject && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                {selectedProject.title}
              </h2>
              <p className="text-gray-300">{selectedProject.details}</p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
