'use client'

const YOUTUBE_PLAYLIST_ID = 'PLmYbSfMbdTWIIH7nKGWPgbukP7wg0NQHt'

export default function MusicPlayer({ active }: { active: boolean }) {
  return (
    <section style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
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

        {active && (
          <div style={{
            border: '1px solid var(--line)',
            aspectRatio: '16/9',
            overflow: 'hidden',
          }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/videoseries?list=${YOUTUBE_PLAYLIST_ID}&autoplay=1`}
              title="Çalma Listesi"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  )
}