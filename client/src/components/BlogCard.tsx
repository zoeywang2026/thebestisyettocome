/**
 * BlogCard Component
 * Design: Modern Lifestyle Magazine
 * - Image with hover zoom effect
 * - Category tag with color coding
 * - Playfair Display title
 * - Author + date in Montserrat
 */
import { Link } from 'wouter';
import { Post, CATEGORY_COLORS } from '@/lib/data';

interface BlogCardProps {
  post: Post;
  variant?: 'default' | 'overlay' | 'horizontal';
  className?: string;
  animDelay?: number;
}

export default function BlogCard({ post, variant = 'default', className = '', animDelay = 0 }: BlogCardProps) {
  const tagColor = CATEGORY_COLORS[post.category] || '#b0b0b0';

  if (variant === 'overlay') {
    // Image with title overlaid at bottom
    return (
      <Link href={`/blog/${post.slug}`} className={`block group ${className}`}>
        <div
          className="relative overflow-hidden fade-in-up"
          style={{ animationDelay: `${animDelay}ms` }}
        >
          <div className="blog-card-img aspect-[4/3]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-4">
            <h3
              className="text-white text-base leading-snug"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              {post.title}
            </h3>
            <p
              className="text-white/70 text-xs mt-1"
              style={{ fontFamily: 'var(--font-nav)', letterSpacing: '0.05em' }}
            >
              By {post.author} · {post.date}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    // Left image, right text — used in Previous Posts
    return (
      <Link href={`/blog/${post.slug}`} className={`flex gap-4 group ${className}`}>
        <div
          className="blog-card-img flex-shrink-0 w-36 sm:w-44"
          style={{ animationDelay: `${animDelay}ms` }}
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center py-1">
          <span
            className="category-tag mb-2 inline-block"
            style={{ backgroundColor: tagColor, color: '#fff' }}
          >
            {post.category}
          </span>
          <h3
            className="post-title-link text-sm sm:text-base leading-snug mb-2"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
          >
            {post.title}
          </h3>
          <p
            className="text-xs"
            style={{ fontFamily: 'var(--font-nav)', letterSpacing: '0.08em', color: 'oklch(0.52 0.012 65)' }}
          >
            By {post.author} · {post.dateShort}
          </p>
        </div>
      </Link>
    );
  }

  // Default: image top, text below
  return (
    <Link href={`/blog/${post.slug}`} className={`block group ${className}`}>
      <div
        className="fade-in-up"
        style={{ animationDelay: `${animDelay}ms` }}
      >
        <div className="blog-card-img overflow-hidden">
          <div className="aspect-[4/3]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="mt-3">
          <h3
            className="post-title-link text-base leading-snug mb-1.5"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
          >
            {post.title}
          </h3>
          <p
            className="text-xs"
            style={{ fontFamily: 'var(--font-nav)', letterSpacing: '0.08em', color: 'oklch(0.52 0.012 65)' }}
          >
            By {post.author} · {post.date}
          </p>
        </div>
      </div>
    </Link>
  );
}
