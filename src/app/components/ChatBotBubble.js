"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaComments, 
  FaTimes, 
  FaTrash, 
  FaPaperPlane, 
  FaPhone, 
  FaEnvelope, 
  FaGlobe, 
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaRupeeSign,
  FaClock,
  FaBuilding,
  FaUserGraduate,
  FaCertificate,
  FaCheckCircle,
  FaArrowUp,
  FaSearch,
  FaLightbulb,
  FaStar
} from "react-icons/fa";
import { 
  IoIosSchool, 
  IoIosBusiness, 
  IoIosCalendar,
  IoIosCash,
  IoIosHelpCircle
} from "react-icons/io";

const ChatBotBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      from: "bot", 
      text: "**Hello 👋 Welcome to Skill Up Institute!**\n\nI'm here to help you with:\n\n• **Course information & fees** 💰\n• **Admission process** 📝\n• **Placement assistance** 🎯\n• **Contact details** 📞\n• **Distance education** 🎓\n\nHow can I assist you today?" 
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCourseSelection, setShowCourseSelection] = useState(false);
  const [scrollToMessage, setScrollToMessage] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const messagesStartRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Institute data
  const instituteData = {
    instituteName: "Skill Up Institute of Learning",
    contact: {
      phone: ["98551-46491", "94639-26371"],
      email: "skillupinstitute00@gamil.com",
      website: "https://skillupinstitute.co.in",
      address: "Chandigarh Chowk, Garhshankar, Hoshiarpur, Punjab"
    },
    admissions: {
      process: "Visit the institute or apply online via the website. Choose your course, complete registration, and confirm admission by paying the first installment.",
      intakes: ["January", "April", "July", "October"],
      eligibility: "Open to students, graduates, and working professionals. Basic computer knowledge preferred."
    },
    fees: {
      currency: "INR",
      paymentOptions: ["Full", "Monthly Installments"],
      refundPolicy: "Refunds are subject to management policy and timing of withdrawal before or after course commencement."
    },
    placements: {
      assistance: true,
      partners: [],
      averageCTC: "Varies by course and performance; skill development focused for job readiness.",
      support: ["Job-ready skill development", "Resume building", "Weekly & monthly online tests"]
    },
    courses: [
      {
        "id": "comp-app",
        "name": "Computer Application",
        "durationOptions": {
          "3_month": 5000,
          "6_month": 9500,
          "1_year": 12500
        },
        "department": "Computer Department",
        "category": "computer"
      },
      {
        "id": "office-auto",
        "name": "Office Automation",
        "durationOptions": {
          "3_month": 5500,
          "6_month": 10000,
          "1_year": 13500
        },
        "department": "Computer Department",
        "category": "computer"
      },
      {
        "id": "languages",
        "name": "Programming Languages",
        "certificates": ["C", "C++", "JavaScript", "HTML & CSS", "SQL"],
        "duration": "3 months",
        "fees": 5500,
        "department": "Languages Department",
        "category": "programming"
      },
      {
        "id": "graphic-design",
        "name": "Graphic Designing",
        "durationOptions": {
          "3_month": 7500,
          "6_month": 12500,
          "1_year": 18500
        },
        "department": "Designing Department",
        "category": "design"
      },
      {
        "id": "web-design",
        "name": "Web Designing",
        "durationOptions": {
          "3_month": 9500,
          "6_month": 14500,
          "1_year": 21500
        },
        "department": "Designing Department",
        "category": "design"
      },
      {
        "id": "autocad",
        "name": "AutoCAD",
        "durationOptions": {
          "3_month": 9500,
          "6_month": 14500,
          "1_year": 21500
        },
        "department": "Designing Department",
        "category": "design"
      },
      {
        "id": "tally",
        "name": "Tally ERP-9 & PRIME",
        "durationOptions": {
          "3_month": 6500,
          "6_month": 10500,
          "1_year": 13500
        },
        "department": "Accounting Department",
        "category": "business"
      },
      {
        "id": "video-editing",
        "name": "Video Editing",
        "durationOptions": {
          "3_month": 9500,
          "6_month": 14500,
          "1_year": 21500
        },
        "department": "Editing Department",
        "category": "multimedia"
      },
      {
        "id": "typing",
        "name": "English & Punjabi Typing",
        "fees": 1500,
        "duration": "Per month",
        "department": "Typing Department",
        "category": "language"
      },
      {
        "id": "spoken-english",
        "name": "Spoken English",
        "fees": 2500,
        "duration": "Per month",
        "department": "Language Department",
        "category": "language"
      }
    ],
    distanceEducation: {
      degrees: [
        "BA", "MA", "B.COM", "M.COM", 
        "DCA", "BCA", "MCA", 
        "B.Sc IT", "M.Sc IT", 
        "DLIS", "BLIS", "MLIS"
      ],
      mode: "Distance Education"
    },
    timing: [
      "9:00 AM - 11:00 AM",
      "11:00 AM - 1:00 PM",
      "2:00 PM - 4:00 PM",
      "3:00 PM - 5:00 PM"
    ],
    highlights: [
      "Affordable Tuition Fees",
      "Flexible Class Schedules",
      "Experienced Instructors",
      "Supportive Learning Environment",
      "Job-Ready Skill Development",
      "Weekly & Monthly Online Tests",
      "Online Verified Certificate"
    ],
    accreditations: [
      "ISO 9001:2015 Certified",
      "EGAC Accredited",
      "IAF Member"
    ],
    faqs: [
      { "q": "Do you offer certificates?", "a": "Yes, online verified certificates are issued after successful course completion." },
      { "q": "Can I take classes online?", "a": "Some courses are offered online with AI tools and assessments." },
      { "q": "Do you provide placement assistance?", "a": "Yes, we focus on job-ready skill development and guidance for career preparation." }
    ]
  };

  // Course categories for filtering
  const courseCategories = [
    { id: "all", name: "All Courses", icon: <FaGraduationCap /> },
    { id: "computer", name: "Computer", icon: <FaBuilding /> },
    { id: "design", name: "Design", icon: <FaCertificate /> },
    { id: "programming", name: "Programming", icon: <IoIosSchool /> },
    { id: "business", name: "Business", icon: <FaBriefcase /> },
    { id: "language", name: "Language", icon: <FaGlobe /> },
    { id: "multimedia", name: "Multimedia", icon: <FaStar /> }
  ];

  // Enhanced quick actions with categories
  const quickActions = [
    { 
      label: "Course Fees", 
      query: "Show me all course fees", 
      icon: <IoIosCash />,
      category: "courses"
    },
    
   
    { 
      label: "Contact Info", 
      query: "What is your contact information?", 
      icon: <FaPhone />,
      category: "contact"
    },
    { 
      label: "Distance Education", 
      query: "Tell me about distance education", 
      icon: <FaGraduationCap />,
      category: "courses"
    },
   
    { 
      label: "Certification", 
      query: "Do you provide certificates?", 
      icon: <FaCertificate />,
      category: "general"
    },
   
  ];

  // Improved scroll handling
  const scrollToMessageElement = (messageId, behavior = "smooth") => {
    setTimeout(() => {
      const messageElement = document.getElementById(`message-${messageId}`);
      const container = messagesContainerRef.current;
      
      if (messageElement && container) {
        // Calculate position to show message at top of visible area
        const containerRect = container.getBoundingClientRect();
        const messageRect = messageElement.getBoundingClientRect();
        const scrollTop = container.scrollTop;
        const messageTop = messageRect.top - containerRect.top + scrollTop;
        
        // Scroll to show message at top with some padding
        container.scrollTo({
          top: messageTop - 20, // 20px padding from top
          behavior: behavior
        });
      }
    }, 100);
  };

  const scrollToBottom = (behavior = "smooth") => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ 
        behavior: behavior,
        block: "end"
      });
    }, 100);
  };

  const scrollToTop = (behavior = "smooth") => {
    setTimeout(() => {
      messagesStartRef.current?.scrollIntoView({ 
        behavior: behavior,
        block: "start"
      });
    }, 100);
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      // Reset suggestions when opening
      setShowSuggestions(messages.length <= 1);
    }
  }, [isOpen, messages.length]);

  // Auto-hide suggestions after first interaction
  useEffect(() => {
    if (messages.length > 2) {
      setShowSuggestions(false);
    }
  }, [messages.length]);

  // Format message with bold text and icons
  const formatMessage = (text) => {
    let formattedText = text;
    
    // Format bold text
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Add icons for specific keywords
    formattedText = formattedText
      .replace(/₹(\d+,?\d*)/g, '<span class="inline-flex items-center gap-1"><FaRupeeSign class="inline text-green-600" />$1</span>')
      .replace(/fee(s)?/gi, '<span class="inline-flex items-center gap-1"><IoIosCash class="inline text-blue-600" />Fee$1</span>')
      .replace(/admission/gi, '<span class="inline-flex items-center gap-1"><FaUserGraduate class="inline text-purple-600" />Admission</span>')
      .replace(/course/gi, '<span class="inline-flex items-center gap-1"><IoIosSchool class="inline text-indigo-600" />Course</span>')
      .replace(/duration/gi, '<span class="inline-flex items-center gap-1"><FaClock class="inline text-orange-600" />Duration</span>')
      .replace(/placement/gi, '<span class="inline-flex items-center gap-1"><FaBriefcase class="inline text-green-600" />Placement</span>');
    
    return formattedText;
  };

  const handleSend = async (text = input) => {
    const messageText = text.trim();
    if (!messageText) return;

    const userMsg = { from: "user", text: messageText, id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setShowSuggestions(false);

    // Handle common queries locally
    const lowerMessage = messageText.toLowerCase();
    
    if (lowerMessage.includes('fee') || lowerMessage.includes('course') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      setShowCourseSelection(true);
      setIsLoading(false);
      // Scroll to show course selection at top
      setTimeout(() => {
        scrollToMessageElement(userMsg.id, "smooth");
      }, 150);
      return;
    }
    
    if (lowerMessage.includes('admission') || lowerMessage.includes('apply') || lowerMessage.includes('enroll')) {
      const admissionMsg = {
        from: "bot", 
        text: `**Admission Process** 🎓\n\n${instituteData.admissions.process}\n\n**Eligibility:**\n${instituteData.admissions.eligibility}\n\n**Intake Batches:**\n${instituteData.admissions.intakes.map(intake => `• ${intake}`).join('\n')}\n\n**Payment Options:**\n${instituteData.fees.paymentOptions.map(option => `• ${option} Payment`).join('\n')}\n\n**Class Timings:**\n${instituteData.timing.map(time => `• ${time}`).join('\n')}`,
        id: Date.now() + 1
      };
      setMessages((prev) => [...prev, admissionMsg]);
      setIsLoading(false);
      // Scroll to the new bot message at top
      setTimeout(() => {
        scrollToMessageElement(admissionMsg.id, "smooth");
      }, 150);
      return;
    }
    
    if (lowerMessage.includes('placement') || lowerMessage.includes('job') || lowerMessage.includes('career')) {
      const placementMsg = {
        from: "bot", 
        text: `**Placement Assistance** 🎯\n\nWe provide comprehensive placement support:\n\n**Services Include:**\n${instituteData.placements.support.map(service => `• ${service}`).join('\n')}\n\n**Average CTC:** ${instituteData.placements.averageCTC}\n\n**Certification:**\n• Online Verified Certificates\n• ISO 9001:2015 Certified Institute\n• EGAC Accredited`,
        id: Date.now() + 1
      };
      setMessages((prev) => [...prev, placementMsg]);
      setIsLoading(false);
      // Scroll to the new bot message at top
      setTimeout(() => {
        scrollToMessageElement(placementMsg.id, "smooth");
      }, 150);
      return;
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('address')) {
      const contactMsg = {
        from: "bot", 
        text: `**Contact Information** 📞\n\n**Phone Numbers:**\n${instituteData.contact.phone.map(phone => `• ${phone}`).join('\n')}\n\n**Email:**\n${instituteData.contact.email}\n\n**Website:**\n${instituteData.contact.website}\n\n**Address:**\n${instituteData.contact.address}\n\n**Institute Highlights:**\n${instituteData.highlights.map(highlight => `• ${highlight}`).join('\n')}`,
        id: Date.now() + 1
      };
      setMessages((prev) => [...prev, contactMsg]);
      setIsLoading(false);
      // Scroll to the new bot message at top
      setTimeout(() => {
        scrollToMessageElement(contactMsg.id, "smooth");
      }, 150);
      return;
    }
    
    if (lowerMessage.includes('distance') || lowerMessage.includes('online') || lowerMessage.includes('degree')) {
      const distanceMsg = {
        from: "bot", 
        text: `**Distance Education** 🎓\n\n**Available Degrees:**\n${instituteData.distanceEducation.degrees.map(degree => `• ${degree}`).join('\n')}\n\n**Mode:** ${instituteData.distanceEducation.mode}\n\n**Features:**\n• Flexible Learning Schedule\n• Online Study Materials\n• Digital Certificates\n• AI-Assisted Assessments\n\n**Accreditations:**\n${instituteData.accreditations.map(acc => `• ${acc}`).join('\n')}`,
        id: Date.now() + 1
      };
      setMessages((prev) => [...prev, distanceMsg]);
      setIsLoading(false);
      // Scroll to the new bot message at top
      setTimeout(() => {
        scrollToMessageElement(distanceMsg.id, "smooth");
      }, 150);
      return;
    }

    if (lowerMessage.includes('timing') || lowerMessage.includes('schedule') || lowerMessage.includes('time')) {
      const timingMsg = {
        from: "bot", 
        text: `**Class Timings** ⏰\n\nWe offer flexible batches throughout the day:\n\n${instituteData.timing.map(time => `• ${time}`).join('\n')}\n\n**Weekend batches** are also available for working professionals.\n\nYou can choose the batch that fits your schedule!`,
        id: Date.now() + 1
      };
      setMessages((prev) => [...prev, timingMsg]);
      setIsLoading(false);
      setTimeout(() => {
        scrollToMessageElement(timingMsg.id, "smooth");
      }, 150);
      return;
    }

    if (lowerMessage.includes('certificate') || lowerMessage.includes('certification')) {
      const certMsg = {
        from: "bot", 
        text: `**Certification** 📜\n\nYes! We provide **online verified certificates** after successful course completion.\n\n**Our Accreditations:**\n${instituteData.accreditations.map(acc => `• ${acc}`).join('\n')}\n\nAll certificates are digitally verifiable and recognized by employers.`,
        id: Date.now() + 1
      };
      setMessages((prev) => [...prev, certMsg]);
      setIsLoading(false);
      setTimeout(() => {
        scrollToMessageElement(certMsg.id, "smooth");
      }, 150);
      return;
    }

    // For other queries, use the API
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        const errorMessage = {
          from: "bot",
          text: `**I apologize, but I'm having trouble connecting right now.** 😔\n\nFor immediate assistance, please:\n\n**Phone:** ${instituteData.contact.phone.join(' / ')}\n**Email:** ${instituteData.contact.email}\n**Website:** ${instituteData.contact.website}\n\nYou can also visit us at:\n${instituteData.contact.address}`,
          id: Date.now() + 1
        };
        setMessages((prev) => [...prev, errorMessage]);
        // Scroll to the error message at top
        setTimeout(() => {
          scrollToMessageElement(errorMessage.id, "smooth");
        }, 150);
      } else {
        const botReply = {
          from: "bot",
          text: formatMessage(data?.reply || "I apologize, but I couldn't process your request. Please contact the institute directly for assistance."),
          isHTML: true,
          id: Date.now() + 1
        };
        setMessages((prev) => [...prev, botReply]);
        // Scroll to the bot reply at top
        setTimeout(() => {
          scrollToMessageElement(botReply.id, "smooth");
        }, 150);
      }
    } catch (err) {
      console.error("Chat error:", err);
      const fallbackMessage = {
        from: "bot",
        text: `**I'm currently unavailable.** 😞\n\nFor immediate help with courses, fees, or admissions:\n\n**Phone:** ${instituteData.contact.phone.join(' / ')}\n**Email:** ${instituteData.contact.email}\n**Website:** ${instituteData.contact.website}\n**Address:** ${instituteData.contact.address}\n\n**Class Timings:**\n${instituteData.timing.map(time => `• ${time}`).join('\n')}`,
        id: Date.now() + 1
      };
      
      setMessages((prev) => [...prev, fallbackMessage]);
      // Scroll to the fallback message at top
      setTimeout(() => {
        scrollToMessageElement(fallbackMessage.id, "smooth");
      }, 150);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (query) => {
    // First scroll to top to ensure we have space for the new message
    scrollToTop("instant");
    
    // Small delay to allow scroll to complete before adding message
    setTimeout(() => {
      handleSend(query);
    }, 100);
  };

  const handleCourseSelect = (course) => {
    setShowCourseSelection(false);
    
    let feeMessage = `**${course.name}**\n\n`;
    feeMessage += `**Department:** ${course.department}\n\n`;
    
    if (course.durationOptions) {
      feeMessage += "**Duration Options:**\n";
      Object.entries(course.durationOptions).forEach(([duration, fee]) => {
        const durationText = duration.replace('_', ' ').replace('month', 'Month');
        feeMessage += `• ${durationText}: ₹${fee.toLocaleString('en-IN')}\n`;
      });
    } else {
      feeMessage += `**Duration:** ${course.duration}\n`;
      feeMessage += `**Fees:** ₹${course.fees.toLocaleString('en-IN')}\n`;
    }
    
    if (course.certificates) {
      feeMessage += `\n**Certificates Included:**\n${course.certificates.map(cert => `• ${cert}`).join('\n')}\n`;
    }
    
    feeMessage += `\n**Payment Options:** Full payment or monthly installments\n`;
    feeMessage += `**Admission:** Open for ${instituteData.admissions.intakes.join(', ')} intakes\n\n`;
    feeMessage += `Interested in **${course.name}**? Would you like to know about admission process or other courses?`;

    const courseMessage = {
      from: "bot",
      text: feeMessage,
      id: Date.now() + 1
    };

    setMessages((prev) => [...prev, courseMessage]);
    // Scroll to the course message at top
    setTimeout(() => {
      scrollToMessageElement(courseMessage.id, "smooth");
    }, 150);
  };

  const clearChat = () => {
    setMessages([
      { 
        from: "bot", 
        text: "**Hello 👋 Welcome to Skill Up Institute!**\n\nI'm here to help you with:\n\n• **Course information & fees** 💰\n• **Admission process** 📝\n• **Placement assistance** 🎯\n• **Contact details** 📞\n• **Distance education** 🎓\n\nHow can I assist you today?" 
      }
    ]);
    setShowCourseSelection(false);
    setShowSuggestions(true);
    setActiveCategory("all");
    
    // Scroll to top after clearing
    setTimeout(() => {
      scrollToTop("smooth");
    }, 100);
  };

  const filteredCourses = instituteData.courses.filter(course => 
    activeCategory === "all" || course.category === activeCategory
  );

  const filteredQuickActions = quickActions.filter(action => 
    activeCategory === "all" || action.category === activeCategory
  );

  const renderMessageContent = (msg) => {
    if (msg.isHTML) {
      return <div dangerouslySetInnerHTML={{ __html: msg.text }} />;
    }
    
    return msg.text.split('\n').map((line, lineIndex) => {
      if (line.trim() === '') {
        return <br key={lineIndex} />;
      }
      
      // Format bold text in regular messages
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      return (
        <div 
          key={lineIndex} 
          className={lineIndex > 0 ? 'mt-2' : ''}
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      );
    });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        animate={{ 
          scale: [1, 1.05, 1],
          transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="text-xl"
        >
          <FaComments />
        </motion.div>
        {/* Notification dot when closed */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
          />
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[600px] max-h-[60vh] flex flex-col bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div>
                  <span className="font-bold text-sm block">SkillUp Assistant</span>
                 
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={clearChat}
                  className="text-white hover:text-gray-200 text-sm transition p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                  title="Clear chat"
                >
                  <FaTrash size={14} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            </div>

            {/* Quick Actions with Categories */}
            <div className="bg-blue-50 px-3 py-2 border-b border-blue-100">
             
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-1">
                {filteredQuickActions.slice(0, 6).map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.query)}
                    className="flex items-center gap-1 bg-white text-blue-600 text-xs px-3 py-2 rounded-full border border-blue-200 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm"
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Body */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-white to-blue-50 relative scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent"
            >
              {/* Scroll to top button */}
              <div className="sticky top-0 z-10 flex justify-end mb-2">
                <button
                  onClick={() => scrollToTop("smooth")}
                  className="bg-white text-blue-600 p-2 rounded-full shadow-md hover:bg-blue-50 transition-all backdrop-blur-sm"
                  title="Scroll to top"
                >
                  <FaArrowUp size={12} />
                </button>
              </div>

              {/* Messages start reference */}
              <div ref={messagesStartRef} />
              
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id || idx}
                  id={`message-${msg.id || idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`my-3 flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.from === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none shadow-md"
                        : "bg-white text-gray-800 rounded-bl-none border border-gray-100 shadow-sm"
                    }`}
                  >
                    {renderMessageContent(msg)}
                    
                    {/* Add special styling for specific message types */}
                    {(msg.text.includes('₹') || msg.text.includes('fee')) && msg.from === 'bot' && (
                      <div className="mt-2 pt-2 border-t border-blue-100 flex items-center gap-1 text-xs text-blue-600">
                        <IoIosCash />
                        <span className="font-semibold">Fee Information</span>
                      </div>
                    )}
                    
                    {msg.text.includes('Admission') && msg.from === 'bot' && (
                      <div className="mt-2 pt-2 border-t border-purple-100 flex items-center gap-1 text-xs text-purple-600">
                        <FaUserGraduate />
                        <span className="font-semibold">Admission Details</span>
                      </div>
                    )}
                    
                    {msg.text.includes('Placement') && msg.from === 'bot' && (
                      <div className="mt-2 pt-2 border-t border-green-100 flex items-center gap-1 text-xs text-green-600">
                        <FaBriefcase />
                        <span className="font-semibold">Career Support</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* Course Selection */}
              {showCourseSelection && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="my-3"
                >
                  <div className="bg-white rounded-2xl rounded-bl-none border border-gray-100 shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
                        <FaSearch />
                        <span>Browse Courses</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {filteredCourses.length} courses
                      </span>
                    </div>
                    
                    {/* Course Search/Filter */}
                    <div className="mb-3">
                      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
                        {courseCategories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full border transition-all whitespace-nowrap ${
                              activeCategory === category.id
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-blue-600 border-blue-200 hover:bg-blue-100"
                            }`}
                          >
                            {category.icon}
                            <span>{category.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                      {filteredCourses.map((course) => (
                        <button
                          key={course.id}
                          onClick={() => handleCourseSelect(course)}
                          className="text-left p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                        >
                          <div className="font-medium text-gray-800 text-sm group-hover:text-blue-600">
                            {course.name}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <FaBuilding className="text-gray-400" />
                            {course.department}
                          </div>
                          {course.durationOptions && (
                            <div className="flex items-center gap-1 text-xs text-green-600 font-semibold mt-1">
                              <FaRupeeSign />
                              {Object.values(course.durationOptions)[0].toLocaleString('en-IN')} onwards
                            </div>
                          )}
                          {course.fees && (
                            <div className="flex items-center gap-1 text-xs text-green-600 font-semibold mt-1">
                              <FaRupeeSign />
                              {course.fees.toLocaleString('en-IN')}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Smart Suggestions */}
              {showSuggestions && messages.length <= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="my-3"
                >
                  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-yellow-700 mb-2">
                      <FaLightbulb className="text-yellow-500" />
                      <span>Quick Suggestions</span>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleQuickAction("What are the most popular courses?")}
                        className="text-left w-full text-xs text-yellow-700 hover:text-yellow-900 p-2 rounded-lg hover:bg-yellow-100 transition-all"
                      >
                        💡 What are the most popular courses?
                      </button>
                      <button
                        onClick={() => handleQuickAction("Do you offer installment plans?")}
                        className="text-left w-full text-xs text-yellow-700 hover:text-yellow-900 p-2 rounded-lg hover:bg-yellow-100 transition-all"
                      >
                        💡 Do you offer installment plans?
                      </button>
                      <button
                        onClick={() => handleQuickAction("What certificates do you provide?")}
                        className="text-left w-full text-xs text-yellow-700 hover:text-yellow-900 p-2 rounded-lg hover:bg-yellow-100 transition-all"
                      >
                        💡 What certificates do you provide?
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start my-3"
                >
                  <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none px-4 py-3 text-sm border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="w-2 h-2 bg-blue-600 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-blue-600 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-blue-600 rounded-full"
                        />
                      </div>
                      Searching information...
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Scroll to bottom button */}
              <div className="sticky bottom-0 flex justify-end mt-2">
                <button
                  onClick={() => scrollToBottom("smooth")}
                  className="bg-white text-blue-600 p-2 rounded-full shadow-md hover:bg-blue-50 transition-all backdrop-blur-sm"
                  title="Scroll to bottom"
                >
                  <FaArrowUp size={12} className="rotate-180" />
                </button>
              </div>
              
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-3 bg-white">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 text-sm p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Ask about courses, fees, admissions..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
                  disabled={isLoading}
                />
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center gap-2"
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? "⏳" : <><FaPaperPlane /> Send</>}
                </motion.button>
              </div>
              
              {/* Help text */}
              <div className="mt-2 text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                <IoIosHelpCircle className="text-blue-500" />
                Try: "Computer course fees" or "Admission process"
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-opacity-10 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBotBubble;