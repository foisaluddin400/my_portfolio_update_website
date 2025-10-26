import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./layout/ClientLayout";
import ReduxProvider from "@/provider/ReduxProvider";




const style = localFont({
  src: "../font/LondrinaSketch-Regular.ttf",
  variable: "--style-display"
  
});


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
  title: "RK Foisal",
  description: "RK Foisal's Personal Portfolio Website showcasing projects, blogs, resume, and contact information.",
   icons: {
    icon: "/vercel.svg",
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
