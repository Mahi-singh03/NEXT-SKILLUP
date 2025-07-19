"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { 
  FaUserGraduate, FaChalkboardTeacher, FaEdit, FaUserEdit,
  FaMoneyBillWave, FaUsers, FaCamera, FaCertificate,
  FaChevronLeft, FaChevronRight, FaSignOutAlt, FaCalendarAlt,
  FaBars, FaTimes, FaHome, FaChartLine, FaCog, FaBell
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState('Admin');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);

  // Vibrant color palette
  const cardColors = [
    'from-purple-500 to-pink-500',    // Add Student
    'from-blue-500 to-cyan-400',      // Add Staff
    'from-green-500 to-emerald-400',  // Edit Student
    'from-yellow-500 to-amber-400',   // Edit Staff
    'from-red-500 to-orange-400',     // Student Fees
    'from-indigo-500 to-violet-500',  // View Students
    'from-teal-500 to-blue-400',      // Student Photos
    'from-rose-500 to-pink-400'       // Certificates
  ];

  useEffect(() => {
    const checkMobile = () => {
      setMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const fetchAdminData = () => {
      setTimeout(() => {
        setAdminName('Dr. Sarah Johnson');
        setLoading(false);
      }, 800);
    };

    fetchAdminData();

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const actionCards = [
    { 
      id: 'add-student', 
      title: 'Add Student', 
      icon: <FaUserGraduate className="group-hover:rotate-6 transition-transform" size={28} />,
      color: cardColors[0],
      path: '/admin/students/add'
    },
    { 
      id: 'add-staff', 
      title: 'Add Staff', 
      icon: <FaChalkboardTeacher className="group-hover:rotate-6 transition-transform" size={28} />,
      color: cardColors[1],
      path: '/admin/staff/add'
    },
    { 
      id: 'edit-student', 
      title: 'Edit Student', 
      icon: <FaEdit className="group-hover:rotate-6 transition-transform" size={28} />,
      color: cardColors[2],
      path: '/admin/students/edit'
    },
    { 
      id: 'edit-staff', 
      title: 'Edit Staff', 
      icon: <FaUserEdit className="group-hover:rotate-6 transition-transform" size={28} />,
      color: cardColors[3],
      path: '/admin/staff/edit'
    },
    { 
      id: 'add-fees', 
      title: 'Student Fees', 
      icon: <FaMoneyBillWave className="group-hover:rotate-6 transition-transform" size={28} />,
      color: cardColors[4],
      path: '/admin/fees'
    },
    { 
      id: 'view-students', 
      title: 'View Students', 
      icon: <FaUsers className="group-hover:rotate-6 transition-transform" size={28} />,
      color: cardColors[5],
      path: '/admin/students'
    },
    { 
      id: 'add-photo', 
      title: 'Student Photos', 
      icon: <FaCamera className="group-hover:rotate-6 transition-transform" size={28} />,
      color: cardColors[6],
      path: '/admin/photos'
    },
    { 
      id: 'certificates', 
      title: 'Certificates', 
      icon: <FaCertificate className="group-hover:rotate-6 transition-transform" size={28} />,
      color: cardColors[7],
      path: '/admin/certificates'
    }
  ];

  const navLinks = [
    { name: 'Dashboard', icon: <FaHome size={18} />, path: '/admin' },
    { name: 'Analytics', icon: <FaChartLine size={18} />, path: '/admin/analytics' },
    { name: 'Settings', icon: <FaCog size={18} />, path: '/admin/settings' }
  ];

  const recentActivities = [
    { id: 1, title: 'New student registration', time: '2 hours ago', icon: <FaUserGraduate />, color: 'text-purple-500' },
    { id: 2, title: 'Fee payment received', time: '5 hours ago', icon: <FaMoneyBillWave />, color: 'text-green-500' },
    { id: 3, title: 'Staff meeting scheduled', time: '1 day ago', icon: <FaChalkboardTeacher />, color: 'text-blue-500' }
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleDateClick = (arg) => {
    alert('Date clicked: ' + arg.dateStr);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-full bg-white shadow-lg text-purple-600"
      >
        {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </motion.button>

      {/* Sidebar with Calendar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside 
            initial={{ x: mobileView ? -300 : 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: mobileView ? -300 : 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed md:relative z-40 flex flex-col w-72 md:w-80 p-6 bg-white shadow-xl h-full ${mobileView ? 'shadow-2xl' : ''}`}
          >
            {/* Admin Profile */}
            <div className="flex items-center mb-8">
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold cursor-pointer shadow-md"
              >
                {adminName.charAt(0)}
              </motion.div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Welcome back</p>
                <h2 className="font-semibold text-gray-800 truncate">{adminName}</h2>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="mb-6">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={link.path}
                      className={`flex items-center p-3 rounded-lg transition-colors ${activeTab === link.name.toLowerCase() ? 'bg-purple-50 text-purple-600 font-medium' : 'text-gray-700 hover:bg-purple-50'}`}
                      onClick={() => setActiveTab(link.name.toLowerCase())}
                    >
                      <span className={`mr-3 ${activeTab === link.name.toLowerCase() ? 'text-purple-500' : 'text-gray-500'}`}>{link.icon}</span>
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Calendar Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FaCalendarAlt className="mr-2 text-purple-500" />
                  Academic Calendar
                </h3>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrevMonth}
                    className="p-2 rounded-md hover:bg-purple-50 text-purple-600"
                  >
                    <FaChevronLeft />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNextMonth}
                    className="p-2 rounded-md hover:bg-purple-50 text-purple-600"
                  >
                    <FaChevronRight />
                  </motion.button>
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-purple-50 rounded-xl p-4 shadow-inner border border-purple-100"
              >
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={false}
                  height="350px"
                  initialDate={currentDate}
                  aspectRatio={1.1}
                  fixedWeekCount={false}
                  dayHeaderClassNames="text-purple-700 text-sm font-medium"
                  dayCellClassNames="hover:bg-purple-100 cursor-pointer"
                  dayClassNames="text-center p-2"
                  moreLinkClassNames="text-xs text-purple-500 hover:text-purple-700"
                  dateClick={handleDateClick}
                />
              </motion.div>
            </div>

            {/* Logout Button for Mobile */}
            {mobileView && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/admin-login')}
                className="mt-auto flex items-center justify-center space-x-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all w-full"
              >
                <span>Logout</span>
                <FaSignOutAlt />
              </motion.button>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && mobileView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="hidden md:block text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100"
              >
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="relative cursor-pointer"
              >
                <FaBell className="text-purple-600" size={20} />
                {notifications > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {notifications}
                  </motion.span>
                )}
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/admin-login')}
                className="hidden md:flex items-center space-x-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <span>Logout</span>
                <FaSignOutAlt />
              </motion.button>
            </div>
          </div>
        </header>

        {/* Action Cards */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h2 
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              className="text-2xl font-bold text-gray-800 mb-4 md:mb-6"
            >
              Welcome, <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{adminName.split(' ')[0]}</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 mb-6 md:mb-8"
            >
              Quickly access administrative functions or view important information.
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              <AnimatePresence>
                {actionCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ 
                      y: -5,
                      scale: 1.02,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-gradient-to-br ${card.color} rounded-xl md:rounded-2xl shadow-md md:shadow-lg overflow-hidden h-40 md:h-48 flex flex-col justify-between p-4 md:p-6 text-white relative group cursor-pointer`}
                  >
                    <Link href={card.path} className="absolute inset-0 z-10" />
                    
                    <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                    
                    <motion.div 
                      className="self-end transform transition-transform duration-300 group-hover:scale-110"
                      whileHover={{ rotate: 10 }}
                    >
                      {card.icon}
                    </motion.div>
                    
                    <div className="relative z-20">
                      <h3 className="text-lg md:text-xl font-semibold mb-1">{card.title}</h3>
                      <p className="text-white text-opacity-90 text-xs md:text-sm">Click to access</p>
                    </div>
                    
                    <motion.div 
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-70 transition-all duration-300"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Recent Activity Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 bg-white rounded-xl shadow-md p-6 border border-purple-50"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                <span className="text-sm text-purple-500 font-medium">View All</span>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    whileHover={{ x: 5 }}
                    className="flex items-start p-3 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center ${activity.color} mr-3`}>
                      {activity.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;