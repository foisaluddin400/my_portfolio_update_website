import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./layout/ClientLayout";
import ReduxProvider from "@/provider/ReduxProvider";




const style = localFont({
  src: "../font/LondrinaSketch-Regular.ttf",
  variable: "--style-display"
  
});
//

const playSans = localFont({
  src: "../font/Syne-Regular-BF642e31d3934f5.otf",
  variable: "--clash-display"
  
});


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default: "RK Foisal | Full Stack Web Developer (MERN)",
    template: "%s | RK Foisal",
  },

  description:
    "RK Foisal is a Full Stack Web Developer specializing in MERN stack development. This personal portfolio showcases projects, blogs, skills, resume, and contact information.",

  keywords: [
    "RK Foisal",
    "Full Stack Web Developer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer Portfolio",
    "Software Developer Bangladesh",
  ],

  authors: [{ name: "RK Foisal" }],
  creator: "RK Foisal",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "RK Foisal | Full Stack Web Developer (MERN)",
    description:
      "Explore the portfolio of RK Foisal, a Full Stack Web Developer and MERN Stack specialist building modern, scalable web applications.",
    siteName: "RK Foisal Portfolio",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "RK Foisal | Full Stack Web Developer (MERN)",
    description:
      "Portfolio of RK Foisal – Full Stack Web Developer specializing in MERN stack.",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="product">
      <body className={` ${playSans.variable} ${style.variable}  antialiased`}>
        <ReduxProvider>
       
            <ClientLayout >{children}</ClientLayout>
          
        </ReduxProvider>
      </body>
    </html>
  );
}
