/**
 * Category Page
 * Design: Modern Lifestyle Magazine
 * - Shows all posts filtered by category
 * - Grid layout with pagination
 */
import { useParams } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { POSTS, CATEGORY_COLORS } from '@/lib/data';
import { useState } from 'react';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [visibleCount, setVisibleCount] = useState(9);

  const normalizedCategory = category?.toUpperCase().replace(/-/g, ' ') || '';
  const filteredPosts = POSTS.filter(
    p => p.category === normalizedCategory || p.subcategory?.toLowerCase().replace(/\s+/g, '-') === category
  );
  const tagColor = CATEGORY_COLORS[normalizedCategory] || '#b0b0b0';
  const visiblePosts = filteredPosts.slice(0, visibleCount);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-5 py-10 w-full">
        {/* Category header */}
        <div className="text-center mb-10 pb-6 border-b border-gray-100">
          <span
            className="category-tag mb-3 inline-block"
            style={{ backgroundColor: tagColor, color: '#fff' }}
          >
            {normalizedCategory}
          </span>
          <h1
            className="text-3xl sm:text-4xl"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400 }}
          >
            {normalizedCategory.charAt(0) + normalizedCategory.slice(1).toLowerCase()}
          </h1>
          <p
            className="text-xs text-gray-400 mt-2 tracking-widest"
            style={{ fontFamily: 'var(--font-nav)' }}
          >
            {filteredPosts.length} POSTS
          </p>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p
              className="text-sm text-gray-400 tracking-widest"
              style={{ fontFamily: 'var(--font-nav)' }}
            >
              NO POSTS FOUND IN THIS CATEGORY YET.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePosts.map((post, i) => (
                <BlogCard key={post.id} post={post} variant="default" animDelay={i * 50} />
              ))}
            </div>

            {visibleCount < filteredPosts.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount(c => c + 9)}
                  className="text-xs tracking-widest font-semibold border border-gray-300 px-8 py-3 hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: 'var(--font-nav)' }}
                >
                  LOAD MORE
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
