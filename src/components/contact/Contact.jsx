'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Title from '../shared/Title';
import { motion } from 'framer-motion';
import { ImageUrl } from "@/redux/Api/baseApi";
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useCreateContactMutation } from '@/redux/Api/contactApi';

const ContactSection = ({ profileData }) => {
  const profile = profileData || {};
const [createContact] = useCreateContactMutation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const contactPayload = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      // Replace with your actual API call
      const response = await createContact(contactPayload)

  
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
     
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className=" relative">
      <Title title="Get In Touch" />

      <div className="max-w-6xl mx-auto  ">
        <div className="grid md:grid-cols-1 gap-16">
          {/* Left Side - Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
          

            <div className="space-y-6 text-gray-300">
              <div className="flex items-start gap-4">
                <MailOutlined className="text-2xl text-[#72ebc2] mt-1" />
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500">Email</p>
                  <a href={`mailto:${profile.email}`} className="hover:text-[#72ebc2] transition-colors">
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <PhoneOutlined className="text-2xl text-[#72ebc2] mt-1" />
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500">Phone</p>
                  <a href={`tel:${profile.phone}`} className="hover:text-[#72ebc2] transition-colors">
                    {profile.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <EnvironmentOutlined className="text-2xl text-[#72ebc2] mt-1" />
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500">Location</p>
                  <p>{profile.address}</p>
                </div>
              </div>
            </div>

            {profile.resumeLink && (
              <a
                href={profile.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-2 bg-[#72ebc2] text-black font-semibold rounded-xl hover:bg-[#285345] hover:text-white  transition-all"
              >
                Download Resume
              </a>
            )}
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/10  px-2 py-4 text-white focus:outline-none focus:border-[#72ebc2] transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/10  px-2 py-4 text-white focus:outline-none focus:border-[#72ebc2] transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-transparent border-b border-white/10  px-2 py-4 text-white focus:outline-none focus:border-[#72ebc2] transition-colors resize-y"
                  placeholder="Hello! I want to hire you for a project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-3 px-5 py-2 bg-[#72ebc2] text-black font-semibold rounded-xl hover:bg-[#285345] hover:text-white  transition-all"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;