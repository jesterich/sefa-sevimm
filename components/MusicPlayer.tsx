'use client'
import { useState } from 'react'

// Spotify playlist embed - kullanıcı kendi playlist linkini ekleyecek
const SPOTIFY_PLAYLIST_ID = 'PLAYLIST_ID_BURAYA' // Değiştirilecek

export default function MusicPlayer() {
  const [showPlayer, setShowPlayer] = useState(false)

  return (
    <section style={{ padding: '60px 20px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎵</div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: '#9c27b0', fontWeight: 700, marginBottom: '8px' }}>
            Aşkımızın Melodisi
          </h2>
          <div className="section-divider" />
          <p style={{ color: '#c2185b', marginBottom: '24px' }}>Bizi anlatan şarkılar</p>

          {!showPlayer ? (
            <button
              className="romantic-btn"
              onClick={() => setShowPlayer(true)}
            >
              🎶 Müziği Aç
            </button>
          ) : (
            <div style={{ marginTop: '20px', borderRadius: '16px', overflow: 'hidden' }}>
              <iframe
                src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ borderRadius: '16px' }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
