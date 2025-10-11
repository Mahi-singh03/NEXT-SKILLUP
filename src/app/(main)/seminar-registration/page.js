// components/SeminarRegistrationForm.js
"use client"
import { useState, useEffect } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLaptop, FaBuilding, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';

export default function SeminarRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    modePreference: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  // Scroll to top when success message is shown
  useEffect(() => {
    if (showSuccess) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showSuccess]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    setShowSuccess(false);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Show success state and scroll to top
        setShowSuccess(true);
        setFormData({
          name: '',
          phoneNumber: '',
          email: '',
          address: '',
          modePreference: ''
        });
      } else {
        setMessage({
          type: 'error',
          text: result.message || 'Registration failed. Please try again.'
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Network error. Please check your connection.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Confirmation Component
  const SuccessConfirmation = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-scale-in">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-4xl text-blue-500 animate-bounce" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Registration Successful!
          </h2>
          
          <p className="text-gray-600 mb-2">
            Thank you for registering for our seminar.
          </p>
          <p className="text-gray-600 mb-6">
           We’ll contact you soon through email and WhatsApp with all the details of the seminar.
          </p>



          <button
            onClick={() => setShowSuccess(false)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // Check if field has value
  const hasValue = (fieldName) => formData[fieldName] && formData[fieldName].trim() !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100 flex items-center justify-center p-4 md:p-6">
      {/* Success Modal */}
      {showSuccess && <SuccessConfirmation />}

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full opacity-60 animate-float"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-cyan-200 rounded-full opacity-60 animate-float animation-delay-2000"></div>
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-blue-300 rounded-full opacity-40 animate-float animation-delay-4000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-cyan-300 rounded-full opacity-40 animate-float animation-delay-3000"></div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-200/50 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="relative z-10">
              <h1 className="text-2xl font-bold text-white mb-2 animate-fade-in">
                Seminar Registration
              </h1>
              <p className="text-blue-100 text-sm animate-fade-in animation-delay-300">
              Join our Excel + AI seminar at Skillup Institute
              </p>
            </div>
            
            {/* Animated wave effect */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-wshite/30 to-transparent animate-wave"></div>
          </div>

          {/* Form */}
          <div className="p-6">
            {message.text && (
              <div className={`mb-4 p-3 rounded-lg text-sm animate-slide-down ${
                message.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-700' 
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in animation-delay-500">
              {/* Name Field */}
              <div className="space-y-2 group">
                <label className="block text-gray-700 text-sm font-medium transition-colors duration-200 group-focus-within:text-blue-600">
                  Full Name *
                </label>
                <div className="relative transform transition-transform duration-200 group-focus-within:scale-[1.02]">
                  <FaUser className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-sm transition-all duration-200 ${
                    hasValue('name') || document.activeElement?.name === 'name'
                      ? 'text-blue-500 scale-110'
                      : 'text-blue-400'
                  }`} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2 group">
                <label className="block text-gray-700 text-sm font-medium transition-colors duration-200 group-focus-within:text-blue-600">
                  Phone Number *
                </label>
                <div className="relative transform transition-transform duration-200 group-focus-within:scale-[1.02]">
                  <FaPhone className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-sm transition-all duration-200 ${
                    hasValue('phoneNumber') || document.activeElement?.name === 'phoneNumber'
                      ? 'text-blue-500 scale-110'
                      : 'text-blue-400'
                  }`} />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2 group">
                <label className="block text-gray-700 text-sm font-medium transition-colors duration-200 group-focus-within:text-blue-600">
                  Email Address *
                </label>
                <div className="relative transform transition-transform duration-200 group-focus-within:scale-[1.02]">
                  <FaEnvelope className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-sm transition-all duration-200 ${
                    hasValue('email') || document.activeElement?.name === 'email'
                      ? 'text-blue-500 scale-110'
                      : 'text-blue-400'
                  }`} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Address Field */}
              <div className="space-y-2 group">
                <label className="block text-gray-700 text-sm font-medium transition-colors duration-200 group-focus-within:text-blue-600">
                  Address *
                </label>
                <div className="relative transform transition-transform duration-200 group-focus-within:scale-[1.02]">
                  <FaMapMarkerAlt className={`absolute left-3 top-4 text-sm transition-all duration-200 ${
                    hasValue('address') || document.activeElement?.name === 'address'
                      ? 'text-blue-500 scale-110'
                      : 'text-blue-400'
                  }`} />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
                    placeholder="Where are you from?"
                  />
                </div>
              </div>

              {/* Mode Preference */}
              <div className="space-y-3">
                <label className="block text-gray-700 text-sm font-medium">
                  Seminar Mode Preference *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`relative cursor-pointer transform transition-all duration-300 ${
                    formData.modePreference === 'online' ? 'scale-105 shadow-lg' : 'scale-100 hover:scale-102'
                  }`}>
                    <input
                      type="radio"
                      name="modePreference"
                      value="online"
                      checked={formData.modePreference === 'online'}
                      onChange={handleChange}
                      className="sr-only"
                      required
                    />
                    <div className={`p-3 border-2 rounded-lg text-center transition-all duration-300 backdrop-blur-sm ${
                      formData.modePreference === 'online'
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-blue-200'
                        : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-blue-300 hover:bg-blue-25'
                    }`}>
                      <FaLaptop className={`mx-auto mb-2 text-lg transition-all duration-300 ${
                        formData.modePreference === 'online' 
                          ? 'text-blue-500 scale-110' 
                          : 'text-blue-400 group-hover:scale-110'
                      }`} />
                      <div className="font-medium text-sm">Online</div>
                      <div className="text-xs opacity-70 mt-1">Join remotely</div>
                    </div>
                  </label>

                  <label className={`relative cursor-pointer transform transition-all duration-300 ${
                    formData.modePreference === 'offline' ? 'scale-105 shadow-lg' : 'scale-100 hover:scale-102'
                  }`}>
                    <input
                      type="radio"
                      name="modePreference"
                      value="offline"
                      checked={formData.modePreference === 'offline'}
                      onChange={handleChange}
                      className="sr-only"
                      required
                    />
                    <div className={`p-3 border-2 rounded-lg text-center transition-all duration-300 backdrop-blur-sm ${
                      formData.modePreference === 'offline'
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-blue-200'
                        : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-blue-300 hover:bg-blue-25'
                    }`}>
                      <FaBuilding className={`mx-auto mb-2 text-lg transition-all duration-300 ${
                        formData.modePreference === 'offline' 
                          ? 'text-blue-500 scale-110' 
                          : 'text-blue-400 group-hover:scale-110'
                      }`} />
                      <div className="font-medium text-sm">Offline</div>
                      <div className="text-xs opacity-70 mt-1">Attend in person</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 shadow-lg ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 hover:shadow-blue-500/25'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-sm text-white transition-transform duration-300 group-hover:translate-x-1" />
                    <span>Register for Seminar</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wave {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-down {
          animation: slide-down 0.4s ease-out forwards;
        }
        .animate-wave {
          animation: wave 3s linear infinite;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        .bg-blue-25 {
          background-color: rgba(59, 130, 246, 0.05);
        }
      `}</style>
    </div>
  );
}