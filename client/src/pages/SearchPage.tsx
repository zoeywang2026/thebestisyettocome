/**
 * Search Page
 * Design: Modern Lifestyle Magazine
 */
import { useSearch } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { POSTS } from '@/lib/data';

export default function SearchPage() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const query = params.get('q') || '';

  const results = query
    ? POSTS.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-5 py-10 w-full">
        <div className="mb-8">
          <h1
            className="text-2xl sm:text-3xl mb-2"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400 }}
          >
            {query ? `Results for "${query}"` : 'Search'}
          </h1>
          <p
            className="text-xs text-gray-400 tracking-widest"
            style={{ fontFamily: 'var(--font-nav)' }}
          >
            {results.length} POST{results.length !== 1 ? 'S' : ''} FOUND
          </p>
        </div>

        {results.length === 0 && query && (
          <div className="text-center py-20">
            <p
              className="text-sm text-gray-400 tracking-widest"
              style={{ fontFamily: 'var(--font-nav)' }}
            >
              NO RESULTS FOUND. TRY A DIFFERENT SEARCH TERM.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((post, i) => (
            <BlogCard key={post.id} post={post} variant="default" animDelay={i * 50} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
