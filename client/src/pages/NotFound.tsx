/**
 * 404 Not Found Page
 * Design: Modern Lifestyle Magazine
 */
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center py-20 px-5">
          <p
            className="text-xs text-gray-400 tracking-widest mb-4"
            style={{ fontFamily: 'var(--font-nav)' }}
          >
            404
          </p>
          <h1
            className="text-3xl sm:text-4xl mb-4"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400 }}
          >
            Oops! That page can't be found.
          </h1>
          <p
            className="text-sm text-gray-500 mb-8"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            It looks like nothing was found at this location.
          </p>
          <Link
            href="/"
            className="text-xs tracking-widest border border-gray-300 px-8 py-3 hover:bg-gray-50 transition-colors"
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
