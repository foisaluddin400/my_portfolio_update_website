import Main from '@/components/Main'
import React from 'react'
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "RK Foisal",
      alternateName: ["Foisal", "R K Foisal"],
      jobTitle: "Full Stack Web Developer",
      url: "https://main-portfolio-using-react-ymia.vercel.app",
      sameAs: [
        "https://github.com/foisaluddin400",
        "https://www.facebook.com/rh.foisal",
        "https://www.instagram.com/rkfoisal330?igsh=ejZvOTg0cWV4dmFj",
        "https://wa.me/qr/UTAPNSAOBUXKH1",
      ],
    }),
  }}
/>

export const metadata = {
  title: "RK Foisal | Full Stack Web Developer (MERN)",
  description:
    "RK Foisal is a Full Stack Web Developer specializing in MERN stack development. This is the official personal portfolio of Foisal showcasing projects, skills, experience, and contact information.",

  keywords: [
    "RK Foisal",
    "Foisal",
    "Full Stack Web Developer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer Portfolio",
    "Software Developer Bangladesh",
  ],

  alternates: {
    canonical: "https://main-portfolio-using-react-ymia.vercel.app",
  },

  openGraph: {
    title: "RK Foisal | Full Stack Web Developer (MERN)",
    description:
      "Official portfolio website of RK Foisal, a professional Full Stack Web Developer and MERN Stack specialist.",
    url: "https://main-portfolio-using-react-ymia.vercel.app",
    siteName: "RK Foisal Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "RK Foisal Portfolio Logo",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "RK Foisal | Full Stack Web Developer (MERN)",
    description:
      "Portfolio of RK Foisal – Full Stack Web Developer (MERN Stack).",
    images: ["/logo.png"],
  },
};

const page = () => {
  return (
    <Main></Main>
  )
}

export default page