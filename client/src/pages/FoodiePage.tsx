/**
 * FOODIE Page
 * Design: Modern Lifestyle Magazine — "The best is yet to come"
 * Layout: Polaroid-style photo grid with random slight rotations
 * Color: Warm cream background, soft shadows, handwritten-feel captions
 */
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Lightbox from '@/components/Lightbox';

const FOODIE_PHOTOS = [
  {
    id: 1,
    src: '/manus-storage/foodie-1_f72f2fd5.jpeg',
    caption: '',
    rotation: -2.5,
  },
  {
    id: 2,
    src: '/manus-storage/foodie-2_3642d14e.jpeg',
    caption: '',
    rotation: 1.8,
  },
  {
    id: 3,
    src: '/manus-storage/foodie-3_81dd4249.jpeg',
    caption: '',
    rotation: -1.2,
  },
  {
    id: 4,
    src: '/manus-storage/foodie-4_bc8cba17.jpeg',
    caption: '',
    rotation: 2.3,
  },
];

export default function FoodiePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = FOODIE_PHOTOS.map(p => p.src);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'oklch(0.972 0.010 75)' }}>
      <Header />

      <main className="flex-1 pt-16">
        {/* Page Header */}
        <div className="text-center py-14 px-4">
          <p
            className="tracking-[0.25em] text-xs mb-3"
            style={{ fontFamily: 'var(--font-nav)', color: 'oklch(0.65 0.025 70)' }}
          >
            FOODIE
          </p>
          <h1
            className="text-4xl sm:text-5xl italic mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.25 0.015 65)' }}
          >
            Bites & Moments
          </h1>
          <div className="w-10 h-px mx-auto" style={{ background: 'oklch(0.75 0.025 70)' }} />
        </div>

        {/* Polaroid Grid */}
        <div className="max-w-5xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
            {FOODIE_PHOTOS.map((photo, idx) => (
              <div
                key={photo.id}
                className="group cursor-pointer"
                style={{
                  transform: `rotate(${photo.rotation}deg)`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'rotate(0deg) scale(1.04)';
                  (e.currentTarget as HTMLDivElement).style.zIndex = '10';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = `rotate(${photo.rotation}deg) scale(1)`;
                  (e.currentTarget as HTMLDivElement).style.zIndex = '1';
                }}
                onClick={() => setLightboxIndex(idx)}
              >
                {/* Polaroid frame */}
                <div
                  className="relative"
                  style={{
                    background: '#fffef9',
                    padding: '10px 10px 36px 10px',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.07)',
                    borderRadius: '2px',
                  }}
                >
                  {/* Photo */}
                  <div className="overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                    <img
                      src={photo.src}
                      alt={`Foodie moment ${photo.id}`}
                      className="w-full h-full object-cover"
                      style={{ display: 'block' }}
                    />
                  </div>
                  {/* Caption area */}
                  <div
                    className="mt-2 text-center text-xs leading-tight"
                    style={{
                      fontFamily: "'Caveat', 'Playfair Display', cursive",
                      color: 'oklch(0.45 0.015 65)',
                      minHeight: '18px',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {photo.caption}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative note */}
          <p
            className="text-center mt-16 text-xs tracking-widest"
            style={{ fontFamily: 'var(--font-nav)', color: 'oklch(0.72 0.018 70)' }}
          >
            MORE COMING SOON
          </p>
        </div>
      </main>

      <Footer />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => i !== null ? (i - 1 + images.length) % images.length : 0)}
          onNext={() => setLightboxIndex(i => i !== null ? (i + 1) % images.length : 0)}
        />
      )}
    </div>
  );
}
