import dynamic from 'next/dynamic'
import PetalRain from '@/components/PetalRain'
import Counter from '@/components/Counter'
import Gallery from '@/components/Gallery'
import Notes from '@/components/Notes'
import MusicPlayer from '@/components/MusicPlayer'

export default function Home() {
  return (
    <main style={{ position: 'relative', overflowX: 'hidden' }}>
      <PetalRain />

      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '10%', left: '5%',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233,30,99,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '5%',
          width: '250px', height: '250px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(156,39,176,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="float" style={{ fontSize: '70px', marginBottom: '20px', lineHeight: 1 }}>
          💍
        </div>

        <p style={{
          fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
          color: '#c2185b',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          marginBottom: '20px',
          fontWeight: 500,
        }}>
          ✨ 1. Yıl Dönümümüz ✨
        </p>

        <h1 style={{
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: '20px',
        }}>
          <span className="gold-shimmer">Sefa</span>
          <span style={{
            display: 'block',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            color: '#e91e63',
            margin: '8px 0',
          }}>
            &amp;
          </span>
          <span className="gold-shimmer">Sevim</span>
        </h1>

        <div style={{
          width: '120px', height: '3px',
          background: 'linear-gradient(90deg, transparent, #e91e63, #9c27b0, transparent)',
          margin: '20px auto',
          borderRadius: '2px',
        }} />

        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          color: '#9c27b0',
          marginBottom: '8px',
        }}>
          28 Haziran 2025
        </p>
        <p style={{
          fontSize: 'clamp(0.85rem, 2vw, 1rem)',
          color: '#c2185b',
          opacity: 0.8,
        }}>
          Aşkımızın ilk yılı... 🌸
        </p>

        <div style={{ marginTop: '50px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['💕 Anılarımız', '⏱️ Sayaç', '🎵 Müzik', '💌 Notlar'].map((item, i) => (
            <a
              key={i}
              href={`#${['gallery', 'counter', 'music', 'notes'][i]}`}
              style={{
                padding: '10px 24px',
                borderRadius: '50px',
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(156,39,176,0.3)',
                color: '#9c27b0',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s',
              }}
            >
              {item}
            </a>
          ))}
        </div>

        <div style={{ marginTop: '60px', animation: 'float 2s ease-in-out infinite' }}>
          <span style={{ fontSize: '24px', color: '#ce93d8' }}>↓</span>
        </div>
      </section>

      {/* GALLERY */}
      <div id="gallery">
        <Gallery />
      </div>

      {/* COUNTER */}
      <div id="counter">
        <Counter />
      </div>

      {/* MUSIC */}
      <div id="music">
        <MusicPlayer />
      </div>

      {/* NOTES */}
      <div id="notes">
        <Notes />
      </div>

      {/* FOOTER */}
      <footer style={{
        textAlign: 'center',
        padding: '40px 20px',
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid rgba(156,39,176,0.2)',
      }}>
        <div className="heartbeat" style={{ fontSize: '32px', marginBottom: '12px' }}>💕</div>
        <p style={{ color: '#9c27b0', fontSize: '1rem', fontWeight: 600 }}>
          Sefa & Sevim — 28 Haziran 2025
        </p>
        <p style={{ color: '#c2185b', fontSize: '0.85rem', marginTop: '8px', opacity: 0.7 }}>
          Sonsuzluğa adım attığımız gün 🌸
        </p>
      </footer>
    </main>
  )
}
