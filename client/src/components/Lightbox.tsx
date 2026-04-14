/**
 * Lightbox Component
 * Design: Modern Lifestyle Magazine
 * - Full-screen image viewer with prev/next navigation
 * - Keyboard navigation support
 * - Smooth fade transitions
 */
import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors p-2"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Counter */}
      <div
        className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest"
        style={{ fontFamily: 'var(--font-nav)' }}
      >
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          className="absolute left-4 text-white/70 hover:text-white transition-colors p-3"
          onClick={e => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Image */}
      <div
        className="max-w-5xl max-h-[85vh] px-16"
        onClick={e => e.stopPropagation()}
      >
        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain mx-auto"
          style={{ animation: 'fadeInUp 0.25s ease' }}
        />
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          className="absolute right-4 text-white/70 hover:text-white transition-colors p-3"
          onClick={e => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); /* navigate to index */ }}
              className={`w-12 h-8 overflow-hidden transition-opacity ${
                i === currentIndex ? 'opacity-100 ring-1 ring-white' : 'opacity-40 hover:opacity-70'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
