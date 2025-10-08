import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/app/components/new/scrollToTop";
import Navbar from "../components/navbar";
import { UserProvider } from '../components/new/userContext';
import ChatBotBubble from "../components/ChatBotBubble";

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
    <UserProvider>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <ScrollToTop/>
        <main className="pt-20 md:pt-[135px]">{children}</main>
        <ChatBotBubble />
      </div>
    </UserProvider>
  );
}
