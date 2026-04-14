/**
 * Gallery Page
 * Design: Modern Lifestyle Magazine
 * - Masonry-style grid of all post images
 * - Click to open Lightbox
 * - Category filter tabs
 */
import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Lightbox from '@/components/Lightbox';
import { POSTS, CATEGORY_COLORS, Category } from '@/lib/data';

const ALL_CATEGORIES: (Category | 'ALL')[] = [
  'ALL', 'LIFESTYLE', 'FASHION', 'FOOD', 'DECOR', 'MOTHERHOOD', 'BEAUTY', 'TRAVEL',
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category | 'ALL'>('ALL');
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Collect all gallery images
  const allImages = useMemo(() => {
    const filtered = activeCategory === 'ALL'
      ? POSTS
      : POSTS.filter(p => p.category === activeCategory);

    return filtered.flatMap(post =>
      (post.gallery || [post.image]).map(img => ({
        src: img,
        title: post.title,
        category: post.category,
        slug: post.slug,
      }))
    );
  }, [activeCategory]);

  const openLightbox = (index: number) => {
    setLightboxImages(allImages.map(i => i.src));
    setLightboxIndex(index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-5 py-10 w-full">
        {/* Page title */}
        <div className="mb-8 text-center">
          <h1
            className="text-3xl sm:text-4xl mb-2"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400 }}
          >
            Photo Gallery
          </h1>
          <p
            className="text-xs text-gray-400 tracking-widest"
            style={{ fontFamily: 'var(--font-nav)' }}
          >
            A VISUAL JOURNEY THROUGH LIFE'S BEAUTIFUL MOMENTS
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {ALL_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            const color = cat === 'ALL' ? '#1a1a1a' : CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="category-tag transition-all"
                style={{
                  backgroundColor: isActive ? color : 'transparent',
                  color: isActive ? '#fff' : '#666',
                  border: `1px solid ${isActive ? color : '#ddd'}`,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {allImages.map((item, i) => (
            <div
              key={`${item.slug}-${i}`}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden fade-in-up"
              style={{ animationDelay: `${(i % 12) * 40}ms` }}
              onClick={() => openLightbox(i)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-3 opacity-0 group-hover:opacity-100">
                <div>
                  <span
                    className="category-tag mb-1 inline-block"
                    style={{ backgroundColor: CATEGORY_COLORS[item.category], color: '#fff' }}
                  >
                    {item.category}
                  </span>
                  <p
                    className="text-white text-xs leading-tight"
                    style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                  >
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {allImages.length === 0 && (
          <div className="text-center py-20 text-gray-400" style={{ fontFamily: 'var(--font-nav)' }}>
            <p className="text-sm tracking-widest">NO IMAGES FOUND</p>
          </div>
        )}
      </main>

      <Footer />

      {/* Lightbox */}
      {lightboxImages.length > 0 && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxImages([])}
          onPrev={() => setLightboxIndex(i => (i - 1 + lightboxImages.length) % lightboxImages.length)}
          onNext={() => setLightboxIndex(i => (i + 1) % lightboxImages.length)}
        />
      )}
    </div>
  );
}
