/**
 * Header Component
 * Design: Modern Lifestyle Magazine
 * - Centered logo (Playfair Display Italic)
 * - Hamburger menu left, search icon right
 * - Thin horizontal nav bar below logo
 * - Slide-in sidebar drawer for full category navigation
 */
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, X, Menu } from 'lucide-react';
import { NAV_CATEGORIES } from '@/lib/data';

const SUB_CATEGORIES: Record<string, string[]> = {
  FASHION: ['FALL', 'SPRING', 'SUMMER', 'WINTER'],
  FOOD: ['BIGGER BITES', 'BREAKFAST & BRUNCH', 'DRINKS', 'SNACKS & APPS', 'SWEETS'],
  BEAUTY: ['SKIN', 'NAILS'],
  DECOR: ['ENTERTAINING', 'ORGANIZATION', 'ROOMS & DETAILS'],
  DIY: ['AT HOME', 'PAPER GOODS', 'STYLE'],
  SERIES: ['FIVE THINGS', 'LINKS I LOVE', 'PERSONAL POSTS', 'PLACES', 'ROUND-UPS', 'WEEKDAY WARDROBE'],
};

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [, navigate] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ fontFamily: 'var(--font-nav)' }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <Link href="/" onClick={() => setDrawerOpen(false)}>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.1rem' }}>
              cupcakes and cashmere
            </span>
          </Link>
          <button onClick={() => setDrawerOpen(false)} className="p-1">
            <X size={18} />
          </button>
        </div>

        <nav className="px-6 py-4">
          {NAV_CATEGORIES.map(cat => (
            <div key={cat} className="mb-4">
              <Link
                href={`/category/${cat.toLowerCase()}`}
                onClick={() => setDrawerOpen(false)}
                className="block text-xs font-semibold tracking-widest text-gray-900 hover:text-gray-500 transition-colors mb-2"
              >
                {cat}
              </Link>
              {SUB_CATEGORIES[cat] && (
                <div className="pl-3 space-y-1">
                  {SUB_CATEGORIES[cat].map(sub => (
                    <Link
                      key={sub}
                      href={`/category/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setDrawerOpen(false)}
                      className="block text-xs tracking-wider text-gray-500 hover:text-gray-900 transition-colors py-0.5"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
            {['ARCHIVES', 'PRIVACY', 'SEARCH'].map(item => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                onClick={() => setDrawerOpen(false)}
                className="block text-xs font-semibold tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
        {/* Top bar: menu | logo | search */}
        <div className="relative flex items-center justify-between px-5 py-3">
          {/* Left: hamburger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-1 text-gray-800 hover:text-gray-500 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.4rem, 4vw, 2.1rem)',
                fontWeight: 400,
                letterSpacing: '0.01em',
                color: '#1a1a1a',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              cupcakes and cashmere
            </h1>
          </Link>

          {/* Right: search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-1 text-gray-800 hover:text-gray-500 transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-gray-100 px-5 py-2">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Search size={14} className="text-gray-400 flex-shrink-0" />
              <input
                type="search"
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400"
                style={{ fontFamily: 'var(--font-nav)' }}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={14} />
              </button>
            </form>
          </div>
        )}

        {/* Navigation bar */}
        <nav className="border-t border-gray-100 overflow-x-auto scrollbar-none">
          <div className="flex items-center justify-center gap-6 px-5 py-2.5 min-w-max mx-auto">
            {NAV_CATEGORIES.map(cat => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                className="nav-link"
              >
                {cat}
              </Link>
            ))}
            <Link href="/gallery" className="nav-link">
              GALLERY
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
