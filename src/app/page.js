import HomePage from "@/components/HomePage/HomePage";
import VisitorTracker from "@/components/HomePage/VisitorTracker";
import React from "react";

const BASE_URL = "https://my-portfolio-foisal-server.vercel.app/api/v1";

async function getAllData() {
  try {
    const [about, blogs, skills, profile, projects, reviews, services, resume] =
      await Promise.all([
        fetch(`${BASE_URL}/about`, { next: { revalidate: 60 } }).then((r) => r.json()),
        fetch(`${BASE_URL}/blogs`, { next: { revalidate: 60 } }).then((r) => r.json()),
        fetch(`${BASE_URL}/skills`, { next: { revalidate: 60 } }).then((r) => r.json()),
        fetch(`${BASE_URL}/profile`, { next: { revalidate: 60 } }).then((r) => r.json()),
        fetch(`${BASE_URL}/projects`, { next: { revalidate: 60 } }).then((r) => r.json()),
        fetch(`${BASE_URL}/reviews`, { next: { revalidate: 60 } }).then((r) => r.json()),
        fetch(`${BASE_URL}/services`, { next: { revalidate: 60 } }).then((r) => r.json()),
        fetch(`${BASE_URL}/resume`, { next: { revalidate: 60 } }).then((r) => r.json()),
      ]);

    return {
      about: about?.data || null,
      blogs: blogs?.data || null,
      skills: skills?.data || null,
      profile: profile?.data || null,
      projects: projects?.data || null,
      reviews: reviews?.data || null,
      services: services?.data || null,
      resume: resume?.data || null,
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      about: null,
      blogs: null,
      skills: null,
      profile: null,
      projects: null,
      reviews: null,
      services: null,
      resume: null,
    };
  }
}

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
    canonical: "https://rkfoisal-portfolio.vercel.app",
  },
  openGraph: {
    title: "RK Foisal | Full Stack Web Developer (MERN)",
    description:
      "Official portfolio website of RK Foisal, a professional Full Stack Web Developer and MERN Stack specialist.",
    url: "https://rkfoisal-portfolio.vercel.app",
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
    description: "Portfolio of RK Foisal – Full Stack Web Developer (MERN Stack).",
    images: ["/logo.png"],
  },
};

const Page = async () => {
  const data = await getAllData();

  return (
    <div className="bg-[#111816] bg-cover bg-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "RK Foisal",
            alternateName: ["Foisal", "R K Foisal"],
            jobTitle: "Full Stack Web Developer",
            url: "https://rkfoisal-portfolio.vercel.app",
            sameAs: [
              "https://github.com/foisaluddin400",
              "https://www.facebook.com/rh.foisal",
              "https://www.instagram.com/rkfoisal330?igsh=ejZvOTg0cWV4dmFj",
              "https://wa.me/qr/UTAPNSAOBUXKH1",
            ],
          }),
        }}
      />
      <div className="z-10 font-clash">
        <HomePage
          aboutData={data.about}
          blogsData={data.blogs}
          skillsData={data.skills}
          profileData={data.profile}
          projectsData={data.projects}
          reviewsData={data.reviews}
          servicesData={data.services}
          resumeData={data.resume}
        />
        <VisitorTracker />
      </div>
    </div>
  );
};

export default Page;