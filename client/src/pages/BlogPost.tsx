/**
 * Blog Post Detail Page
 * Design: Modern Lifestyle Magazine
 * - Full-width hero image
 * - Category tag + title + author/date
 * - Article body in Lora
 * - Photo gallery grid with Lightbox
 * - Related posts section
 */
import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Lightbox from '@/components/Lightbox';
import { POSTS, CATEGORY_COLORS } from '@/lib/data';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = POSTS.find(p => p.slug === slug);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <p
              className="text-sm text-gray-400 tracking-widest mb-4"
              style={{ fontFamily: 'var(--font-nav)' }}
            >
              OOPS! THAT PAGE CAN'T BE FOUND.
            </p>
            <Link
              href="/"
              className="text-xs tracking-widest border border-gray-300 px-6 py-2 hover:bg-gray-50 transition-colors"
              style={{ fontFamily: 'var(--font-nav)' }}
            >
              RETURN HOME
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const tagColor = CATEGORY_COLORS[post.category] || '#b0b0b0';
  const galleryImages = post.gallery || [post.image];
  const relatedPosts = POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Parse content into paragraphs
  const paragraphs = post.content.split('\n\n').filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero image */}
        <div className="w-full max-h-[70vh] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full object-cover max-h-[70vh]"
            style={{ objectPosition: 'center top' }}
          />
        </div>

        {/* Article header */}
        <div className="max-w-2xl mx-auto px-5 pt-10 pb-6 text-center">
          <span
            className="category-tag mb-4 inline-block"
            style={{ backgroundColor: tagColor, color: '#fff' }}
          >
            {post.category}
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
          >
            {post.title}
          </h1>
          <p
            className="text-xs text-gray-400 tracking-wider"
            style={{ fontFamily: 'var(--font-nav)' }}
          >
            By {post.author} · {post.date}
          </p>
        </div>

        {/* Article body */}
        <article className="max-w-2xl mx-auto px-5 pb-12">
          <div className="prose prose-sm sm:prose max-w-none" style={{ fontFamily: 'var(--font-body)' }}>
            {paragraphs.map((para, i) => {
              if (para.startsWith('**') && para.endsWith('**')) {
                return (
                  <h3
                    key={i}
                    className="text-base font-semibold mt-6 mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {para.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              if (para.startsWith('- ')) {
                const items = para.split('\n').filter(l => l.startsWith('- '));
                return (
                  <ul key={i} className="list-disc pl-5 space-y-1 my-3 text-gray-700 text-sm leading-relaxed">
                    {items.map((item, j) => (
                      <li key={j}>{item.replace(/^- /, '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                  {para}
                </p>
              );
            })}
          </div>
        </article>

        {/* Photo Gallery */}
        {galleryImages.length > 1 && (
          <section className="max-w-5xl mx-auto px-5 pb-12">
            <div className="border-t border-gray-100 pt-8 mb-6">
              <h2
                className="section-title mb-6"
              >
                PHOTO <em>GALLERY</em>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="cursor-pointer overflow-hidden group fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                  onClick={() => openLightbox(i)}
                >
                  <div className="aspect-square">
                    <img
                      src={img}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-5xl mx-auto px-5 pb-12">
            <div className="border-t border-gray-100 pt-8 mb-6">
              <h2 className="section-title">
                YOU MIGHT ALSO <em>LIKE</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((p, i) => (
                <BlogCard key={p.id} post={p} variant="default" animDelay={i * 60} />
              ))}
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="max-w-5xl mx-auto px-5 pb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
            style={{ fontFamily: 'var(--font-nav)' }}
          >
            <ArrowLeft size={14} />
            BACK TO BLOG
          </Link>
        </div>
      </main>

      <Footer />

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex(i => (i - 1 + galleryImages.length) % galleryImages.length)}
          onNext={() => setLightboxIndex(i => (i + 1) % galleryImages.length)}
        />
      )}
    </div>
  );
}
