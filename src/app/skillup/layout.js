import { Geist, Geist_Mono } from "next/font/google";
import ScrollToTop from "@/app/components/new/scrollToTop";
import { UserProvider } from "../components/new/userContext"; 
import ProtectedAdminRoute from "@/app/components/new/protectedAdminRoute"; 
import Navbar from "../components/navbar";
import FloatingDashboardButton from "./components/FloatingDashboardButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Section",
  description: "Admin Section",
};

export default function RootLayout({ children }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <UserProvider>
        <ProtectedAdminRoute>
          <ScrollToTop />
          <Navbar />
          <main className="pt-20 md:pt-[135px]">{children}</main>
          <FloatingDashboardButton />
        </ProtectedAdminRoute>
      </UserProvider>
    </div>
  );
}