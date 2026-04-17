/**
 * Footer Component
 * Design: Modern Lifestyle Magazine
 * - Minimal, clean footer with copyright and links
 */
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid oklch(0.88 0.008 70)', marginTop: '4rem' }}>
      <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-xs tracking-wider"
          style={{ fontFamily: 'var(--font-nav)', color: 'oklch(0.52 0.012 65)', letterSpacing: '0.14em' }}
        >
          © {new Date().getFullYear()} CUPCAKES AND CASHMERE.
        </p>
        <div className="flex items-center gap-6">
          {['ARCHIVES', 'PRIVACY', 'SEARCH'].map(item => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-xs tracking-wider transition-colors"
              style={{ fontFamily: 'var(--font-nav)', color: 'oklch(0.52 0.012 65)', letterSpacing: '0.14em' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#4a8fc0')}
              onMouseLeave={e => (e.currentTarget.style.color = 'oklch(0.52 0.012 65)')}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
