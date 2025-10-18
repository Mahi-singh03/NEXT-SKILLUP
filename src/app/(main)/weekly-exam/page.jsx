"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserContext } from "../../components/new/userContext";
import FeeStatusMonitor from "@/app/components/FeeStatusMonitor";
import { motion } from "framer-motion";

const subjects = [
  {
    id: "ms_word",
    title: "MS Word",
    description: "Document processing and formatting",
    createdBy: "Neha Rana",
    image: "https://res.cloudinary.com/dufxj1sau/image/upload/v1760760217/20251008_1411_MS_Word_Icon_remix_01k71fkx0mer08nw6s815kf1vm_oqx4hi_qrgwja.png",
    difficulty: {
      easy: { path: "/weekly-exam/WordEasy", questions: 30, duration: "45 min" },
      medium: { path: "/weekly-exam/WordMedium", questions: 30, duration: "45 min" },
      hard: { path: "/weekly-exam/WordHard", questions: 30, duration: "45 min" }
    },
    color: "from-blue-500 to-blue-600"
  },
  
  {
    id: "ms_excel",
    title: "MS Excel",
    description: "Spreadsheets and data analysis",
    createdBy: "Neha Rana",
    image: "https://res.cloudinary.com/dufxj1sau/image/upload/v1760760217/20251008_1404_MS_Excel_Logo_remix_01k71f8p6hfzkr7ha6skvjk8rx_fgjt7o_nq5nog.png",
    difficulty: {
      easy: { path: "/weekly-exam/ExcelEasy", questions: 30, duration: "45 min" },
      medium: { path: "/weekly-exam/ExcelMedium", questions: 30, duration: "45 min" },
      hard: { path: "/weekly-exam/ExcelHard", questions: 30, duration: "45 min" }
    },
    color: "from-green-500 to-green-600"
  },
  {
    id: "ms_powerpoint",
    title: "MS PowerPoint",
    description: "Presentation design and delivery",
    createdBy: "Neha Rana",
    image: "https://res.cloudinary.com/dufxj1sau/image/upload/v1760760217/20251008_1418_Logo_Mockup_remix_01k71g27dre0psbstr1ax06wtg_rkh95d_avl2ms.png",
    difficulty: {
      easy: { path: "/weekly-exam/PowerPointEasy", questions: 30, duration: "45 min" },
      medium: { path: "/weekly-exam/PowerPointMedium", questions: 30, duration: "45 min" },
      hard: { path: "/weekly-exam/PowerPointHard", questions: 30, duration: "45 min" }
    },
    color: "from-orange-500 to-orange-600"
  },
  {
    id: "ms_office",
    title: "MS Office Suite",
    description: "Complete Office package mastery",
    createdBy: "Neha Rana",
    image: "https://res.cloudinary.com/dufxj1sau/image/upload/v1760760217/20251008_1321_Office_Icons_Trio_remix_01k71cs8rsfkf9zqdbzdzbjz6d_gjgyo0_w4rcgb.png",
    difficulty: {
      easy: { path: "/weekly-exam/OfficeEasy", questions: 30, duration: "45 min" },
      medium: { path: "/weekly-exam/OfficeMedium", questions: 30, duration: "45 min" },
      hard: { path: "/weekly-exam/OfficeHard", questions: 30, duration: "45 min" }
    },
    color: "from-red-500 to-red-600"
  },
  {
    id: "photoshop",
    title: "Adobe Photoshop",
    description: "Image editing and graphic design",
    createdBy: "Aditya Sharma",
    image: "https://res.cloudinary.com/dufxj1sau/image/upload/v1760760217/20251008_1428_Photoshop_Logo_Concept_remix_01k71gm10jfbqtkhw6amd1j040_gkbqp1_acrvv9.png",
    difficulty: {
      easy: { path: "/weekly-exam/PhotoshopEasy", questions: 15, duration: "45 min" },
      medium: { path: "/weekly-exam/PhotoshopMedium", questions: 20, duration: "45 min" },
      hard: { path: "/weekly-exam/PhotoshopHard", questions: 25, duration: "45 min" }
    },
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "ai_tools",
    title: "AI Tools",
    description: "Artificial Intelligence applications",
    createdBy: "Mahi Singh",
    image: "https://res.cloudinary.com/dufxj1sau/image/upload/v1760760218/20251008_1507_AI_Tools_Logo_remix_01k71jw2z0fb1trt54gw0z64ed_izkj4u_tiucuk.png",
    difficulty: {
      easy: { path: "/weekly-exam/AIEasy", questions: 15, duration: "45 min" },
      medium: { path: "/weekly-exam/AIMedium", questions: 20, duration: "45 min" },
      hard: { path: "/weekly-exam/AIHard", questions: 25, duration: "45 min" }
    },
    color: "from-teal-500 to-teal-600"
  },
  {
    id: "tally",
    title: "Tally ERP",
    description: "Accounting and business management",
    createdBy: "Jaswinder Singh",
    image: "https://res.cloudinary.com/dufxj1sau/image/upload/v1760760218/20251009_1022_Tally_Logo_Background_Change_remix_01k73mz5wqewhtd4tzsqyswtg9_oiv7fv_s9yogj.png",
    difficulty: {
      easy: { path: "/weekly-exam/TallyEasy", questions: 18, duration: "45 min" },
      medium: { path: "/weekly-exam/TallyMedium", questions: 22, duration: "45 min" },
      hard: { path: "/weekly-exam/TallyHard", questions: 28, duration: "45 min" }
    },
    color: "from-indigo-500 to-indigo-600"
  },
  {
    id: "python",
    title: "Python Programming",
    description: "Python development and scripting",
    createdBy: "Mahi SIngh",
    image: "https://res.cloudinary.com/dufxj1sau/image/upload/v1760760217/20251008_1422_Blue_Tech_Logo_remix_01k71g8q9senes8qb47wnrvnab_1_yxdtc4_aifipr.png",
    difficulty: {
      easy: { path: "/weekly-exam/PythonEasy", questions: 15, duration: "45 min" },
      medium: { path: "/weekly-exam/PythonMedium", questions: 20, duration: "45 min" },
      hard: { path: "/weekly-exam/PythonHard", questions: 25, duration: "45 min" }
    },
    color: "from-yellow-500 to-yellow-600"
  },
  {
    id: "web_design",
    title: "HTML, CSS, JS",
    description: "Frontend web development",
    createdBy: "Mahi SIngh",
    image: "https://res.cloudinary.com/dufxj1sau/image/upload/v1760760218/20251011_1214_HTML_CSS_JS_Logo_remix_01k7904eryfr7vkqs14azqef09_cnf3cp_shyvqv.png",
    difficulty: {
      easy: { path: "/weekly-exam/WebEasy", questions: 30, duration: "45 min" },
      medium: { path: "/weekly-exam/WebMedium", questions: 30, duration: "45 min" },
      hard: { path: "/weekly-exam/WebHard", questions: 30, duration: "45 min" }
    },
    color: "from-pink-500 to-pink-600"
  },
  {
    id: "mern_stack",
    title: "MERN Full-stack",
    description: "Complete web development stack",
    createdBy: "Mahi Singh",
    image: "https://res.cloudinary.com/dufxj1sau/image/upload/v1760760225/20251011_1221_MERN_Logo_Concept_remix_01k790j1w9emp9tt715wzqw4xm_izfh25_g7a9c8.png",
    difficulty: {
      easy: { path: "/weekly-exam/MERNEasy", questions: 30, duration: "45 min" },
      medium: { path: "/weekly-exam/MERNMedium", questions: 30, duration: "45 min" },
      hard: { path: "/weekly-exam/MERNHard", questions: 30, duration: "45 min" }
    },
    color: "from-emerald-500 to-emerald-600"
  },
  {
    id: "video_editing",
    title: "Video Editing",
    description: "Professional video production",
    createdBy: "Aditya Sharma",
    image: "https://res.cloudinary.com/dufxj1sau/image/upload/v1760760227/20251011_1224_Video_Editing_Logo_remix_01k790qrpvep5t09hrqe5fb7ke_mtmmmj_ycvwsp.png",
    difficulty: {
      easy: { path: "/weekly-exam/VideoEasy", questions: 30, duration: "45 min" },
      medium: { path: "/weekly-exam/VideoMedium", questions: 30, duration: "45 min" },
      hard: { path: "/weekly-exam/VideoHard", questions: 30, duration: "45 min" }
    },
    color: "from-rose-500 to-rose-600"
  },
  {
    id: "english_speaking",
    title: "English Speaking",
    description: "Communication and fluency",
    createdBy: "Language Experts",
    image: "https://res.cloudinary.com/dufxj1sau/image/upload/v1760760226/20251011_1226_English_Speaking_Logo_remix_01k790vf09fv4vyvkakatz1q8s_qif7uy_ykwerp.png",
    difficulty: {
      easy: { path: "/weekly-exam/EnglishEasy", questions: 30, duration: "45 min" },
      medium: { path: "/weekly-exam/EnglishMedium", questions: 30, duration: "45 min" },
      hard: { path: "/weekly-exam/EnglishHard", questions: 30, duration: "45 min" }
    },
    color: "from-cyan-500 to-cyan-600"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { type: "spring", stiffness: 400 }
  },
  tap: { scale: 0.95 }
};

