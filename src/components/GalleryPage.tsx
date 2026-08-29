import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Heart,
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

  // Video Player state
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // Photo Likes state
  const [likesMap, setLikesMap] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    photoMemories.forEach((p) => {
      map[p.id] = p.likes;
    });
    return map;
  });
  const [likedByUser, setLikedByUser] = useState<Record<string, boolean>>({});

  // Touch Swipe coordinates for Mobile Photo Lightbox
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNextPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = photoMemories.findIndex((p) => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % photoMemories.length;
    setActivePhoto(photoMemories[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = photoMemories.findIndex((p) => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + photoMemories.length) % photoMemories.length;
    setActivePhoto(photoMemories[prevIndex]);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhoto) {
        if (e.key === 'Escape') setActivePhoto(null);
        else if (e.key === 'ArrowRight') handleNextPhoto();
        else if (e.key === 'ArrowLeft') handlePrevPhoto();
      } else if (activeVideo) {
        if (e.key === 'Escape') setActiveVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, activeVideo]);

  // Touch Swipe Handlers for Lightbox
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
      handleNextPhoto();
    } else if (distance < -minSwipeDistance) {
      handlePrevPhoto();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedByUser((prev) => {
      const isCurrentlyLiked = !!prev[id];
      const newStatus = !isCurrentlyLiked;
      setLikesMap((prevLikes) => ({
        ...prevLikes,
        [id]: (prevLikes[id] || 0) + (newStatus ? 1 : -1)
      }));
      return { ...prev, [id]: newStatus };
    });
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
            className={`flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#050B18] shadow-lg shadow-[#D4AF37]/25 scale-105 border border-[#D4AF37]'
                : 'bg-[#0A1630] text-[#CBD5E1] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:text-[#FDFCF0]'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Photos</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'videos'
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
                      <div className="w-full aspect-[4/3] sm:aspect-square overflow-hidden bg-black/40 relative">
                        <img
                          src={photo.image}
                          alt={photo.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 filter brightness-95 group-hover:brightness-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050B18]/60 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

                        {/* Top Right Like Button */}
                        <div className="absolute top-2 right-2 pointer-events-auto">
                          <button
                            onClick={(e) => handleLike(photo.id, e)}
                            className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                              likedByUser[photo.id]
                                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                                : 'bg-black/60 text-white/80 hover:text-red-400 border border-white/10'
                            }`}
                            title="Like photo"
                          >
                            <Heart className={`w-3.5 h-3.5 ${likedByUser[photo.id] ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Photos Pagination Bar */}
              {totalPhotoPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10 sm:mt-14 pt-6 border-t border-white/10">
                  <button
                    onClick={() => handlePhotoPageChange(validPhotosPage - 1)}
                    disabled={validPhotosPage === 1}
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                      validPhotosPage === 1
                        ? 'opacity-40 cursor-not-allowed bg-[#0A1630] text-[#94A3B8] border border-white/10'
                        : 'bg-[#0A1630] hover:bg-[#122244] text-[#FDFCF0] hover:text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] cursor-pointer active:scale-95'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
                    <span>Prev</span>
                  </button>

                  <div className="flex items-center gap-1.5 px-2">
                    {Array.from({ length: totalPhotoPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePhotoPageChange(pageNum)}
                        className={`w-8 h-8 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          validPhotosPage === pageNum
                            ? 'bg-[#D4AF37] text-[#050B18] shadow-md scale-105 border border-[#D4AF37]'
                            : 'bg-[#0A1630] text-[#CBD5E1] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:text-[#FDFCF0]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePhotoPageChange(validPhotosPage + 1)}
                    disabled={validPhotosPage === totalPhotoPages}
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                      validPhotosPage === totalPhotoPages
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
                      <img
                        src={video.poster}
                        alt={video.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-[#050B18] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#FDFCF0] transition-all duration-300">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] tracking-wider px-2.5 py-0.5 rounded-full bg-black/75 text-[#FDFCF0] font-medium flex items-center gap-1 backdrop-blur-sm border border-white/10">
                          <Clock className="w-3 h-3 text-[#D4AF37]" />
                          {video.duration}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Videos Pagination Bar */}
              {totalVideoPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10 sm:mt-14 pt-6 border-t border-white/10">
                  <button
                    onClick={() => handleVideoPageChange(validVideosPage - 1)}
                    disabled={validVideosPage === 1}
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                      validVideosPage === 1
                        ? 'opacity-40 cursor-not-allowed bg-[#0A1630] text-[#94A3B8] border border-white/10'
                        : 'bg-[#0A1630] hover:bg-[#122244] text-[#FDFCF0] hover:text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] cursor-pointer active:scale-95'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
                    <span>Prev</span>
                  </button>

                  <div className="flex items-center gap-1.5 px-2">
                    {Array.from({ length: totalVideoPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handleVideoPageChange(pageNum)}
                        className={`w-8 h-8 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          validVideosPage === pageNum
                            ? 'bg-[#D4AF37] text-[#050B18] shadow-md scale-105 border border-[#D4AF37]'
                            : 'bg-[#0A1630] text-[#CBD5E1] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:text-[#FDFCF0]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleVideoPageChange(validVideosPage + 1)}
                    disabled={validVideosPage === totalVideoPages}
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                      validVideosPage === totalVideoPages
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

      {/* Clean Fullscreen Photo Lightbox Modal - NO Text Panel */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-3 sm:p-6 select-none"
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
              className="relative max-w-5xl w-full max-h-[92vh] bg-black border border-[#D4AF37]/40 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 text-[#FDFCF0] hover:text-[#D4AF37] border border-white/20 transition-colors cursor-pointer"
                aria-label="Close photo viewer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Like Heart Button */}
              <button
                onClick={(e) => handleLike(activePhoto.id, e)}
                className={`absolute top-4 left-4 z-30 p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                  likedByUser[activePhoto.id]
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'bg-black/70 text-white/80 hover:text-red-400 border border-white/20'
                }`}
                aria-label="Like photo"
              >
                <Heart className={`w-5 h-5 ${likedByUser[activePhoto.id] ? 'fill-current' : ''}`} />
              </button>

              {/* Full Image */}
              <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden min-h-[300px] max-h-[88vh] p-2">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain pointer-events-none max-h-[85vh]"
                />

                {/* Left/Right Carousel Nav Arrows */}
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-black/65 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer z-20"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-black/65 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer z-20"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clean Video Modal Player - NO Text Content */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-6"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-black border border-[#D4AF37]/40 rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 text-[#FDFCF0] hover:text-[#D4AF37] transition-colors border border-white/20 cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video w-full bg-black">
                <video
                  src={activeVideo.videoUrl}
                  poster={activeVideo.poster}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
