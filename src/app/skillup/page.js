"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        console.log('Admin token from localStorage:', adminToken ? 'Token exists' : 'No token');
        
        if (!adminToken) {
          throw new Error('No admin token found');
        }

        console.log('Making request with token:', adminToken.substring(0, 20) + '...');
        
        const response = await fetch('/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        
        console.log('Response status:', response.status);
        console.log('Response data:', data);
        
        if (response.ok) {
          setStats(data);
        } else {
          throw new Error(data.message || 'Failed to fetch stats');
        }
      } catch (err) {
        console.error('Frontend error:', err);
        setError(err.message);
        // Redirect to login if unauthorized
        if (err.message.includes('Not authorized') || err.message.includes('No admin token found')) {
          router.push('/admin-login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [router]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <motion.div 
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg hidden md:block"
        >
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a href="#" className="block px-4 py-2 text-blue-600 bg-blue-50 rounded font-medium">Dashboard</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Users</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Settings</a>
              </li>
            </ul>
          </nav>
        </motion.div>

        {/* Mobile header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center"
        >
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </motion.header>

        {/* Main content */}
        <main className="md:ml-64 p-4">
          {/* Welcome card */}
          {stats && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white mb-6"
            >
              <h2 className="text-2xl font-bold mb-2">Welcome back, {stats.adminName}!</h2>
              <p className="opacity-90">Last login: {new Date(stats.lastLogin).toLocaleString()}</p>
            </motion.div>
          )}

          {/* Stats grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            <motion.div 
              variants={cardVariants}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Total Admins</p>
                  <h3 className="text-3xl font-bold text-gray-800">
                    {stats?.totalAdmins || 0}
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={cardVariants}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Active Sessions</p>
                  <h3 className="text-3xl font-bold text-gray-800">1</h3>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={cardVariants}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">System Status</p>
                  <h3 className="text-3xl font-bold text-gray-800">Online</h3>
                </div>
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Recent admins table */}
          {stats?.recentAdmins && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Recent Admins</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stats.recentAdmins.map((admin, index) => (
                      <motion.tr
                        key={admin._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-medium">
                                {admin.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;