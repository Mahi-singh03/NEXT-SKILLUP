import Link from "next/link";
import {
  FaHome,
  FaBook,
  FaImage,
  FaUserPlus,
  FaInfoCircle,
  FaUserCheck,
  FaBriefcase,
  FaSignInAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { MdCastForEducation } from "react-icons/md";

const videos = [
  { className: "desktop hidden lg:block", src: "https://res.cloudinary.com/dufxj1sau/video/upload/v1740031225/Background_videos/fpkv1rwjhmuhixhaven0.mp4" },
  { className: "tablet hidden md:block lg:hidden", src: "https://res.cloudinary.com/dufxj1sau/video/upload/v1740031225/Background_videos/fpkv1rwjhmuhixhaven0.mp4" },
  { className: "mobile block md:hidden", src: "https://res.cloudinary.com/dufxj1sau/video/upload/v1740038221/Background_videos/p3e102ttunokguxhceih.mp4" },
];

const dropdowns = [
  {
    icon: <MdCastForEducation />,
    label: "Online Courses",
    links: [
      { path: "/OnlineCourse/Register", text: "Register" },
      { path: "/OnlineCourse/Course-Videos", text: "Course Videos" },
    ],
  },
  {
    icon: <FaGraduationCap />,
    label: "Exam",
    links: [
      { path: "/weekly-exam", text: "Weekly Exam" },
      { path: "/Exams/Final-Exam", text: "Final Exams" },
    ],
  },
  {
    icon: <FaUserCheck />,
    label: "Verification",
    links: [
      { path: "/Verification/Verify-Student", text: "Student Verification" },
      { path: "/Verification/Verify-Staff", text: "Staff Verification" },
    ],
  },
  {
    icon: <FaBriefcase />,
    label: "Job",
    links: [
      { path: "/Job/Job-Apply", text: "Apply Job" },
      { path: "/Job/Career-Guidance", text: "Career Guidance" },
    ],
  },
  {
    icon: <FaSignInAlt />,
    label: "Login",
    links: [
      { path: "/student-login", text: "Student Login" },
      { path: "/Admin/login", text: "Admin Login" },
    ],
  },
];

const buttons = [
  { path: "/cources", icon: <FaBook />, text: "Courses" },
  { path: "/gallery", icon: <FaImage />, text: "Gallery" },
  { path: "/register", icon: <FaUserPlus />, text: "Register" },
  { path: "/about", icon: <FaInfoCircle />, text: "About" }
];

const LandingPage = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
      {videos.map((video, index) => (
        <video
          key={index}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover -z-10 ${video.className}`}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      ))}

      <div className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-5xl flex flex-col gap-4">
        <div className="text-blue-500 text-lg md:text-xl font-bold text-center rounded-lg">
          ISO 9001 : 2015 Certified & IAF Certified
        </div>

        <div className="flex flex-wrap gap-4 justify-center pt-2">
          <Link href="/home" className="inline-flex items-center px-8 py-4 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300">
            <FaHome className="mr-2 text-xl" /> Home
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            {buttons.map((btn, index) => (
              <Link
                key={index}
                href={btn.path}
                className="inline-flex items-center px-8 py-4 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="mr-2">{btn.icon}</span> {btn.text}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center pt-2">
            {dropdowns.map((dropdown, index) => (
              <div key={index} className="relative group">
                <button className="inline-flex items-center gap-3 px-8 py-4 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-all duration-300">
                  {dropdown.icon} {dropdown.label}
                </button>
                <div className="absolute top-[90%] left-1/2 -translate-x-1/2 min-w-[200px] bg-white/95 rounded-xl p-2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1 transition-all duration-200 shadow-lg">
                  {dropdown.links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.path}
                      className="block px-4 py-3 text-gray-800 rounded-lg hover:bg-blue-50 hover:translate-x-1 transition-all duration-200"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;