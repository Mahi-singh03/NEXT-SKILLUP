`use client`;
import React from "react";
import Card from "../components/home/card";
import Review from "../components/home/review";

const Home = () => {
  return (
    <div className=" bg-[#e3f1f1]">
      {/* Hero Video Section */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden " />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-cover"
        >
          {/* Mobile-first video source */}
          <source
            src="https://res.cloudinary.com/dufxj1sau/video/upload/v1742188663/Welcome_to_our_2_asgquc.mp4"
            type="video/mp4"
            media="(max-width: 768px)"
          />
          {/* Default video source for larger screens */}
          <source
            src="https://res.cloudinary.com/dufxj1sau/video/upload/v1741068132/skillup_institute_of_learning_5_1_online-video-cutter.com_ylonqx.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Featured Courses Section */}
      <section className="p-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Trending Courses
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mt-2">
            Explore our most popular Courses to get industry ready
          </p>
        </div>


          <Card/> 

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { number: "50+", label: "Active Learners", icon: "👩‍🎓" },
            { number: "250+", label: "Course Hours", icon: "⏳" },
            { number: "98%", label: "Satisfaction Rate", icon: "❤️" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl text-center transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg animate-slide-up"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-2xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="p-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Why Choose Us?
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mt-2">
            Discover the unique benefits of our learning platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            {
              icon: "📁",
              title: "Project-Based Learning",
              description: "Build real-world projects and portfolio pieces that demonstrate your skills",
            },
            {
              icon: "👨",
              title: "Expert Mentors",
              description: "Get guidance from industry professionals with real-world experience",
            },
            {
              icon: "🎛️",
              title: "Flexible Schedule",
              description: "Learn at your own pace with lifetime access to course materials",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-200 animate-slide-up"
            >
              <div className="bg-blue-50 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="p-6">
       

       <Review/>
      </section>
    </div>
  );
};

export default Home;