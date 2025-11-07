"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { EyeOutlined, ArrowLeftOutlined, SendOutlined } from "@ant-design/icons";
import Title from "../shared/Title";
import { motion, useInView } from "framer-motion";
import blog1 from "../../../public/blog1.png";
import blog2 from "../../../public/blog2.png";
import blog3 from "../../../public/blog3.png";
import blog4 from "../../../public/blog4.png";
import blog5 from "../../../public/blog5.png";
import blog6 from "../../../public/blog6.png";
import blog7 from "../../../public/blog7.png";
import blog8 from "../../../public/blog8.png";
import blog9 from "../../../public/blog9.png";

import blog11 from "../../../public/blog11.png";
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

/* --------------------------------------------------------------- */
/* Blog Card                                                       */
/* --------------------------------------------------------------- */
const BlogCard = ({ item, onViewDetails }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-col overflow-hidden p-3 group relative border rounded-xl transition-all duration-300"
      style={{
        borderTop: "1px solid transparent",
        borderRight: "1px solid transparent",
        borderBottom: "1px solid transparent",
        borderLeft: "1px solid transparent",
        borderImage:
          "linear-gradient(to right, rgb(65, 65, 65), rgba(22, 22, 22, 0)) 1",
      }}
    >
      {/* Image */}
      <motion.div
        variants={childVariants}
        className="relative w-full h-[440px] mb-6 overflow-hidden rounded-lg"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          onClick={() => onViewDetails(item)}
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
      </motion.div>

      {/* Text */}
      <motion.div variants={childVariants} className="flex flex-col gap-3">
        <motion.span
          variants={childVariants}
          className="px-3 py-1 border border-[#72ebc2] text-[#72ebc2] text-sm font-medium rounded w-fit"
        >
          {item.date}
        </motion.span>
        <motion.h3
          variants={childVariants}
          className="text-xl font-bold text-white"
        >
          {item.title}
        </motion.h3>
        <motion.p
          variants={childVariants}
          className="text-slate-400 text-sm leading-relaxed line-clamp-3"
        >
          {item.description}
        </motion.p>
        <motion.div variants={childVariants} className="flex gap-2 flex-wrap">
          {item.tags?.map((tag, i) => (
            <motion.button
              key={i}
              variants={childVariants}
              className="border border-[#3f3f3fbe] rounded px-2 text-[#707070e1] text-sm"
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* --------------------------------------------------------------- */
/* Comment Section Component                                       */
/* --------------------------------------------------------------- */
const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", comment: "" });
  const [loading, setLoading] = useState(false);

  // Load comments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`comments_${blogId}`);
    if (saved) setComments(JSON.parse(saved));
  }, [blogId]);

  // Save to localStorage
  const saveComments = (newComments) => {
    localStorage.setItem(`comments_${blogId}`, JSON.stringify(newComments));
    setComments(newComments);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.comment) return;

    const newComment = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      comment: form.comment,
      date: new Date().toISOString(),
    };

    setLoading(true);
    setTimeout(() => {
      saveComments([newComment, ...comments]);
      setForm({ name: "", email: "", comment: "" });
      setLoading(false);
    }, 500);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="mt-12 border-t border-gray-700 pt-8">
       <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet. Be the first!</p>
        ) : (
          comments.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 p-4  border-b border-gray-800 "
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#72ebc2] to-[#5fd6a8] flex items-center justify-center text-black font-bold text-lg">
                {c.name.charAt(0).toUpperCase()}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="font-medium text-white">{c.name}</span>
                  <span>•</span>
                  <span>{formatDate(c.date)}</span>
                </div>
                <p className="mt-1 text-gray-300">{c.comment}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mt-6 mb-5">Comments ({comments.length})</h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-10 bg-white/5 p-4 rounded-lg shadow border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{
                  borderBottom: '1px solid transparent',
                  borderImage:
                    'linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
                }}
                className="bg-transparent p-3 rounded placeholder-gray-400 focus:outline-none focus:border-[#72ebc2]"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
           style={{
                  borderBottom: '1px solid transparent',
                  borderImage:
                    'linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
                }}
                className="bg-transparent p-3 rounded placeholder-gray-400 focus:outline-none focus:border-[#72ebc2]"
            required
          />
        </div>
        <textarea
          placeholder="Write your comment..."
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          rows={4}
              style={{
                  borderBottom: '1px solid transparent',
                  borderImage:
                    'linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
                }}
          className="w-full px-4 py-3 bg-transparent placeholder-gray-400 focus:outline-none focus:border-[#72ebc2]"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-[#72ebc2] text-black font-medium rounded-lg hover:bg-[#5fd6a8] transition disabled:opacity-70"
        >
          <SendOutlined />
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </form>

      {/* Comments List */}
     
    </div>
  );
};

