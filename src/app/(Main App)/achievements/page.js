import Image from 'next/image';

const FullScreenImage = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Mobile Image - Hidden on md and above */}
      <div className="block md:hidden w-full h-full">
        <Image
          src="https://res.cloudinary.com/dufxj1sau/image/upload/v1742807382/Untitled_Project_zgwhxq_u3iqho.jpg"
          alt="Mobile view image"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Desktop Image - Hidden below md */}
      <div className="hidden md:block w-full h-full">
        <Image
          src="https://res.cloudinary.com/dufxj1sau/image/upload/v1748493347/image_copy_wd0df8_1_wyrw2e.jpg"
          alt="Desktop view image"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default FullScreenImage;