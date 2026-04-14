/**
 * Home / Blog Listing Page
 * Design: Modern Lifestyle Magazine — cupcakesandcashmere.com clone
 * Layout:
 *   1. Popular From LIFESTYLE (2-col grid)
 *   2. Popular From FOOD (3-col overlay grid)
 *   3. Popular From DECOR (2-col grid)
 *   4. Popular From MOTHERHOOD (2-col + 3-col)
 *   5. Previous Posts (horizontal list)
 */
import { useState } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { POSTS, POPULAR_BY_CATEGORY } from '@/lib/data';

const POSTS_PER_PAGE = 8;

function SectionTitle({ category }: { category: string }) {
  return (
    <h2 className="section-title mb-6">
      POPULAR FROM <em>{category}</em>
    </h2>
  );
}

export default function Home() {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const sortedPosts = [...POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const visiblePosts = sortedPosts.slice(0, visibleCount);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* ── Popular from LIFESTYLE ── */}
        <section className="max-w-5xl mx-auto px-5 pt-12 pb-10">
          <SectionTitle category="LIFESTYLE" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {POPULAR_BY_CATEGORY.LIFESTYLE.map((post, i) => (
              <BlogCard key={post.id} post={post} variant="default" animDelay={i * 60} />
            ))}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5">
          <hr className="border-gray-100" />
        </div>

        {/* ── Popular from FOOD ── */}
        <section className="max-w-5xl mx-auto px-5 py-10">
          <SectionTitle category="FOOD" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {POPULAR_BY_CATEGORY.FOOD.map((post, i) => (
              <BlogCard key={post.id} post={post} variant="overlay" animDelay={i * 60} />
            ))}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5">
          <hr className="border-gray-100" />
        </div>

        {/* ── Popular from DECOR ── */}
        <section className="max-w-5xl mx-auto px-5 py-10">
          <SectionTitle category="DECOR" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {POPULAR_BY_CATEGORY.DECOR.map((post, i) => (
              <BlogCard key={post.id} post={post} variant="default" animDelay={i * 60} />
            ))}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5">
          <hr className="border-gray-100" />
        </div>

        {/* ── Popular from MOTHERHOOD ── */}
        <section className="max-w-5xl mx-auto px-5 py-10">
          <SectionTitle category="MOTHERHOOD" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
            {POPULAR_BY_CATEGORY.MOTHERHOOD.slice(0, 2).map((post, i) => (
              <BlogCard key={post.id} post={post} variant="default" animDelay={i * 60} />
            ))}
          </div>
          {POPULAR_BY_CATEGORY.MOTHERHOOD.length > 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {POPULAR_BY_CATEGORY.MOTHERHOOD.slice(2).map((post, i) => (
                <BlogCard key={post.id} post={post} variant="overlay" animDelay={(i + 2) * 60} />
              ))}
            </div>
          )}
        </section>

        <div className="max-w-5xl mx-auto px-5">
          <hr className="border-gray-100" />
        </div>

        {/* ── Previous Posts ── */}
        <section className="max-w-5xl mx-auto px-5 py-10">
          <h2 className="section-title mb-8">
            PREVIOUS <em>POSTS</em>
          </h2>
          <div className="space-y-8">
            {visiblePosts.map((post, i) => (
              <div key={post.id}>
                <BlogCard
                  post={post}
                  variant="horizontal"
                  animDelay={i * 40}
                />
                {i < visiblePosts.length - 1 && (
                  <hr className="border-gray-100 mt-8" />
                )}
              </div>
            ))}
          </div>

          {visibleCount < sortedPosts.length && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount(c => c + POSTS_PER_PAGE)}
                className="text-xs tracking-widest font-semibold border border-gray-300 px-8 py-3 hover:bg-gray-50 transition-colors"
                style={{ fontFamily: 'var(--font-nav)' }}
              >
                SEE MORE
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
