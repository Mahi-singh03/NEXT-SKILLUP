// app/(Main App)/gallery/page.jsx
"use client";

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

const SkeletonItem = () => (
  <div className="aspect-square overflow-hidden animate-pulse">
    <div className="w-full h-full bg-gray-200 rounded-lg" />
  </div>
);

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/cloudinary', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Prevent browser caching
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data?.images?.length) {
        throw new Error('No images found');
      };

      // Sort images by publicId (fallback to alphabetical if no number)
      const sortedImages = data.images
        .map(img => ({
          ...img,
          // Try to extract number from publicId, fallback to string for sorting
          sortKey: img.publicId.match(/\d+/) ? parseInt(img.publicId.match(/\d+/)?.[0]) : img.publicId,
          alt: img.context?.custom?.alt || `Gallery image ${img.publicId.split('/').pop()}`,
        }))
        .sort((a, b) => {
          // Sort numerically if both have numbers, otherwise alphabetically
          if (typeof a.sortKey === 'number' && typeof b.sortKey === 'number') {
            return a.sortKey - b.sortKey;
          }
          return a.publicId.localeCompare(b.publicId);
        });

      setImages(sortedImages);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message || 'Failed to fetch images');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const prevImage = useCallback(() => {
    setLightbox(prev => ({
      ...prev,
      index: (prev.index - 1 + images.length) % images.length,
    }));
  }, [images.length]);

  const nextImage = useCallback(() => {
    setLightbox(prev => ({
      ...prev,
      index: (prev.index + 1) % images.length,
    }));
  }, [images.length]);

  const closeLightbox = useCallback(() => {
    setLightbox({ open: false, index: 0 });
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    },
    [prevImage, nextImage, closeLightbox]
  );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });

  useEffect(() => {
    if (lightbox.open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [lightbox.open, handleKeyDown]);

  const openLightbox = useCallback((index) => {
    setLightbox({ open: true, index });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <p className="text-red-500 mb-4 text-lg font-medium">Error: {error}</p>
        <button
          onClick={fetchImages}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e3f1f1] px-4 sm:px-6 lg:px-8 pt-7">
      <h1 className="text-center text-4xl sm:text-5xl font-bold text-[#1e90ff] mb-8 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1">
        Gallery
      </h1>

      {loading && (
        <div className="flex justify-center items-center mb-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600" />
        </div>
      )}

      {images.length === 0 && !loading && (
        <p className="text-center text-gray-600 text-lg">No images available in the gallery.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading
          ? Array(8)
              .fill()
              .map((_, i) => <SkeletonItem key={i} />)
          : images.map((image, index) => (
              <motion.div
                key={image.publicId}
                className="aspect-square overflow-hidden cursor-pointer group rounded-lg shadow-lg"
                onClick={() => openLightbox(index)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                aria-label={`Open image ${image.alt} in lightbox`}
              >
                <Image
                  src={`${image.url}?f_auto&q_auto&w=400`}
                  alt={image.alt}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full rounded-lg"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNP6LGr4QAAAABJRU5ErkJggg=="
                />
              </motion.div>
            ))}
      </div>

      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            tabIndex={0}
            {...swipeHandlers}
            onClick={closeLightbox}
            role="dialog"
            aria-label="Image lightbox"
          >
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ×
            </button>

            <div className="flex items-center justify-center w-full px-4" onClick={(e) => e.stopPropagation()}>
              <button
                className="hidden md:block text-white text-4xl mx-4 hover:text-gray-300 transition-colors"
                onClick={prevImage}
                aria-label="Previous image"
              >
                ‹
              </button>

              <div className="relative max-w-full max-h-[90vh]">
                {images && images[lightbox.index] && images[lightbox.index].url ? (
                  <Image
                    src={`${images[lightbox.index].url}?f_auto&q_auto&w=1200`}
                    alt={images[lightbox.index].alt || 'Gallery image'}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-[90vh] object-contain p-4"
                    priority
                  />
                ) : null}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded">
                  {images[lightbox.index]?.alt || 'Gallery image'} ({lightbox.index + 1} / {images.length})
                </div>
              </div>

              <button
                className="hidden md:block text-white text-4xl mx-4 hover:text-gray-300 transition-colors"
                onClick={nextImage}
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            <div className="md:hidden fixed bottom-4 w-full flex justify-between px-4">
              <button
                className="text-white text-3xl bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                onClick={prevImage}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                className="text-white text-3xl bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                onClick={nextImage}
                aria-label="Next image"
              >
                ›
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;