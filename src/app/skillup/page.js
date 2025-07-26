"use client";

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
  FaTimes, FaHome, FaChartLine, FaCog
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState('Admin');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isHovering, setIsHovering] = useState(null);
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    certifiedStudents: 0,
    totalstaff: 0,
  });
  const [statsError, setStatsError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load admin data from localStorage
        const adminData = localStorage.getItem('adminData');
        if (adminData) {
          const parsedData = JSON.parse(adminData);
          setAdminName(parsedData.name || 'Admin');
        }

        // Fetch student and staff stats from API
        const [totalRes, activeRes, certifiedRes, staffRes] = await Promise.all([
          fetch('/api/admin/stats?type=total', { method: 'GET' }),
          fetch('/api/admin/stats?type=active', { method: 'GET' }),
          fetch('/api/admin/stats?type=certified', { method: 'GET' }),
          fetch('/api/admin/stats?type=staff', { method: 'GET' }),
        ]);

        // Check response status
        const errors = [];
        if (!totalRes.ok) errors.push(`Total: ${totalRes.status}`);
        if (!activeRes.ok) errors.push(`Active: ${activeRes.status}`);
        if (!certifiedRes.ok) errors.push(`Certified: ${certifiedRes.status}`);
        if (!staffRes.ok) errors.push(`Staff: ${staffRes.status}`);
        if (errors.length > 0) {
          throw new Error(`Failed to fetch data: ${errors.join(', ')}`);
        }

        const totalData = await totalRes.json();
        const activeData = await activeRes.json();
        const certifiedData = await certifiedRes.json();
        const staffData = await staffRes.json();

        setStats({
          totalStudents: totalData.data?.totalStudents || 0,
          activeStudents: activeData.data?.activeStudents || 0,
          certifiedStudents: certifiedData.data?.certifiedStudents || 0,
          totalStaff: staffData.data?.certifiedStaff || staffData.data?.totalStaff || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStatsError(error.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const actionCards = [
    { 
      id: 'add-student', 
      title: 'Add Student', 
      icon: <FaUserGraduate className="text-4xl" />,
      bgColor: 'bg-purple-100',
      hoverBgColor: 'bg-purple-200',
      textColor: 'text-purple-800',
      path: '/skillup/students/add'
    },
    { 
      id: 'add-staff', 
      title: 'Add Staff', 
      icon: <FaChalkboardTeacher className="text-4xl" />,
      bgColor: 'bg-blue-100',
      hoverBgColor: 'bg-blue-200',
      textColor: 'text-blue-800',
      path: '/skillup/add-staff'
    },
    { 
      id: 'edit-student', 
      title: 'Edit Student', 
      icon: <FaEdit className="text-4xl" />,
      bgColor: 'bg-green-100',
      hoverBgColor: 'bg-green-200',
      textColor: 'text-green-800',
      path: '/skillup/edit-student'
    },
    { 
      id: 'edit-staff', 
      title: 'Edit Staff', 
      icon: <FaUserEdit className="text-4xl" />,
      bgColor: 'bg-yellow-100',
      hoverBgColor: 'bg-yellow-200',
      textColor: 'text-yellow-800',
      path: '/skillup/edit-staff'
    },
    { 
      id: 'add-fees', 
      title: 'Student Fees', 
      icon: <FaMoneyBillWave className="text-4xl" />,
      bgColor: 'bg-red-100',
      hoverBgColor: 'bg-red-200',
      textColor: 'text-red-800',
      path: '/skillup/fees'
    },
    { 
      id: 'view-students', 
      title: 'View Students', 
      icon: <FaUsers className="text-4xl" />,
      bgColor: 'bg-indigo-100',
      hoverBgColor: 'bg-indigo-200',
      textColor: 'text-indigo-800',
      path: '/skillup/students'
    },
    { 
      id: 'add-photo', 
      title: 'Student Photos', 
      icon: <FaCamera className="text-4xl" />,
      bgColor: 'bg-teal-100',
      hoverBgColor: 'bg-teal-200',
      textColor: 'text-teal-800',
      path: '/skillup/photos'
    },
    { 
      id: 'certificates', 
      title: 'Certificates', 
      icon: <FaCertificate className="text-4xl" />,
      bgColor: 'bg-pink-100',
      hoverBgColor: 'bg-pink-200',
      textColor: 'text-pink-800',
      path: '/skillup/certificate'
    }
  ];

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    router.push('/admin-login');
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50"
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        ></motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50"
    >
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-30"
      >
        <div className="flex items-center space-x-4">
          <Link href="/skillup" className="flex items-center">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="bg-blue-600 p-2 rounded-lg"
            >
              <FaUserGraduate className="text-white text-xl" />
            </motion.div>
            <h1 className="text-4xl font-bold text-blue-600 ml-2 p-4">SkillUp Admin Section</h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCalendarOpen(true)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center space-x-2"
          >
            <FaCalendarAlt className="text-gray-600" />
            <span className="hidden md:inline">Calendar</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-800 hover:to-gray-700 shadow-md"
          >
            <span>Logout</span>
            <FaSignOutAlt />
          </motion.button>
        </div>
      </motion.header>

      {/* Sidebar and Main Content */}
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-blue-500"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome back, <span className="text-blue-600">{adminName}</span>!
            </h2>
            <p className="text-gray-600">
              You are the Admin now, You have the Power!!!
            </p>
            
            {statsError ? (
              <div className="text-red-600 text-center mt-4">Error: {statsError}</div>
            ) : (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <p className="text-sm text-yellow-600">Active Students</p>
                  <p className="text-2xl font-bold">{stats.activeStudents}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <p className="text-sm text-red-600">Certificate Issued</p>
                  <p className="text-2xl font-bold">{stats.certifiedStudents}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-600">Total Students</p>
                  <p className="text-2xl font-bold">{stats.totalStudents}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <p className="text-sm text-green-600">Staff</p>
                  <p className="text-2xl font-bold">{stats.totalStaff}</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Action Cards Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {actionCards.map((card) => (
              <Link href={card.path} key={card.id}>
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setIsHovering(card.id)}
                  onMouseLeave={() => setIsHovering(null)}
                  className={`${card.bgColor} ${isHovering === card.id ? card.hoverBgColor : ''} ${card.textColor} rounded-xl shadow-sm p-6 flex flex-col items-center cursor-pointer h-full transition-colors duration-300 border border-transparent hover:border-opacity-20 hover:border-current`}
                >
                  <motion.div
                    animate={isHovering === card.id ? { 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                  >
                    {card.icon}
                  </motion.div>
                  <h3 className="text-lg font-bold mb-1 text-center">{card.title}</h3>
                  <motion.p 
                    animate={isHovering === card.id ? { 
                      opacity: [0.8, 1, 0.8],
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-sm opacity-80"
                  >
                    Click to access
                  </motion.p>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </main>
      </div>

      {/* Calendar Panel */}
      <AnimatePresence>
        {calendarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCalendarOpen(false)}
              className="fixed inset-0 bg-blur bg-opacity-30 z-40 backdrop-blur-sm"
            />
            
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-xl z-50 p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <motion.h2 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold"
                >
                  Academic Calendar
                </motion.h2>
                
                <motion.button 
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCalendarOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between mb-4 bg-gray-50 p-2 rounded-lg"
              >
                <motion.button 
                  whileHover={{ x: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevMonth}
                  className="p-2 rounded-md hover:bg-gray-200"
                >
                  <FaChevronLeft />
                </motion.button>
                
                <motion.span 
                  key={currentDate.toString()}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-medium"
                >
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </motion.span>
                
                <motion.button 
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextMonth}
                  className="p-2 rounded-md hover:bg-gray-200"
                >
                  <FaChevronRight />
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-50 rounded-lg p-4 shadow-inner"
              >
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={false}
                  height="400px"
                  initialDate={currentDate}
                />
              </motion.div>
              
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminDashboard;