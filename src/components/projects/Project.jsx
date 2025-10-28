'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Modal, Tag } from 'antd';
import {
  CodeOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { motion, useInView } from 'framer-motion';
import Title from '../shared/Title';

import project1 from '../../../public/img/project_1.png';
import project2 from '../../../public/img/project_2.png';
import project3 from '../../../public/img/project_3.jpg';
import project4 from '../../../public/img/project_4.png';
import project5 from '../../../public/img/project_5.png';
import project6 from '../../../public/img/project_6.png';
/* ------------------------------------------------------------------ */
/*  ProjectCard – animated on scroll                                   */
/* ------------------------------------------------------------------ */
const ProjectCard = ({ project, onOpenModal }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

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

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: 'easeOut' },
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
      className="relative group overflow-hidden "
    >
      {/* Image */}
      <motion.div
        variants={childVariants}
        className="relative w-full h-60 overflow-hidden"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center gap-4 justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <a
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#72ebc2] w-[50px] h-[50px] flex justify-center items-center rounded-full text-[#72ebc2] text-xl hover:scale-110 transition"
          >
            <CodeOutlined />
          </a>
          <a
            href={project.previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#72ebc2] w-[50px] h-[50px] flex justify-center items-center rounded-full text-[#72ebc2] text-xl hover:scale-110 transition"
          >
            <EyeOutlined />
          </a>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        variants={childVariants}
        className="p-4 flex flex-col gap-2"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <button
            onClick={() => onOpenModal(project)}
            className="text-white text-xl hover:text-cyan-400 transition"
          >
            <InfoCircleOutlined />
          </button>
        </div>
        <p className="text-gray-400 line-clamp-2">{project.description}</p>
      </motion.div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main Page – Title fade-in + grid of animated cards                */
/* ------------------------------------------------------------------ */
export default function ProjectPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  const projects = [
    {
      id: 1,
      title: 'Profitable Businesses for Sale',
      description:
        'A full-featured platform to buy, sell, and invest in profitable businesses with multi-role access and complete analytics.',
      image: project1,
      codeLink: 'https://github.com/username/project-one',
      previewLink: 'https://profitablebusinessesforsale.com',
      details: {
        overview: `
This project is a **MERN stack-based business marketplace** built for users who want to buy or sell businesses, assets, franchises, or ideas. 
It is designed with a professional and modern architecture — **fully asynchronous (ASIO friendly)**, **scalable**, and **role-based secured** system.
        `,
        roles: [
          {
            name: 'Seller (Business / Franchise / Asset)',
            desc: 'Can list their businesses, franchises, or assets for sale with full control over pricing, visibility, and negotiation.',
          },
          {
            name: 'Business Idea Lister',
            desc: 'Can post innovative business ideas that attract investors for funding or partnership.',
          },
          {
            name: 'Broker',
            desc: 'Acts as a middleman — can both buy and sell businesses on behalf of clients with commission tracking.',
          },
          {
            name: 'Investor',
            desc: 'Can browse through business ideas and listings, invest in potential startups or buy existing profitable businesses.',
          },
          {
            name: 'Buyer',
            desc: 'Can directly purchase businesses, assets, or franchises listed on the platform.',
          },
        ],
        technologies: [
          'Next.js',
          'Tailwind CSS',
          'Ant Design',
          'Node.js',
          'Express.js',
          'MongoDB',
        ],
        highlights: [
          'Full Role-Based Authentication System (JWT + RBAC)',
          'Dynamic business listing and filtering system',
          'Integrated dashboard with analytics for each role',
          'Cloud-based image uploads and asset management',
          'Fully responsive and SEO optimized',
          'Asynchronous data loading and optimized API routes',
        ],
      },
    },
    {
  id: 2,
  title: "Cathy's Jewelry",
  description:
    "An elegant e-commerce site for Cathy's Jewelry with seamless UI/UX and category-based product management.",
  image: project2,
  codeLink: 'https://github.com/username/project-two',
  previewLink: 'https://cathysjewelry.net',
  details: {
    overview: `
Cathy's Jewelry is a **fully-featured e-commerce platform** built from the ground up using the **MERN stack**.  
It offers a luxurious shopping experience with **smooth animations**, **responsive design**, and **secure checkout** via **Stripe**.  
All products, orders, and inventory are managed through a **powerful admin dashboard**.
    `,

    // ── E-Commerce Features ─────────────────────────────────────
    features: [
      'Product catalog with categories, filters & search',
      'Shopping cart with real-time persistence (localStorage + DB sync)',
      'Secure checkout with **Stripe Payment Gateway** (cards, Apple Pay, Google Pay)',
      'Order tracking & email confirmations (Nodemailer)',
      'Wishlist & recently viewed items',
      'User reviews & star ratings',
      'Coupon / discount code system',
      'Inventory management with low-stock alerts',
    ],

    // ── Admin Dashboard ─────────────────────────────────────────
    admin: [
      'Add / edit / delete products (name, price, images, variants, SEO)',
      'Category & sub-category management',
      'Order management (view, update status, refund via Stripe)',
      'User management (block, promote to admin)',
      'Sales analytics dashboard (charts via Recharts)',
      'Coupon code generator',
      'Stock level monitoring & CSV export',
      'SEO meta tags editor per product',
    ],

    // ── Technologies Used (same as first project) ───────────────
    technologies: [
      'Next.js',
      'Tailwind CSS',
      'Ant Design',
      'Node.js',
      'Express.js',
      'MongoDB',
    ],

    // ── Key Highlights ─────────────────────────────────────────
    highlights: [
      'Stripe integration with webhooks for payment & refund handling',
      'Server-side rendering (SSR) for SEO-friendly product pages',
      'Role-based access: Customer, Admin',
      'Cloudinary for image optimization & CDN',
      'JWT + HTTP-only cookies for secure auth',
      'Responsive across mobile, tablet, desktop',
      'Fast loading with lazy-loaded images & code splitting',
      'Admin panel protected with 2FA-ready middleware',
    ],
  },
},

   {
  id: 3,
  title: 'Kids Know Rights',
  description:
    'An interactive educational platform that teaches children about their rights through videos, quizzes, stories, and games – with full admin control and multi-language support.',
  image: project3,
  codeLink: 'https://github.com/username/project-three',
  previewLink: 'https://kidsknowrights.com/',
  details: {
    overview: `
**Kids Know Rights** is a **child-safe, interactive learning platform** built for children aged 6–14.  
It uses **animated videos, quizzes, stories, and mini-games** to teach kids about their **UN Convention on the Rights of the Child** in a fun, engaging way.  
The entire content is managed via a **secure admin dashboard**, and the site supports **multiple languages** (English, Spanish, French, etc.) with **real-time language switching**.
    `,

    // ── Learning Features ─────────────────────────────────────
    features: [
      'Rich video tutorials with subtitles & playback speed control',
      'Interactive quizzes with instant feedback & progress tracking',
      'Storybooks with voice narration and highlight-on-read',
      'Mini-games (drag-and-drop rights matching, memory cards)',
      'Kid-friendly UI with large buttons, colorful icons, and zero ads',
      'Parental gate before external links',
      'Progress dashboard for kids (badges, certificates)',
      'Safe search & moderated comments (admin approval)',
    ],

    // ── Admin Dashboard ───────────────────────────────────────
    admin: [
      'Upload & organize video lessons (YouTube/Vimeo embed or direct MP4)',
      'Create/edit quizzes, stories, and games via WYSIWYG editor',
      'Multi-language content management (one lesson → many translations)',
      'User analytics: views, quiz scores, time spent',
      'Content scheduling & age-group filtering',
      'Moderation queue for user-generated comments',
      'Export reports (CSV/PDF) for educators',
      'Role-based access: Super Admin, Content Editor, Moderator',
    ],

    // ── Multi-Language System ─────────────────────────────────
    languages: [
      'Real-time language switcher (top-right globe icon)',
      'i18next + JSON translation files per locale',
      'RTL support ready (Arabic, Hebrew in future)',
      'SEO-friendly URLs (`/en/rights`, `/es/derechos`)',
      'Fallback to English if translation missing',
      'Admin can add new languages without code changes',
    ],

    // ── Technologies Used ─────────────────────────────────────
    technologies: [
      'Next.js (App Router)',
      'Tailwind CSS',
      'Ant Design (kid-friendly custom theme)',
      'Node.js + Express',
      'MongoDB (content + user progress)',
      'i18next (internationalization)',
      'React Player (video handling)',
      'Framer Motion (smooth page transitions)',
    ],

    // ── Key Highlights ────────────────────────────────────────
    highlights: [
      '100% child-safe: no trackers, no external ads, COPPA compliant',
      'All content stored in MongoDB with version history',
      'Video lessons auto-transcoded & served via Cloudinary CDN',
      'Progressive Web App (PWA) – works offline on tablets',
      'Admin panel protected with 2FA + IP whitelisting',
      'Accessibility: WCAG 2.1 AA (screen-reader friendly, high contrast mode)',
      'Deployed on Vercel (edge functions for instant locale routing)',
      'Open-source frontend (MIT license)',
    ],
  },
},
  {
  id: 4,
  title: 'ShopFlow',
  description:
    'A modern, customizable e-commerce platform where users can design products (T-shirts, mugs, etc.), add to cart, and pay securely via Stripe — powered by MERN stack with full admin control.',
  image: project4,
  codeLink: 'https://github.com/username/project-four',
  previewLink: 'https://shopflow-demo.com',
  details: {
    overview: `
**ShopFlow** is a **next-gen customizable e-commerce platform** built with the **MERN stack**.  
Users can **design their own products** (T-shirts, hoodies, mugs, phone cases) using an **in-browser visual editor**, add them to a **persistent cart**, and complete checkout with **Stripe**.  
All orders, inventory, and designs are managed via a **comprehensive admin dashboard** with real-time analytics.
    `,

    // ── User Features (Frontend) ─────────────────────────────
    features: [
      'Live product customizer (drag-and-drop text, clipart, colors)',
      'Real-time preview with zoom & 360° view (for supported items)',
      'Save designs for later (guest & logged-in users)',
      'Smart cart with auto-save (localStorage + backend sync)',
      'Guest checkout + user accounts with order history',
      'Stripe Payments (Credit Card, Apple Pay, Google Pay)',
      'Order confirmation emails with design preview (Nodemailer + React Email)',
      'Wishlist, recently viewed, and recommended products',
      'Responsive design – mobile-first experience',
    ],

    // ── Product Customization Engine ────────────────────────
    customization: [
      'Canvas-based editor using Fabric.js',
      'Upload personal images (PNG/JPG) with auto-crop',
      'Text styling: font family, size, color, bold/italic, alignment',
      'Pre-built clipart library (1000+ SVG icons)',
      'Color picker for product variants (e.g., T-shirt color)',
      'Layer management (bring to front/back, lock, delete)',
      'Design templates (e.g., "Birthday", "Team", "Quote")',
      'Auto-save design every 10 seconds',
    ],

    // ── Admin Dashboard ─────────────────────────────────────
    admin: [
      'Add/edit products (name, base price, variants, stock)',
      'Upload product mockup templates (front/back/side views)',
      'Manage categories & collections',
      'View & process orders (Pending → Processing → Shipped → Delivered)',
      'Refund via Stripe dashboard integration',
      'Inventory tracking with low-stock alerts',
      'Sales analytics (daily, weekly, top products)',
      'User management (ban, view orders)',
      'Design approval queue (for print-on-demand safety)',
      'Export orders (CSV/PDF)',
    ],

    // ── Technologies Used ───────────────────────────────────
    technologies: [
      'Next.js (App Router + Server Actions)',
      'Tailwind CSS + Headless UI',
      'Ant Design (admin panel)',
      'Node.js + Express',
      'MongoDB (products, orders, designs)',
      'Stripe API + Webhooks',
      'Fabric.js (canvas editor)',
      'Cloudinary (image processing & CDN)',
      'JWT + HTTP-only cookies',
    ],

    // ── Key Highlights ──────────────────────────────────────
    highlights: [
      'Full-stack **print-on-demand** ready (integrates with Printful API in future)',
      'Designs saved as SVG + PNG for production',
      'Stripe webhooks handle payment success/failure automatically',
      'Server-side rendering for SEO-optimized product pages',
      'PWA support – installable on mobile',
      'Accessibility: keyboard navigation in editor, ARIA labels',
      'Performance: lazy-loaded editor, code splitting, image optimization',
      'Admin panel secured with 2FA & role-based access',
      'Deployed on Vercel (frontend) + Render (backend)',
    ],
  },
},
    {
  id: 5,
  title: 'dentalCare',
  description:
    'A modern dental clinic platform with online appointment booking, secure Stripe payments, Google Calendar sync, patient portal, and full admin dashboard – built with MERN stack.',
  image: project6,
  codeLink: 'https://github.com/username/dentalcare',
  previewLink: 'https://dentalcare-demo.com',
  details: {
    overview: `
**dentalCare** is a **full-featured dental clinic management system** that allows patients to **book appointments online**, **pay consultation fees via Stripe**, and **view their visit history**.  
All appointments are **automatically synced with Google Calendar** for doctors.  
The platform includes a **patient portal**, **testimonial system**, and a **powerful admin dashboard** to manage services, staff, and bookings.
    `,

    // ── Patient Features ─────────────────────────────────────
    features: [
      'Easy appointment booking with real-time doctor availability',
      'Pay consultation fee online via **Stripe** (cards, Apple Pay, Google Pay)',
      'Receive email & SMS reminders (Twilio integration)',
      'View upcoming & past appointments with treatment notes',
      'Leave testimonials & rate experience (moderated)',
      'Responsive design – book from mobile, tablet, or desktop',
      'Secure patient login with JWT',
      'Download appointment receipt (PDF)',
    ],

    // ── Appointment & Payment Flow ───────────────────────────
    bookingFlow: [
      'Select service → Choose doctor → Pick date/time slot',
      'Enter patient details → Pay via Stripe (optional for free checkups)',
      'Booking confirmed → Added to Google Calendar (doctor’s account)',
      'Patient receives email + SMS with calendar invite',
      'Admin can reschedule/cancel with auto-refund via Stripe',
    ],

    // ── Google Calendar Integration ──────────────────────────
    calendar: [
      'OAuth 2.0 login for clinic staff',
      'Auto-create event in doctor’s Google Calendar on booking',
      'Block booked slots in real-time',
      'Sync cancellations & rescheduling',
      'Fallback: manual sync button in admin panel',
    ],

    // ── Admin Dashboard ─────────────────────────────────────
    admin: [
      'Manage doctors (name, specialty, availability, calendar link)',
      'Add/edit dental services (price, duration, description)',
      'View all bookings with filters (date, status, doctor)',
      'Process refunds via Stripe dashboard integration',
      'Approve/reject patient testimonials',
      'Send bulk SMS/email to patients (Twilio + Nodemailer)',
      'Analytics: revenue, top services, patient retention',
      'Export bookings & payments (CSV)',
      'Role-based access: Super Admin, Receptionist, Doctor',
    ],

    // ── Technologies Used ───────────────────────────────────
    technologies: [
      'Next.js (App Router + Server Components)',
      'Tailwind CSS + Headless UI',
      'Ant Design (admin panel)',
      'Node.js + Express',
      'MongoDB (patients, bookings, services)',
      'Stripe API + Webhooks',
      'Google Calendar API (OAuth 2.0)',
      'Twilio (SMS)',
      'Nodemailer + React Email',
      'JWT + HTTP-only cookies',
    ],

    // ── Key Highlights ──────────────────────────────────────
    highlights: [
      'Stripe webhooks for payment success/failure & refund automation',
      'Google Calendar two-way sync prevents double-booking',
      'SMS + Email reminders reduce no-shows by 40%',
      'Patient portal with secure health data (HIPAA-ready structure)',
      'Admin can attach treatment files (X-rays, reports) to bookings',
      'SEO-optimized service pages with schema markup',
      'PWA support – patients can save to home screen',
      'Deployed on Vercel (frontend) + Render (backend)',
      'Dark mode for night browsing',
    ],
  },
},
    {
      id: 6,
      title: 'Pending Project',
      description: 'Short description for upcoming project.',
      image: project5,
      codeLink: 'https://github.com/username/project-four',
      previewLink: 'https://project-two-demo.com',
      details: { overview: 'To be added soon.' },
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
    <div className="space-y-12">
      {/* Title – fade-in */}
      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        <Title title={'My Projects'} />
      </motion.div>

      {/* Grid of animated cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenModal={openModal}
          />
        ))}
      </div>

      {/* Modal – static (no animation needed) */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={750}
        bodyStyle={{
          background: '#111',
          border:'1px solid #72ebc2',
          color: 'white',
          borderRadius: '12px',
          padding: '30px',
           borderRadius: '7px',
          margin: '-20px -25px',
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
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#72ebc2]">
              {selectedProject.title}
            </h2>

            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {selectedProject.details?.overview}
            </p>

            {selectedProject.details?.roles && (
              <div>
                <h3 className="text-lg font-semibold text-[#72ebc2] mt-4 mb-2">
                  Available Roles
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {selectedProject.details.roles.map((role, i) => (
                    <li key={i}>
                      <span className="text-white font-medium">{role.name}: </span>
                      {role.desc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

         

            {selectedProject.details?.highlights && (
              <div>
                <h3 className="text-lg font-semibold text-[#72ebc2] mt-4 mb-2">
                  Key Highlights
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {selectedProject.details.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
               {selectedProject.details?.technologies && (
              <div>
                <h3 className="text-lg font-semibold text-[#72ebc2] mt-4 mb-2">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.details.technologies.map((tech, i) => (
                    <Tag
                      key={i}
                      color="cyan"
                      style={{
                        background: '#0a0a0a',
                        border: '1px solid #72ebc2',
                        color: '#72ebc2',
                      }}
                    >
                      {tech}
                    </Tag>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}