import { Geist, Geist_Mono } from "next/font/google";
import ScrollToTop from "../components/ScrollToTop";
import { UserProvider } from "../components/UserContext"; 
import ProtectedAdminRoute from "../components/ProtectedAdminRoute"; 
import Navbar from "../components/navbar";

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
  description: "Best Computer Skills Training Institute in Garhshankar, Punjab",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <ProtectedAdminRoute>
            <ScrollToTop />
            <Navbar />
                  <main className="pt-20 md:pt-[120px]">{children}</main>
          </ProtectedAdminRoute>
        </UserProvider>
      </body>
    </html>
  );
}