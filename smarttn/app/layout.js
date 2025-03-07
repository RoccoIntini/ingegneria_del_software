"use client";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import Footer from "../components/footer";
import Home from "../components/home";
import "./globals.css";


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



export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div >
          {!pathname.startsWith("/admin")  && <Home />}
          <div className="mt-8">{children}</div>
          <Footer />
        </div>
       
      </body>
    </html>
  );
}
