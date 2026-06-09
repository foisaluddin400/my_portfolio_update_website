"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Title from "../shared/Title";
import { ImageUrl } from "@/redux/Api/baseApi";
import { ArrowLeft } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const formatDate = (dateString) => {
  if (!dateString) return "Recent";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// ===================== BLOG CARD =====================
const BlogCard = ({ item, onSelect }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group relative flex flex-col bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#72ebc2]/50 transition-all duration-500 shadow-2xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={`${ImageUrl}/${item.coverImage}`}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="backdrop-blur-md bg-black/40 border border-white/10 text-[#72ebc2] px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
            {formatDate(item.createdAt)}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#72ebc2] transition-colors duration-300 leading-snug">
          {item.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
          {item.shortDescription}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {item.tags?.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] uppercase font-bold tracking-widest text-gray-500 border border-white/10 px-2 py-1 rounded group-hover:border-[#72ebc2]/30 group-hover:text-gray-300 transition-all"
            >
              #{tag}
            </span>
          ))}
        </div>
        <button
          onClick={() => onSelect(item)}
          className="px-4 py-3 bg-[#72ebc2] hover:bg-white text-black font-bold rounded-lg transition-all mt-3 w-full"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

// ===================== BLOG DETAILS =====================
const BlogDetails = ({ blog, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-[#72ebc2] transition-colors mb-6 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Blogs</span>
      </button>

      {/* Cover Image */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8">
        <img
          src={`${ImageUrl}/${blog.coverImage}`}
          alt={blog.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent" />
      </div>

      {/* Date + Tags */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-xs text-[#72ebc2] font-semibold uppercase tracking-wider">
          {formatDate(blog.createdAt)}
        </span>
        {blog.tags?.map((tag, i) => (
          <span
            key={i}
            className="text-[10px] uppercase font-bold tracking-widest text-gray-500 border border-white/10 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
        {blog.title}
      </h1>

      {/* Short Description */}
      <p className="text-[#72ebc2] text-sm font-medium mb-6 italic">
        {blog.shortDescription}
      </p>

      <div className="h-px w-full bg-white/10 mb-6" />

      {/* Main Description */}
      <div className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap mb-10">
        {blog.description}
      </div>

      {/* Gallery */}
      {blog.anotherImages?.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider border-b border-white/10 pb-3">
            Gallery
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {blog.anotherImages.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5"
              >
                <img
                  src={`${ImageUrl}/${img}`}
                  alt={`Image ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// ===================== MAIN EXPORT =====================
export default function Blog({ blogsData, onSelectBlog, selectedBlog, onBack }) {
  const blogs = blogsData?.blogs || [];

  // Details view
  if (selectedBlog) {
    return <BlogDetails blog={selectedBlog} onBack={onBack} />;
  }

  // Empty state
  if (blogs.length === 0) {
    return (
      <section>
        <Title title="Digital Insights" />
        <p className="text-center text-gray-400 py-20">No blogs available yet.</p>
      </section>
    );
  }

  // List view
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title title={"Digital Insights"} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
        {blogs.map((item) => (
          <BlogCard key={item._id} item={item} onSelect={onSelectBlog} />
        ))}
      </div>
    </section>
  );
}