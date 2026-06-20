'use client'
import { useState } from 'react'

const SPOTIFY_PLAYLIST_ID = '50EwlUiCbRDvHwUEigd7Me'

export default function MusicPlayer() {
  const [showPlayer, setShowPlayer] = useState(false)

  return (
    <section style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: '620px', margin: '0 auto', textAlign: 'center' }}>
        <p className="eyebrow" style={{ marginBottom: '18px' }}>Çalma Listesi</p>
        <h2 className="serif-display" style={{
          fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
          fontWeight: 500,
          fontStyle: 'italic',
          color: 'var(--wine)',
          marginBottom: '40px',
        }}>
          Bize Eşlik Eden Şarkılar
        </h2>

        {!showPlayer ? (
          <button className="btn-outline" onClick={() => setShowPlayer(true)}>
            Müziği Aç
          </button>
        ) : (
          <div style={{ marginTop: '10px', border: '1px solid var(--line)' }}>
            <iframe
              src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  )
}
