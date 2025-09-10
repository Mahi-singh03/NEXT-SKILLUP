import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/app/components/new/scrollToTop";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Skillup Institute",
  description: "Best Computer Skills Training Institute in Garhshankar, Punjab",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <ScrollToTop/>
        
        {children}
      </body>
    </html>
  );
}
