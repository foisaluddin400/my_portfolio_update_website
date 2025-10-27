'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Modal } from 'antd';
import {
  CodeOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import projectPic from '../../../public/cover.jpg';
import Title from '../shared/Title';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import project1 from '../../../public/img/project_1.png'
import project2 from '../../../public/img/project_2.png'
import project3 from '../../../public/img/project_3.jpg'
import project4 from '../../../public/img/project_4.png'
// ProjectCard component to render individual project cards
const ProjectCard = ({ project, onOpenModal }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  // Animation variants for project cards
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
  };

  // Animation variants for child elements
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{
        borderTop: '1px solid transparent',
        borderRight: '1px solid transparent',
        borderBottom: '1px solid transparent',
        borderLeft: '1px solid transparent',
        borderImage:
          'linear-gradient(to right, rgb(65, 65, 65), rgba(22, 22, 22, 0)) 1',
      }}
      className="relative group overflow-hidden"
    >
      {/* Project Image */}
      <motion.div
        variants={childVariants}
        className="relative w-full h-60 m-2 overflow-hidden"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
        />
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
      </motion.div>

      {/* Title & Description */}
      <motion.div
        variants={childVariants}
        className="p-4 flex flex-col gap-2 relative"
      >
        <motion.div
          variants={childVariants}
          className="flex items-center justify-between"
        >
          <motion.h3
            variants={childVariants}
            className="text-xl font-bold text-white"
          >
            {project.title}
          </motion.h3>
          <motion.button
            variants={childVariants}
            onClick={() => onOpenModal(project)}
            className="text-white text-xl hover:text-cyan-400 transition"
          >
            <InfoCircleOutlined />
          </motion.button>
        </motion.div>
        <motion.p
          variants={childVariants}
          className="text-gray-400 line-clamp-2"
        >
          {project.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default function ProjectPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Profitable Businesses for Sale',
      description: 'A comprehensive platform to buy and sell profitable businesses with detailed listings and analytics.',
      image: project1,
      codeLink: 'https://github.com/username/project-one',
      previewLink: 'https://profitablebusinessesforsale.com',
      details: 'This is the full detailed description of Project One...',
    },
    {
      id: 2,
      title: 'Cathy\'s Jewelry',
      description: 'An elegant e-commerce website for Cathy\'s Jewelry, showcasing a wide range of exquisite jewelry pieces with seamless shopping experience.',
      image: project2,
      codeLink: 'https://github.com/username/project-two',
      previewLink: 'https://cathysjewelry.net',
      details: 'This is the full detailed description of Project Two...',
    },
       {
      id: 3,
      title: 'Kids Know Rights',
      description: 'An educational platform dedicated to teaching children about their rights through interactive content and resources.',
      image: project3,
      codeLink: 'https://github.com/username/project-two',
      previewLink: 'https://kidsknowrights.com/',
      details: 'This is the full detailed description of Project Two...',
    },
       {
      id: 4,
      title: 'Pending Project',
      description: 'This is a short description of Project Two.',
      image: project4,
      codeLink: 'https://github.com/username/project-two',
      previewLink: 'https://project-two-demo.com',
      details: 'This is the full detailed description of Project Two...',
    },
  ];

  // Animation variants for section
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
  };

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
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <Title title={'My Projects'} />
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpenModal={openModal} />
        ))}
      </div>

      {/* Project Details Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
        bodyStyle={{
          background: '#1a1a1a',
          color: 'white',
          borderRadius: '12px',
          margin: '-20px -5px',
        }}
        closeIcon={
          <CloseOutlined
            style={{
              color: '#72ebc2',
              background: 'black',
              border: '1px solid #72ebc2',
              borderRadius: '50%',
              padding: '4px',
              fontSize: '16px',
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
  );
}