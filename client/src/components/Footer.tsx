/**
 * Footer Component
 * Design: Modern Lifestyle Magazine
 * - Minimal, clean footer with copyright and links
 */
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16">
      <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-xs text-gray-400 tracking-wider"
          style={{ fontFamily: 'var(--font-nav)' }}
        >
          © {new Date().getFullYear()} CUPCAKES AND CASHMERE.
        </p>
        <div className="flex items-center gap-6">
          {['ARCHIVES', 'PRIVACY', 'SEARCH'].map(item => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-xs text-gray-400 hover:text-gray-700 tracking-wider transition-colors"
              style={{ fontFamily: 'var(--font-nav)' }}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
