import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  RotateCw,
  X,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Play,
  Clock,
  Film,
  Camera
} from 'lucide-react';
import { MemoryItem, VideoItem } from '../types';
import { photoMemories } from '../data/memories';
import { videoMemories } from '../data/videos';

interface GalleryPageProps {
  onBackToHome: () => void;
  initialPhotoId?: string;
}

const PHOTOS_PER_PAGE = 8;
const VIDEOS_PER_PAGE = 6;

export const GalleryPage: React.FC<GalleryPageProps> = ({ onBackToHome, initialPhotoId }) => {
  // Main Tab State: 'photos' or 'videos'
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');

  // Pagination states
  const [photosPage, setPhotosPage] = useState<number>(1);
  const [videosPage, setVideosPage] = useState<number>(1);
  const galleryGridRef = useRef<HTMLDivElement>(null);

  // Photo Lightbox state
  const [activePhoto, setActivePhoto] = useState<MemoryItem | null>(() => {
    if (initialPhotoId) {
      return photoMemories.find((p) => p.id === initialPhotoId) || null;
    }
    return null;
  });

  // Photo Auto-Rotate state (degree rotation per photo)
  const [photoRotationMap, setPhotoRotationMap] = useState<Record<string, number>>({});

  const handleRotatePhoto = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPhotoRotationMap((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + 90) % 360
    }));
  };

  // Video Player state & Navigation
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const activePhotoIndex = activePhoto ? photoMemories.findIndex((p) => p.id === activePhoto.id) : -1;
  const activeVideoIndex = activeVideo ? videoMemories.findIndex((v) => v.id === activeVideo.id) : -1;

  const handleNextVideo = () => {
    if (activeVideoIndex >= 0 && activeVideoIndex < videoMemories.length - 1) {
      setActiveVideo(videoMemories[activeVideoIndex + 1]);
    }
  };

  const handlePrevVideo = () => {
    if (activeVideoIndex > 0) {
      setActiveVideo(videoMemories[activeVideoIndex - 1]);
    }
  };

  // Touch Swipe coordinates for Mobile Lightbox
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNextPhoto = () => {
    if (activePhotoIndex >= 0 && activePhotoIndex < photoMemories.length - 1) {
      setActivePhoto(photoMemories[activePhotoIndex + 1]);
    }
  };

  const handlePrevPhoto = () => {
    if (activePhotoIndex > 0) {
      setActivePhoto(photoMemories[activePhotoIndex - 1]);
    }
  };

  // Keyboard navigation for Lightbox & Video Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhoto) {
        if (e.key === 'Escape') setActivePhoto(null);
        else if (e.key === 'ArrowRight') handleNextPhoto();
        else if (e.key === 'ArrowLeft') handlePrevPhoto();
        else if (e.key === 'r' || e.key === 'R') handleRotatePhoto(activePhoto.id);
      } else if (activeVideo) {
        if (e.key === 'Escape') setActiveVideo(null);
        else if (e.key === 'ArrowRight') handleNextVideo();
        else if (e.key === 'ArrowLeft') handlePrevVideo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, activeVideo]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      if (activePhoto) handleNextPhoto();
      else if (activeVideo) handleNextVideo();
    } else if (distance < -minSwipeDistance) {
      if (activePhoto) handlePrevPhoto();
      else if (activeVideo) handlePrevVideo();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const getCardRotation = (idx: number) => {
    const rotations = [-1.5, 1.2, -1, 1.8, -2, 1.5];
    return rotations[idx % rotations.length];
  };

  // Pagination calculation for Photos
  const totalPhotoPages = Math.max(1, Math.ceil(photoMemories.length / PHOTOS_PER_PAGE));
  const validPhotosPage = Math.min(photosPage, totalPhotoPages);
  const paginatedPhotos = photoMemories.slice((validPhotosPage - 1) * PHOTOS_PER_PAGE, validPhotosPage * PHOTOS_PER_PAGE);

  // Pagination calculation for Videos
  const totalVideoPages = Math.max(1, Math.ceil(videoMemories.length / VIDEOS_PER_PAGE));
  const validVideosPage = Math.min(videosPage, totalVideoPages);
  const paginatedVideos = videoMemories.slice((validVideosPage - 1) * VIDEOS_PER_PAGE, validVideosPage * VIDEOS_PER_PAGE);

  const handlePhotoPageChange = (page: number) => {
    if (page >= 1 && page <= totalPhotoPages) {
      setPhotosPage(page);
      if (galleryGridRef.current) {
        galleryGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleVideoPageChange = (page: number) => {
    if (page >= 1 && page <= totalVideoPages) {
      setVideosPage(page);
      if (galleryGridRef.current) {
        galleryGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050B18] text-[#FDFCF0] font-sans selection:bg-[#D4AF37] selection:text-[#050B18] overflow-x-hidden">
      {/* Top Accent Gradient Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-40 z-50 pointer-events-none" />

      {/* Header Bar - Cleanly Aligned for All Views */}
      <header className="sticky top-0 z-40 bg-[#050B18]/90 backdrop-blur-xl border-b border-[#D4AF37]/20 py-2.5 px-3 sm:px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A1630] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[11px] sm:text-xs font-semibold tracking-wider text-[#FDFCF0] hover:text-[#D4AF37] transition-all cursor-pointer shrink-0 active:scale-95 shadow-md"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Back to Main Site</span>
          </button>

          <div className="flex items-center gap-1.5 shrink-0">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] shrink-0" />
            <span className="font-display text-xs sm:text-sm font-bold text-[#FDFCF0] whitespace-nowrap">
              KRCE CSE-A
            </span>
          </div>
        </div>
      </header>

      {/* Main Gallery Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-16">

        {/* TWO CATEGORY TABS ONLY: Photos & Videos */}
        <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10">
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${activeTab === 'photos'
                ? 'bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#050B18] shadow-lg shadow-[#D4AF37]/25 scale-105 border border-[#D4AF37]'
                : 'bg-[#0A1630] text-[#CBD5E1] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:text-[#FDFCF0]'
              }`}
          >
            <Camera className="w-4 h-4" />
            <span>Photos</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${activeTab === 'videos'
                ? 'bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#050B18] shadow-lg shadow-[#D4AF37]/25 scale-105 border border-[#D4AF37]'
                : 'bg-[#0A1630] text-[#CBD5E1] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:text-[#FDFCF0]'
              }`}
          >
            <Film className="w-4 h-4" />
            <span>Videos</span>
          </button>
        </div>

        {/* Anchor point for pagination scroll */}
        <div ref={galleryGridRef} className="scroll-mt-24">

          {/* TAB 1: PHOTOS GRID WITH PAGINATION */}
          {activeTab === 'photos' && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6"
              >
                {paginatedPhotos.map((photo, idx) => {
                  const initialRotation = getCardRotation(idx);
                  const userRotation = photoRotationMap[photo.id] || 0;

                  return (
                    <motion.div
                      key={photo.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, rotate: initialRotation }}
                      animate={{ opacity: 1, scale: 1, rotate: initialRotation }}
                      transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.3) }}
                      whileHover={{
                        scale: 1.04,
                        rotate: 0,
                        y: -5,
                        zIndex: 20,
                        transition: { type: 'spring', stiffness: 350, damping: 22 },
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActivePhoto(photo)}
                      className="group relative rounded-2xl sm:rounded-[2rem] overflow-hidden bg-[#0A1630] border-[4px] sm:border-[5px] border-[#0A1630] ring-1 ring-[#D4AF37]/35 shadow-[0_15px_35px_rgba(0,0,0,0.5)] cursor-pointer transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(212,175,55,0.2)]"
                    >
                      {/* Clean Image Container */}
                      <div className="w-full aspect-[4/3] sm:aspect-square overflow-hidden bg-black/40 relative flex items-center justify-center">
                        <img
                          src={photo.image}
                          alt={photo.title}
                          loading="lazy"
                          style={{ transform: `rotate(${userRotation}deg)` }}
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src.includes('/images_opt/')) {
                              const filename = target.src.split('/images_opt/')[1].replace('.webp', '.jpg');
                              target.src = `/images/${filename}`;
                            }
                          }}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 filter brightness-95 group-hover:brightness-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050B18]/60 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity pointer-events-none" />

                        {/* Top Right Auto-Rotate Button */}
                        <div className="absolute top-2 right-2 pointer-events-auto z-10">
                          <button
                            onClick={(e) => handleRotatePhoto(photo.id, e)}
                            className="p-1.5 sm:p-2 rounded-full bg-black/70 hover:bg-[#D4AF37] text-white hover:text-[#050B18] border border-white/20 backdrop-blur-md transition-all active:scale-90 shadow-md cursor-pointer"
                            title="Rotate photo 90°"
                          >
                            <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Photos Pagination Bar - Clean Compact Row without horizontal scroll */}
              {totalPhotoPages > 1 && (
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8 sm:mt-12 pt-6 border-t border-white/10 w-full px-2">
                  <button
                    onClick={() => handlePhotoPageChange(validPhotosPage - 1)}
                    disabled={validPhotosPage === 1}
                    className={`flex items-center gap-1 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${validPhotosPage === 1
                        ? 'opacity-40 cursor-not-allowed bg-[#0A1630] text-[#94A3B8] border border-white/10'
                        : 'bg-[#0A1630] hover:bg-[#122244] text-[#FDFCF0] hover:text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] cursor-pointer active:scale-95'
                      }`}
                  >
                    <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
                    <span>Prev</span>
                  </button>

                  <div className="flex items-center gap-1 sm:gap-1.5">
                    {Array.from({ length: totalPhotoPages }, (_, i) => i + 1)
                      .filter((p) => p === 1 || p === totalPhotoPages || Math.abs(p - validPhotosPage) <= 1)
                      .map((pageNum, i, arr) => {
                        const prevPage = arr[i - 1];
                        const showEllipsis = prevPage && pageNum - prevPage > 1;

                        return (
                          <React.Fragment key={pageNum}>
                            {showEllipsis && (
                              <span className="text-xs text-[#94A3B8] px-0.5 font-bold">...</span>
                            )}
                            <button
                              onClick={() => handlePhotoPageChange(pageNum)}
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${validPhotosPage === pageNum
                                  ? 'bg-[#D4AF37] text-[#050B18] shadow-md scale-105 border border-[#D4AF37]'
                                  : 'bg-[#0A1630] text-[#CBD5E1] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:text-[#FDFCF0]'
                                }`}
                            >
                              {pageNum}
                            </button>
                          </React.Fragment>
                        );
                      })}
                  </div>

                  <button
                    onClick={() => handlePhotoPageChange(validPhotosPage + 1)}
                    disabled={validPhotosPage === totalPhotoPages}
                    className={`flex items-center gap-1 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${validPhotosPage === totalPhotoPages
                        ? 'opacity-40 cursor-not-allowed bg-[#0A1630] text-[#94A3B8] border border-white/10'
                        : 'bg-[#0A1630] hover:bg-[#122244] text-[#FDFCF0] hover:text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] cursor-pointer active:scale-95'
                      }`}
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VIDEOS GRID WITH PAGINATION */}
          {activeTab === 'videos' && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
              >
                {paginatedVideos.map((video, idx) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    onClick={() => setActiveVideo(video)}
                    className="group relative rounded-2xl overflow-hidden bg-[#0A1630] border-[4px] sm:border-[5px] border-[#0A1630] ring-1 ring-[#D4AF37]/35 shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                      {video.poster ? (
                        <img
                          src={video.poster}
                          alt={video.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                        />
                      ) : (
                        /* Native First-Frame Video Thumbnail Rendering */
                        <video
                          src={`${video.videoUrl}#t=0.5`}
                          preload="metadata"
                          muted
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100 pointer-events-none"
                        />
                      )}

                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-[#050B18] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#FDFCF0] transition-all duration-300">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Videos Pagination Bar - Clean Compact Row without horizontal scroll */}
              {totalVideoPages > 1 && (
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8 sm:mt-12 pt-6 border-t border-white/10 w-full px-2">
                  <button
                    onClick={() => handleVideoPageChange(validVideosPage - 1)}
                    disabled={validVideosPage === 1}
                    className={`flex items-center gap-1 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${validVideosPage === 1
                        ? 'opacity-40 cursor-not-allowed bg-[#0A1630] text-[#94A3B8] border border-white/10'
                        : 'bg-[#0A1630] hover:bg-[#122244] text-[#FDFCF0] hover:text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] cursor-pointer active:scale-95'
                      }`}
                  >
                    <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
                    <span>Prev</span>
                  </button>

                  <div className="flex items-center gap-1 sm:gap-1.5">
                    {Array.from({ length: totalVideoPages }, (_, i) => i + 1)
                      .filter((p) => p === 1 || p === totalVideoPages || Math.abs(p - validVideosPage) <= 1)
                      .map((pageNum, i, arr) => {
                        const prevPage = arr[i - 1];
                        const showEllipsis = prevPage && pageNum - prevPage > 1;

                        return (
                          <React.Fragment key={pageNum}>
                            {showEllipsis && (
                              <span className="text-xs text-[#94A3B8] px-0.5 font-bold">...</span>
                            )}
                            <button
                              onClick={() => handleVideoPageChange(pageNum)}
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${validVideosPage === pageNum
                                  ? 'bg-[#D4AF37] text-[#050B18] shadow-md scale-105 border border-[#D4AF37]'
                                  : 'bg-[#0A1630] text-[#CBD5E1] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:text-[#FDFCF0]'
                                }`}
                            >
                              {pageNum}
                            </button>
                          </React.Fragment>
                        );
                      })}
                  </div>

                  <button
                    onClick={() => handleVideoPageChange(validVideosPage + 1)}
                    disabled={validVideosPage === totalVideoPages}
                    className={`flex items-center gap-1 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${validVideosPage === totalVideoPages
                        ? 'opacity-40 cursor-not-allowed bg-[#0A1630] text-[#94A3B8] border border-white/10'
                        : 'bg-[#0A1630] hover:bg-[#122244] text-[#FDFCF0] hover:text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] cursor-pointer active:scale-95'
                      }`}
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Fullscreen Photo Lightbox Modal - Fully Mobile Optimized */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-6 select-none"
            onClick={() => setActivePhoto(null)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[95vh] bg-black border border-[#D4AF37]/40 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-1 sm:p-4"
            >
              {/* Top Right Action Bar (Close & Rotate) - Visible above photo on mobile */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-40 flex items-center gap-2">
                <button
                  onClick={(e) => handleRotatePhoto(activePhoto.id, e)}
                  className="p-2 sm:p-2.5 rounded-full bg-black/80 text-[#FDFCF0] hover:text-[#D4AF37] border border-white/20 transition-all cursor-pointer backdrop-blur-md active:scale-90"
                  title="Rotate photo 90°"
                  aria-label="Rotate photo"
                >
                  <RotateCw className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                </button>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="p-2 sm:p-2.5 rounded-full bg-black/80 text-[#FDFCF0] hover:text-[#D4AF37] border border-white/20 transition-all cursor-pointer backdrop-blur-md active:scale-90"
                  aria-label="Close photo viewer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Full Image */}
              <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden min-h-[280px] max-h-[88vh] p-1">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  style={{ transform: `rotate(${photoRotationMap[activePhoto.id] || 0}deg)` }}
                  className="w-full h-full object-contain pointer-events-none max-h-[82vh] transition-transform duration-300"
                />

                {/* Mobile & Desktop Carousel Nav Arrows */}
                {activePhotoIndex > 0 && (
                  <button
                    onClick={handlePrevPhoto}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3.5 rounded-full bg-black/75 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer z-30 shadow-xl active:scale-90"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                )}
                {activePhotoIndex >= 0 && activePhotoIndex < photoMemories.length - 1 && (
                  <button
                    onClick={handleNextPhoto}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3.5 rounded-full bg-black/75 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer z-30 shadow-xl active:scale-90"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal Player - Fully Mobile Optimized */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-6 select-none"
            onClick={() => setActiveVideo(null)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-black border border-[#D4AF37]/40 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-1 sm:p-4"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-40 p-2 sm:p-2.5 rounded-full bg-black/80 text-[#FDFCF0] hover:text-[#D4AF37] transition-all border border-white/20 cursor-pointer backdrop-blur-md active:scale-90"
                aria-label="Close video player"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="relative aspect-video w-full bg-black flex items-center justify-center min-h-[250px]">
                <video
                  key={activeVideo.id}
                  src={activeVideo.videoUrl}
                  poster={activeVideo.poster || undefined}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain max-h-[82vh]"
                />

                {/* Mobile & Desktop Video Backward (Prev) Arrow Button */}
                {activeVideoIndex > 0 && (
                  <button
                    onClick={handlePrevVideo}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3.5 rounded-full bg-black/75 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer z-30 shadow-xl active:scale-90"
                    aria-label="Previous video"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                )}

                {/* Mobile & Desktop Video Forward (Next) Arrow Button */}
                {activeVideoIndex >= 0 && activeVideoIndex < videoMemories.length - 1 && (
                  <button
                    onClick={handleNextVideo}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3.5 rounded-full bg-black/75 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer z-30 shadow-xl active:scale-90"
                    aria-label="Next video"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
