'use client';

import React, { useRef } from 'react';
import Title from '../shared/Title';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3, // Fast animation (same as others)
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.05, // Fast stagger (same as others)
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
        duration: 0.25, // Fast child animation (same as others)
        ease: 'easeOut',
      },
    },
  };

  // Refs for each section
  const mapRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);

  // useInView hooks
  const isMapInView = useInView(mapRef, { once: true, amount: 0.2 });
  const isContactInfoInView = useInView(contactInfoRef, { once: true, amount: 0.2 });
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });

  return (
    <div className="">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <Title title={'Contact'} />
      </motion.div>

      <div className="">
        {/* Left Side: Google Map */}
        <motion.div
          ref={mapRef}
          variants={sectionVariants}
          initial="hidden"
          animate={isMapInView ? 'visible' : 'hidden'}
          className="w-full h-96 rounded-xl overflow-hidden shadow-lg border border-white/10"
        >
          <motion.iframe
            variants={childVariants}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902903624818!2d90.39279211543035!3d23.75090398458992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b4a7dfb05b%3A0xa1a0f07f8f1c3c55!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1708699900000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Right Side: Contact Info + Form */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isContactInfoInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-3"
        >
          {/* Contact Info */}
          <motion.div
            ref={contactInfoRef}
            variants={sectionVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/5 p-4 rounded-lg shadow border border-white/10 md:mt-6 mt-4"
          >
            {[
              { label: 'Name', value: 'Momtaj Uddin' },
              { label: 'Email', value: 'foisalrk2@gmail.com' },
              { label: 'Phone', value: '+880 1605 722887' },
              { label: 'Address', value: 'Dhaka, Bangladesh' },
            ].map((item, idx) => (
              <motion.div key={idx} variants={childVariants}>
                <h4 className="font-semibold mb-1 text-white">{item.label}</h4>
                <p>{item.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            ref={formRef}
            variants={sectionVariants}
            initial="hidden"
            animate={isFormInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-4 bg-white/5 p-6 rounded-xl shadow border border-white/10"
          >
            <motion.div variants={childVariants} className="grid grid-cols-2 gap-4">
              <motion.input
                variants={childVariants}
                type="text"
                placeholder="Your Name"
                style={{
                  borderBottom: '1px solid transparent',
                  borderImage:
                    'linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
                }}
                className="bg-transparent p-3 rounded placeholder-gray-400 focus:outline-none focus:border-[#72ebc2]"
                required
              />
              <motion.input
                variants={childVariants}
                type="email"
                placeholder="Your Email"
                style={{
                  borderBottom: '1px solid transparent',
                  borderImage:
                    'linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
                }}
                className="bg-transparent p-3 rounded placeholder-gray-400 focus:outline-none focus:border-[#72ebc2]"
                required
              />
            </motion.div>
            <motion.textarea
              variants={childVariants}
              placeholder="Your Message"
              rows={5}
              style={{
                borderBottom: '1px solid transparent',
                borderImage:
                  'linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1',
              }}
              className="bg-transparent p-3 rounded placeholder-gray-400 focus:outline-none focus:border-[#72ebc2]"
              required
            />
            <motion.button
              variants={childVariants}
              type="submit"
              className="bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-black py-3 rounded-lg font-semibold hover:bg-cyan-500 transition"
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}