/* --------------------------------------------------------------- */
/* Main Blog Component                                             */
/* --------------------------------------------------------------- */
export default function Blog() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  /* ✅ Your full dummy blog data */
  const blogs = [
    {
      id: 10,
      title: "The Real Struggle Behind Becoming a Web Developer",
      image: blog9,
      date: "July 10, 2025",
      description:
        "Behind every successful web developer is a story of failure, patience, and perseverance. Here’s mine.",
      longDescription: `
Becoming a developer isn’t just about learning to code — it’s about building a problem-solving mindset.
In this post, I share my personal journey: facing endless bugs, sleepless nights, and constant learning.
**Key Lesson:** Consistency and curiosity are more powerful than talent.
  `,
      tags: ["Motivation", "Developer Life", "Career Growth"],
      technology: ["Life Experience", "Web Development"],
      social: {
        linkedin: "https://linkedin.com/in/momtajuddin",
        twitter: "https://twitter.com/momtajuddin",
      },
      anotherImage: blog9,
      detailsDescription:
        "A motivational story for aspiring developers to stay consistent and keep learning.",
    },

    {
      id: 3,
      title: "CRUD Application with MERN Stack",
      description:
        "Building a complete CRUD application using MongoDB, Express, React, and Node.js.",
      date: "2025-09-15",
      image: blog2,
      longDescription: `
Developed a **full-stack CRUD application** to manage tasks efficiently.
Users can create, read, update, and delete tasks with authentication.
Focused on creating reusable components in React and API endpoints in Node.js/Express.
    `,
      tags: ["MERN", "CRUD", "Full-Stack"],
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
        "Postman",
      ],
      socialIcons: ["FaGithub", "FaLinkedin"],
      additionalImages: [blog2, blog2],
      extraDescription: `
Handled backend validations, API optimization, and frontend error handling.
Implemented JWT-based authentication and secure routes.
    `,
    },
    {
      id: 4,
      title: "Next.js E-commerce Website: Dynamic Product Management",
      description:
        "Building a responsive e-commerce website with Next.js, Tailwind CSS, and MongoDB.",
      date: "2025-08-30",
      image: blog3,
      longDescription: `
This project involved creating a **dynamic e-commerce platform**.
Implemented product listings, search and filter functionality, shopping cart, and payment gateway integration.
The focus was on **performance, SEO, and responsive UI**.
    `,
      tags: ["Next.js", "E-commerce", "MongoDB", "Tailwind CSS"],
      technologies: [
        "Next.js",
        "Tailwind CSS",
        "MongoDB",
        "Stripe API",
        "Vercel",
      ],
      socialIcons: ["FaTwitter", "FaLinkedin"],
      additionalImages: [blog3, blog3],
      extraDescription: `
Challenges included managing state for the cart, integrating secure payment, and ensuring SEO-friendly pages.
Deployed the website on Vercel for live testing.
    `,
    },

    {
      id: 11,
      title: "Next.js 15 – What’s New and Why It’s a Game Changer",
      image: blog11,
      date: "November 1, 2025",
      description:
        "Next.js 15 introduces server actions, turbo pack, and an improved cache system — redefining modern web development.",
      longDescription: `
Next.js 15 brings revolutionary features like **Server Actions**, **Partial Rendering**, and **TurboPack**.
These updates boost performance, enhance developer experience, and simplify caching strategies.
In this blog, I break down how to integrate these new features into your projects effectively.
  `,
      tags: ["Next.js", "React", "Web Performance"],
      technology: ["Next.js 15", "React", "Vercel"],
      social: {
        github: "https://github.com/foisal/next15-features",
        linkedin: "https://linkedin.com/in/momtajuddin",
      },
      anotherImage: blog11,
      detailsDescription:
        "A deep dive into the latest Next.js 15 updates and their real-world applications.",
    },
    {
      id: 5,
      title: "Building Realtime Chat App with Socket.io",
      description:
        "A realtime chat application using React, Node.js, and Socket.io with multiple chat rooms.",
      date: "2025-07-12",
      image: blog4,
      longDescription: `
Created a **realtime chat app** to enable instant messaging between users.
Implemented multiple chat rooms, online/offline indicators, and message history using MongoDB.
Frontend was built with React and styled using Tailwind CSS.
    `,
      tags: ["React", "Socket.io", "Realtime", "Chat App"],
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.io",
        "Tailwind CSS",
      ],
      socialIcons: ["FaGithub", "FaLinkedin", "FaTwitter"],
      additionalImages: [blog4, blog4],
      extraDescription: `
Handled real-time events with Socket.io, optimized message storage, and maintained scalability.
Designed a clean and intuitive chat interface.
    `,
    },
    {
      id: 6,
      title: "Implementing Role-Based Authentication in Web Apps",
      description:
        "A technical guide on building secure, role-based authentication systems with MERN stack.",
      date: "2025-06-25",
      image: blog5,
      longDescription: `
This tutorial demonstrates how to implement **role-based authentication (RBAC)** in full-stack applications.
Users are assigned roles like Admin, Moderator, or User, each with specific permissions.
Backend built with Node.js/Express.js, JWT authentication, and MongoDB.
Frontend uses React to display role-specific dashboards.
    `,
      tags: ["MERN", "JWT", "RBAC", "Security"],
      technologies: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
        "React",
        "Tailwind CSS",
      ],
      socialIcons: ["FaLinkedin", "FaGithub"],
      additionalImages: [blog5, blog5],
      extraDescription: `
Explained step-by-step setup of JWT tokens, middleware for role verification, and frontend role handling.
Focus on security best practices and maintaining scalable code.
    `,
    },
    {
      id: 7,
      title: "Overcoming State Management Complexity in React",
      image: blog6,
      date: "November 5, 2025",
      description:
        "Managing large-scale React states can be challenging. Here’s how I solved state synchronization using Redux Toolkit and Context API together.",
      longDescription: `
When React projects grow larger, prop drilling and state synchronization often become a nightmare.
I implemented a hybrid approach using Redux Toolkit and Context API to create a unified and centralized store.
This improved both maintainability and performance.

**Challenges:** prop drilling, async data sync, debugging.  
**Solutions:** Redux slices, immer for immutability, and middleware logging.
  `,
      tags: ["React", "Redux Toolkit", "State Management"],
      technology: ["React", "Redux Toolkit", "Context API"],
      social: {
        github: "https://github.com/foisal/state-solution",
        linkedin: "https://linkedin.com/in/momtajuddin",
        twitter: "https://twitter.com/momtajuddin",
      },
      anotherImage: blog6,
      detailsDescription:
        "This blog explains state flow, async actions, and performance optimization in React applications.",
    },
    {
      id: 8,
      title: "Optimizing MongoDB Queries for Fast API Response",
      image: blog7,
      date: "October 22, 2025",
      description:
        "Reducing API response time was my main target. Here’s how I improved speed using MongoDB indexes, aggregation pipelines, and lean queries.",
      longDescription: `
While working with the MERN stack, heavy API requests were causing slow responses.
I optimized MongoDB queries by adding proper indexes, using aggregation pipelines, and calling lean() to reduce Mongoose overhead.
The result: response time improved from 2.8s to 480ms.
  `,
      tags: ["Node.js", "MongoDB", "Backend Performance"],
      technology: ["Express.js", "MongoDB", "Mongoose"],
      social: {
        github: "https://github.com/foisal/mongo-optimization",
        linkedin: "https://linkedin.com/in/momtajuddin",
      },
      anotherImage: blog7,
      detailsDescription:
        "A complete backend performance tuning guide for scalable API development.",
    },
    {
      id: 9,
      title: "Integrate JWT Authentication in MERN Stack",
      image: blog8,
      date: "August 28, 2025",
      description:
        "Learn how to create a secure authentication system in MERN Stack using JWT, bcrypt, and React Context.",
      longDescription: `
Authentication is the backbone of any web app.
In this blog, I demonstrate how to implement JWT authentication — from generating tokens to verifying and protecting routes.
**Backend:** Express.js, bcrypt, jsonwebtoken  
**Frontend:** React context + Axios interceptor  
Includes best practices for token expiry and route protection.
  `,
      tags: ["MERN", "Authentication", "Security"],
      technology: ["Node.js", "Express.js", "MongoDB", "React"],
      social: {
        github: "https://github.com/foisal/jwt-auth-mern",
        linkedin: "https://linkedin.com/in/momtajuddin",
      },
      anotherImage: blog8,
      detailsDescription:
        "A complete, practical guide to building secure authentication in MERN stack.",
    },

    {
      id: 1,
      title: "Building a Profitable Multi-Role Marketplace",
      description:
        "A full-featured MERN stack marketplace connecting sellers, buyers, investors, and brokers.",
      date: "2025-11-07",
      image: blog9,
      longDescription: `
This project is a **MERN stack-based business marketplace** designed to connect sellers, buyers, investors, brokers, and other stakeholders. 
The platform allows users to buy, sell, and invest in businesses, franchises, and assets while maintaining a **secure, role-based access control system**.
I focused on building **dynamic dashboards, analytics modules, and cloud-based asset management** systems to provide a professional user experience. 
The architecture is **fully asynchronous**, **scalable**, and optimized for performance, ensuring smooth operations even with high concurrent users.
      `,
      additionalImages: [
        {
          src: blog9,
          desc: "Admin Dashboard: The admin panel includes analytics, user management, and platform monitoring with role-based access control.",
        },
        {
          src: blog9,
          desc: "Seller Interface: Sellers can list businesses, manage pricing, track inquiries, and receive notifications on transactions.",
        },
      ],
      extraDescription: `
Challenges included implementing **multi-role authentication**, optimizing MongoDB queries for large datasets, and creating **responsive dashboards**.
I solved these issues by using **JWT for secure access**, **middleware for role verification**, and **asynchronous API routes** for fast performance.
This project strengthened my understanding of **full-stack architecture, security, and scalable web applications**.
      `,
      tags: ["MERN", "Next.js", "Tailwind CSS", "Business Platform"],
      technologies: [
        "Next.js",
        "Tailwind CSS",
        "Ant Design",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
      ],
      socialIcons: ["FaLinkedin", "FaTwitter", "FaGithub"],
    },
  ];

  const handleViewDetails = (item) => {
    setSelectedBlog(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="">
      {selectedBlog ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className=""
        >
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#72ebc2] hover:text-white transition-colors mb-6"
          >
            <ArrowLeftOutlined /> Back to All Blogs
          </button>

          <div className="relative w-full h-[60vh] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={selectedBlog.image}
              alt={selectedBlog.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4 mt-6">
            <span className="inline-block px-3 py-1 border border-[#72ebc2] text-[#72ebc2] text-sm font-medium rounded">
              {selectedBlog.date}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {selectedBlog.title}
            </h1>
            <p className="text-slate-300 leading-relaxed text-base whitespace-pre-wrap">
              {selectedBlog.longDescription}
            </p>

            {/* Additional Images Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {selectedBlog.additionalImages?.map((img, i) => (
                <div
                  key={i}
                  className="relative w-full h-72 rounded-lg overflow-hidden"
                >
                  <Image
                    src={img.src}
                    alt={img.desc}
                    fill
                    className="object-cover"
                  />
                  <p className="absolute bottom-0 bg-black/60 text-white text-sm p-2">
                    {img.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Extra Description */}
            <p className="text-slate-300 mt-6 whitespace-pre-wrap">
              {selectedBlog.extraDescription}
            </p>
          </div>
          <CommentSection blogId={selectedBlog.id} />
        </motion.div>
      ) : (
        <>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <Title title={"My Blogs"} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-5">
            {blogs.map((item) => (
              <BlogCard
                key={item.id}
                item={item}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
