"use client";
import React from "react";
import Title from "../shared/Title";

export default function Contact() {
  return (
    <div className="">
    <Title title={"Contact"}></Title>

      <div className=" ">
        {/* Left Side: Google Map */}
        <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg border border-white/10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902903624818!2d90.39279211543035!3d23.75090398458992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b4a7dfb05b%3A0xa1a0f07f8f1c3c55!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1708699900000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Right Side: Contact Info + Form */}
        <div className="flex flex-col gap-3">
          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/5 p-4 rounded-lg shadow border border-white/10 md:mt-6 mt-4">
            <div className="">
              <h4 className="font-semibold mb-1 text-white">Name</h4>
              <p>Momtaj Uddin</p>
            </div>
            <div className="">
              <h4 className="font-semibold mb-1 text-white">Email</h4>
              <p>example@email.com</p>
            </div>
            <div className="">
              <h4 className="font-semibold mb-1 text-white">Phone</h4>
              <p>+880 1234 567890</p>
            </div>
            <div className="">
              <h4 className="font-semibold mb-1 text-white">Address</h4>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="flex flex-col gap-4 bg-white/5 p-6 rounded-xl shadow border border-white/10">
           <div className="grid grid-cols-2 gap-4">
             <input
            style={{
              
              borderBottom: "1px solid transparent",

              borderImage:
                "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
            }}
              type="text"
              placeholder="Your Name"
              className="bg-transparent p-3 rounded  placeholder-gray-400 focus:outline-none focus:[#72ebc2]-2 focus:[#72ebc2]"
              required
            />
            <input
             style={{
              
              borderBottom: "1px solid transparent",

              borderImage:
                "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
            }}
              type="email"
              placeholder="Your Email"
              className="bg-transparent p-3 rounded  placeholder-gray-400 focus:outline-none focus:[#72ebc2]-2 focus:[#72ebc2]"
              required
            />
           </div>
            <textarea
             style={{
              
              borderBottom: "1px solid transparent",

              borderImage:
                "linear-gradient(to right, rgb(65, 65, 65), rgb(22, 22, 22)) 1",
            }}
              placeholder="Your Message"
              rows={5}
              className="bg-transparent p-3 rounded  placeholder-gray-400 focus:outline-none focus:[#72ebc2]-2 focus:[#72ebc2]"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-black py-3 rounded-lg font-semibold hover:bg-cyan-500 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
