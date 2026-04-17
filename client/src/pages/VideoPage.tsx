/**
 * Video Page
 * Design: Modern Lifestyle Magazine — warm cream palette, Playfair Display headings
 */
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const VIDEOS = [
  {
    id: 'aroma-candles',
    src: '/manus-storage/aroma-candles_777bf9c2.mp4',
    caption: 'A big fan of aroma candles🥰',
    date: 'April 2026',
  },
];

export default function VideoPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'oklch(0.972 0.010 75)', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, maxWidth: '900px', margin: '0 auto', padding: '48px 24px 80px', width: '100%' }}>
        {/* Page title */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{
            fontFamily: 'var(--font-nav, Montserrat, sans-serif)',
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            color: 'oklch(0.55 0.010 65)',
            textTransform: 'uppercase',
            marginBottom: '10px',
          }}>
            WATCH
          </p>
          <h1 style={{
            fontFamily: 'var(--font-heading, "Playfair Display", serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 400,
            color: 'oklch(0.22 0.008 55)',
            margin: 0,
          }}>
            Video
          </h1>
          <div style={{
            width: '40px', height: '1px',
            background: 'oklch(0.75 0.015 65)',
            margin: '16px auto 0',
          }} />
        </div>

        {/* Video grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
          {VIDEOS.map(video => (
            <article key={video.id} style={{
              background: 'white',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 2px 20px rgba(160,140,120,0.10)',
            }}>
              {/* Video player */}
              <div style={{ position: 'relative', width: '100%', background: '#000' }}>
                <video
                  src={video.src}
                  controls
                  playsInline
                  style={{
                    width: '100%',
                    maxHeight: '560px',
                    display: 'block',
                    objectFit: 'contain',
                  }}
                />
              </div>

              {/* Caption */}
              <div style={{ padding: '20px 28px 24px' }}>
                <p style={{
                  fontFamily: 'var(--font-heading, "Playfair Display", serif)',
                  fontStyle: 'italic',
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  color: 'oklch(0.22 0.008 55)',
                  margin: '0 0 8px',
                  lineHeight: 1.5,
                }}>
                  {video.caption}
                </p>
                <p style={{
                  fontFamily: 'var(--font-nav, Montserrat, sans-serif)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'oklch(0.60 0.010 65)',
                  margin: 0,
                }}>
                  {video.date}
                </p>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