export default function ExamList() {
  const { isAuthenticated, loading, isAdmin, user, checkFeeStatus } = useContext(UserContext);
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/auth/verify", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setVerified(true);
        } else {
          const data = await res.json();
          console.warn("Verification failed:", data?.message);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        router.push("/login");
      }
    };

    if (!loading && isAuthenticated) {
      checkToken();
    } else if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  const handleAccessGranted = (granted) => {
    setAccessGranted(granted);
  };

  useEffect(() => {
    if (user && !isAdmin && checkFeeStatus) {
      const feeStatus = checkFeeStatus();
      if (feeStatus && feeStatus.type === 'courseCompleted') {
        setAccessGranted(false);
      } else if (feeStatus && (feeStatus.type === 'overdueInstallment' || feeStatus.type === 'noFeeSetup')) {
        setAccessGranted(false);
      } else {
        setAccessGranted(true);
      }
    } else if (isAdmin) {
      setAccessGranted(true);
    }
  }, [user, isAdmin, checkFeeStatus]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyIconColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'hard': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  if (loading || !verified) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"
        />
      </div>
    );
  }

  return (
    <>
      {!isAdmin && (
        <FeeStatusMonitor onAccessGranted={handleAccessGranted} />
      )}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Skill Assessment Hub
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Test your knowledge across various subjects and difficulty levels. 
              Choose your path to mastery!
            </p>
            
            {!isAdmin && !accessGranted && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-orange-600 mt-4 bg-orange-50 inline-block px-4 py-2 rounded-full border border-orange-200"
              >
                Please resolve any fee-related issues to access exams
              </motion.p>
            )}
          </motion.div>

          {/* Subjects Grid */}
          {(isAdmin || accessGranted) ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
             {subjects.map((subject) => (
              <motion.div
                key={subject.id}
                variants={cardVariants}
                whileHover="hover"
                className="group relative"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-88 sm:h-56 md:h-68 lg:h-62 xl:h-86 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={subject.image || '/default-subject.jpg'}
                      alt={subject.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/default-subject.jpg';
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Subject Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-sm bg-white/20 border border-white/30`}>
                      <span className="text-white text-sm font-semibold capitalize">{subject.category}</span>
                    </div>
                    
                    {/* Title and Description Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold mb-1 drop-shadow-md">{subject.title}</h3>
                      <p className="text-sm opacity-90 line-clamp-2 drop-shadow-sm">{subject.description}</p>
                    </div>
                    
                    {/* Hover Effect Layer */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Created By */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500">Created by</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {subject.createdBy?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{subject.createdBy}</span>
                      </div>
                    </div>

                    {/* Difficulty Options */}
                    <div className="space-y-2 mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Choose Difficulty:</h4>
                      {Object.entries(subject.difficulty).map(([level, details]) => (
                        <motion.div
                          key={level}
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <Link
                            href={details.path}
                            className={`block w-full text-left p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${getDifficultyColor(level)} group/difficulty`}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-3">
                                {/* Difficulty Icon */}
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getDifficultyIconColor(level)}`}>
                                  {level === 'easy' && 'E'}
                                  {level === 'medium' && 'M'}
                                  {level === 'hard' && 'H'}
                                </div>
                                <div>
                                  <span className="font-semibold capitalize">{level}</span>
                                  <p className="text-xs opacity-75 mt-1">
                                    {details.questions} questions • {details.duration}
                                  </p>
                                </div>
                              </div>
                              <motion.span
                                whileHover={{ scale: 1.2, x: 2 }}
                                className="text-lg transition-transform duration-200 group-hover/difficulty:translate-x-1"
                              >
                                →
                              </motion.span>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <span>📝</span>
                        <span>Multiple choice</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>⚡</span>
                        <span>Instant results</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  transition: { duration: 2, repeat: Infinity }
                }}
                className="text-6xl mb-6"
              >
                🔒
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Restricted</h2>
              {user && checkFeeStatus && (() => {
                const feeStatus = checkFeeStatus();
                if (feeStatus && feeStatus.type === 'courseCompleted') {
                  return (
                    <>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Your course has been completed. You can no longer access skill assessments.
                      </p>
                      <div className="space-y-2 text-sm text-gray-500 bg-white p-6 rounded-xl shadow-lg inline-block">
                        <p>• Course: {feeStatus.data.courseName}</p>
                        <p>• Completed on: {new Date(feeStatus.data.farewellDate).toLocaleDateString()}</p>
                        <p>• Contact support for certificate or records</p>
                      </div>
                    </>
                  );
                } else {
                  return (
                    <>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Please resolve any fee-related issues to access the skill assessments.
                      </p>
                      <div className="space-y-2 text-sm text-gray-500 bg-white p-6 rounded-xl shadow-lg inline-block">
                        <p>• Check for overdue payments</p>
                        <p>• Ensure fee structure is set up</p>
                        <p>• Contact support if needed</p>
                      </div>
                    </>
                  );
                }
              })()}
            </motion.div>
          )}

          {/* Footer Note */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-500 bg-white/50 backdrop-blur-sm inline-block px-6 py-3 rounded-full border border-gray-200">
              These assessments help you track your progress and improve your skills in various domains
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}