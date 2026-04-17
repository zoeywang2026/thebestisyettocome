/**
 * Home / Blog Listing Page
 * Design: Modern Lifestyle Magazine — "The best is yet to come"
 * Layout:
 *   1. Featured hero post (full-width)
 *   2. Popular From FASHION (2-col)
 *   3. Popular From FOOD (3-col overlay)
 *   4. Popular From FIT (2-col)
 *   5. Popular From BEAUTY + TRAVEL (side-by-side)
 *   6. Popular From DECOR (2-col)
 *   7. Popular From MOTHERHOOD (2-col + 1 overlay)
 *   8. Previous Posts (horizontal list)
 */
import { useState } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { POSTS, CATEGORY_COLORS } from '@/lib/data';

const POSTS_PER_PAGE = 8;

// Group posts by category
const byCategory = (cat: string, limit = 3) =>
  POSTS.filter(p => p.category === cat).slice(0, limit);

// Fallback: use any posts if category is empty
const withFallback = (posts: typeof POSTS, limit: number) =>
  posts.length >= limit ? posts : [...posts, ...POSTS.filter(p => !posts.includes(p))].slice(0, limit);

const FASHION_POSTS = withFallback(byCategory('FASHION'), 2);
const FOOD_POSTS = withFallback(byCategory('FOOD'), 3);
// FIT posts — use lifestyle as stand-in since no FIT category data yet
const FIT_POSTS = withFallback(byCategory('LIFESTYLE'), 2);
const BEAUTY_POSTS = withFallback(byCategory('BEAUTY', 1), 1);
const TRAVEL_POSTS = withFallback(byCategory('TRAVEL', 1), 1);
const DECOR_POSTS = withFallback(byCategory('DECOR'), 2);
const MOTHERHOOD_POSTS = withFallback(byCategory('MOTHERHOOD'), 3);

function SectionTitle({ category, italic }: { category: string; italic?: string }) {
  return (
    <h2 className="section-title mb-6">
      POPULAR FROM <em>{italic || category}</em>
    </h2>
  );
}

// Featured hero post
function HeroPost({ post }: { post: typeof POSTS[0] }) {
  const tagColor = CATEGORY_COLORS[post.category] || '#b0b0b0';
  return (
    <Link href={`/blog/${post.slug}`} className="block group relative overflow-hidden">
      <div className="aspect-[16/7] sm:aspect-[16/6] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
          style={{ objectPosition: 'center 30%' }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent flex flex-col justify-end p-6 sm:p-10">
        <span
          className="category-tag mb-3 inline-block"
          style={{ backgroundColor: tagColor, color: '#fff' }}
        >
          {post.category}
        </span>
        <h2
          className="text-white text-2xl sm:text-3xl lg:text-4xl leading-tight max-w-2xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
        >
          {post.title}
        </h2>
        <p
          className="text-white/70 text-xs mt-2"
          style={{ fontFamily: 'var(--font-nav)', letterSpacing: '0.08em' }}
        >
          By {post.author} · {post.date}
        </p>
      </div>
    </Link>
  );
}

export default function Home() {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const sortedPosts = [...POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const visiblePosts = sortedPosts.slice(0, visibleCount);

  // Latest post as hero
  const heroPost = sortedPosts[0];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'oklch(0.972 0.010 75)' }}>
      <Header />

      <main className="flex-1" style={{ paddingBottom: '280px' }}>

        {/* ── Hero Featured Post ── */}
        <section className="w-full">
          <HeroPost post={heroPost} />
        </section>

        {/* ── Popular from FASHION ── */}
        <section className="max-w-5xl mx-auto px-5 pt-12 pb-10">
          <SectionTitle category="FASHION" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FASHION_POSTS.map((post, i) => (
              <BlogCard key={post.id} post={post} variant="default" animDelay={i * 60} />
            ))}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5"><hr style={{ borderColor: 'oklch(0.88 0.008 70)' }} /></div>

        {/* ── Popular from FOOD ── */}
        <section className="max-w-5xl mx-auto px-5 py-10">
          <SectionTitle category="FOOD" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {FOOD_POSTS.map((post, i) => (
              <BlogCard key={post.id} post={post} variant="overlay" animDelay={i * 60} />
            ))}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5"><hr style={{ borderColor: 'oklch(0.88 0.008 70)' }} /></div>

        {/* ── Popular from FIT ── */}
        <section className="max-w-5xl mx-auto px-5 py-10">
          <SectionTitle category="FIT" italic="FIT" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FIT_POSTS.map((post, i) => (
              <BlogCard key={post.id} post={post} variant="default" animDelay={i * 60} />
            ))}
          </div>
          {/* FIT placeholder note */}
          <p
            className="text-xs text-gray-300 mt-4 text-center tracking-widest"
            style={{ fontFamily: 'var(--font-nav)' }}
          >
            MORE FIT CONTENT COMING SOON
          </p>
        </section>

        <div className="max-w-5xl mx-auto px-5"><hr style={{ borderColor: 'oklch(0.88 0.008 70)' }} /></div>

        {/* ── Popular from BEAUTY + TRAVEL (side by side) ── */}
        <section className="max-w-5xl mx-auto px-5 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* BEAUTY */}
            <div>
              <h2 className="section-title mb-6">POPULAR FROM <em>BEAUTY</em></h2>
              <BlogCard post={BEAUTY_POSTS[0]} variant="default" />
            </div>
            {/* TRAVEL */}
            <div>
              <h2 className="section-title mb-6">POPULAR FROM <em>TRAVEL</em></h2>
              <BlogCard post={TRAVEL_POSTS[0]} variant="default" />
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5"><hr style={{ borderColor: 'oklch(0.88 0.008 70)' }} /></div>

        {/* ── Popular from DECOR ── */}
        <section className="max-w-5xl mx-auto px-5 py-10">
          <SectionTitle category="DECOR" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DECOR_POSTS.map((post, i) => (
              <BlogCard key={post.id} post={post} variant="default" animDelay={i * 60} />
            ))}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5"><hr style={{ borderColor: 'oklch(0.88 0.008 70)' }} /></div>

        {/* ── Popular from MOTHERHOOD ── */}
        <section className="max-w-5xl mx-auto px-5 py-10">
          <SectionTitle category="MOTHERHOOD" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
            {MOTHERHOOD_POSTS.slice(0, 2).map((post, i) => (
              <BlogCard key={post.id} post={post} variant="default" animDelay={i * 60} />
            ))}
          </div>
          {MOTHERHOOD_POSTS.length > 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {MOTHERHOOD_POSTS.slice(2).map((post, i) => (
                <BlogCard key={post.id} post={post} variant="overlay" animDelay={(i + 2) * 60} />
              ))}
            </div>
          )}
        </section>

        <div className="max-w-5xl mx-auto px-5"><hr style={{ borderColor: 'oklch(0.88 0.008 70)' }} /></div>

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
                  <hr style={{ borderColor: 'oklch(0.88 0.008 70)', marginTop: '2rem' }} />
                )}
              </div>
            ))}
          </div>

          {visibleCount < sortedPosts.length && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount(c => c + POSTS_PER_PAGE)}
                className="text-xs tracking-widest font-semibold px-8 py-3 transition-colors"
                style={{
                  fontFamily: 'var(--font-nav)',
                  border: '1px solid oklch(0.82 0.012 70)',
                  color: 'oklch(0.30 0.010 60)',
                  background: 'transparent',
                  letterSpacing: '0.18em',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = '#4a8fc0';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#4a8fc0';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = 'oklch(0.30 0.010 60)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'oklch(0.82 0.012 70)';
                }}
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
