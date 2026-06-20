import Gallery from '@/components/Gallery'
import Counter from '@/components/Counter'
import MusicPlayer from '@/components/MusicPlayer'
import Notes from '@/components/Notes'
import { SprigLeft, SprigRight, RingMark } from '@/components/Ornament'

export default function Home() {
  return (
    <main>
      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(250,246,240,0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--line)',
        padding: '18px 24px',
      }}>
        <div style={{
          maxWidth: '1140px', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '16px',
        }}>
          <span className="serif-display" style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--wine)' }}>
            S &amp; S
          </span>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <a href="#galeri" className="nav-pill">Galeri</a>
            <a href="#sayac" className="nav-pill">Sayaç</a>
            <a href="#muzik" className="nav-pill">Müzik</a>
            <a href="#notlar" className="nav-pill">Notlar</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '92vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '60px 24px',
      }}>
        <p className="eyebrow fade-up" style={{ marginBottom: '28px' }}>
          Birinci Yıl Dönümü
        </p>

        <div className="fade-up" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '8px' }}>
          <SprigLeft size={64} />
          <RingMark size={36} />
          <SprigRight size={64} />
        </div>

        <h1 className="serif-display fade-up" style={{
          fontSize: 'clamp(3.2rem, 11vw, 7.5rem)',
          fontWeight: 500,
          lineHeight: 1.05,
          color: 'var(--wine)',
          marginTop: '12px',
        }}>
          Sefa
        </h1>
        <p className="serif-display fade-up" style={{
          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          fontStyle: 'italic',
          color: 'var(--gold)',
          margin: '4px 0',
        }}>
          &amp;
        </p>
        <h1 className="serif-display fade-up" style={{
          fontSize: 'clamp(3.2rem, 11vw, 7.5rem)',
          fontWeight: 500,
          lineHeight: 1.05,
          color: 'var(--wine)',
        }}>
          Sevim
        </h1>

        <div className="hairline fade-up" style={{ width: '64px', margin: '36px auto 24px' }} />

        <p className="serif-display fade-up" style={{
          fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
          fontStyle: 'italic',
          color: 'var(--wine-soft)',
        }}>
          28 Haziran 2025
        </p>
      </section>

      <div id="galeri"><Gallery /></div>

      <hr className="hairline" style={{ maxWidth: '1140px', margin: '0 auto' }} />

      <div id="sayac"><Counter /></div>

      <hr className="hairline" style={{ maxWidth: '1140px', margin: '0 auto' }} />

      <div id="muzik"><MusicPlayer /></div>

      <hr className="hairline" style={{ maxWidth: '1140px', margin: '0 auto' }} />

      <div id="notlar"><Notes /></div>

      {/* FOOTER */}
      <footer style={{
        textAlign: 'center', padding: '70px 24px 50px',
        borderTop: '1px solid var(--line)',
      }}>
        <div className="ornament-divider" style={{ marginBottom: '20px' }}>
          <RingMark size={28} />
        </div>
        <p className="serif-display" style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--wine)' }}>
          Sefa &amp; Sevim
        </p>
        <p className="eyebrow" style={{ marginTop: '10px', fontSize: '0.6rem' }}>
          28 Haziran 2025
        </p>
      </footer>
    </main>
  )
}
