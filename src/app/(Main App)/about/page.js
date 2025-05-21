// app/about/page.jsx
import Image from 'next/image';

const About = () => {
  return (
    <div className="min-h-screen bg-[#C3E6E6] px-4 sm:px-6 lg:px-8 pt-7">
      {/* Main About Section */}
      <h1 className="text-center text-4xl sm:text-5xl font-bold text-[#2C3E50] mb-8">
        About
      </h1>
      <section className="text-center py-16 bg-gradient-to-r from-[#F8F9FA] to-white mb-12 animate-slideIn">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2C3E50] mb-4">
            Skillup Institute of Learning
          </h1>
          <p className="text-xl text-[#E74C3C] font-medium mb-6">
            Empowering Futures Through Quality Education
          </p>
          <p className="max-w-3xl mx-auto text-[#34495E] leading-8 text-base sm:text-lg">
            At Skill Up Institute, we believe in transforming lives through comprehensive learning experiences. 
            Established with a vision to bridge the gap between education and industry requirements, we offer 
            cutting-edge courses taught by experienced professionals. Our student-centric approach ensures 
            every learner achieves their full potential in a supportive, technology-driven environment.
          </p>
        </div>
      </section>

      {/* Motto Section */}
      <section className="bg-[#2C3E50] py-16 text-center mb-12 animate-fadeIn">
        <div>
          <h2 className="text-3xl sm:text-4xl text-white italic mb-4 drop-shadow-md">
            "Learn Today, Lead Tomorrow"
          </h2>
          <p className="text-[#BDC3C7] text-base sm:text-lg uppercase tracking-wide">
            Building Competence & Confidence
          </p>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="mb-12 w-full">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-[#2C3E50] mb-4">
          Visit Us
        </h2>
        <p className="text-center text-[#7F8C8D] text-lg font-medium mb-8">
          Your Journey to Excellence Starts Here
        </p>
        
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F8F9FA] p-6 rounded-xl shadow-md text-center mb-8 animate-fadeIn max-w-3xl mx-auto">
            <p className="text-[#34495E] text-base sm:text-lg font-medium">
              📍 Chandigarh Chownk, Garhshankar, Hoshiarpur, Punjab
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[800px] w-full">
            <div className="relative rounded-xl shadow-md overflow-hidden animate-fadeIn w-full h-full">
              <Image
                src="https://res.cloudinary.com/dufxj1sau/image/upload/v1740739144/Home/uug7bg4ltspvkfzlcmbx.jpg"
                alt="Modern campus facilities"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="relative rounded-xl shadow-md overflow-hidden w-full h-full">
              <iframe
                title="Institute Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d297.2833250180151!2d76.14618661509465!3d31.21245878727104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391abff81b0f5a21%3A0xa7b8d37a0c200b2e!2sSkill%20Up%20Institute%20of%20learning!5e0!3m2!1sen!2sin!4v1738394711503!5m2!1sen!2sin"
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Staff Section */}
      <section className="mt-48">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-[#2C3E50] mb-4">
          Our Staff
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {/* Staff Card 1 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all animate-fadeIn">
            <div className="relative pt-[100%]">
              <Image
                src="https://res.cloudinary.com/dufxj1sau/image/upload/v1739439468/Staff/zweu20epysgcp6y3uoh4.jpg"
                alt="Manoj Barhpagga"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">Manoj Barhpagga</h3>
              <p className="text-[#7F8C8D] text-sm font-medium">Website Designer</p>
            </div>
          </div>

          {/* Staff Card 2 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all animate-fadeIn">
            <div className="relative pt-[100%]">
              <Image
                src="https://res.cloudinary.com/dufxj1sau/image/upload/v1739439468/Staff/af29pvtnivzhzdp9hhwj.jpg"
                alt="Neha"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">Neha</h3>
              <p className="text-[#7F8C8D] text-sm font-medium">Computer Teacher</p>
            </div>
          </div>

          {/* Staff Card 3 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all animate-fadeIn">
            <div className="relative pt-[100%]">
              <Image
                src="https://res.cloudinary.com/dufxj1sau/image/upload/v1739439468/Staff/hormuhfj4unhu13l3kr9.jpg"
                alt="Partiksha"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">Parteeksha</h3>
              <p className="text-[#7F8C8D] text-sm font-medium">PTE Teacher</p>
            </div>
          </div>

          {/* Staff Card 4 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all animate-fadeIn">
            <div className="relative pt-[100%]">
              <Image
                src="https://res.cloudinary.com/dufxj1sau/image/upload/v1739439469/Staff/awmrrqsdjsxfyzcxmtz5.jpg"
                alt="Aditya"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">Aditya Sharma</h3>
              <p className="text-[#7F8C8D] text-sm font-medium">Social Media Manager</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;