'use client'
import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

interface Photo {
  name: string
  url: string
}

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPhotos = async () => {
      const { data, error } = await supabase.storage
        .from('anniversary-photos')
        .list('', { limit: 200, sortBy: { column: 'name', order: 'asc' } })

      if (error || !data) { setLoading(false); return }

      const urls = data
        .filter(f => f.name.match(/\.(jpg|jpeg|png|webp|gif)$/i))
        .map(f => ({
          name: f.name,
          url: supabase.storage.from('anniversary-photos').getPublicUrl(f.name).data.publicUrl,
        }))

      setPhotos(urls)
      setLoading(false)
    }
    loadPhotos()
  }, [])

  const prev = useCallback(() => {
    if (selected === null) return
    setSelected(selected === 0 ? photos.length - 1 : selected - 1)
  }, [selected, photos.length])

  const next = useCallback(() => {
    if (selected === null) return
    setSelected(selected === photos.length - 1 ? 0 : selected + 1)
  }, [selected, photos.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (selected === null) return
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selected, prev, next])

  return (
    <section style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="eyebrow" style={{ marginBottom: '18px' }}>Galeri</p>
          <h2 className="serif-display" style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 500,
            fontStyle: 'italic',
            color: 'var(--wine)',
          }}>
            Anılarımız
          </h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--gold)' }}>
            <p className="eyebrow">Yükleniyor</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="card-frame" style={{ padding: '70px 30px', textAlign: 'center', color: 'var(--wine-soft)' }}>
            <p className="serif-display" style={{ fontSize: '1.3rem', fontStyle: 'italic', marginBottom: '10px' }}>
              Henüz fotoğraf yok
            </p>
            <p style={{ fontSize: '0.85rem', opacity: 0.65 }}>Fotoğraflar yüklendiğinde burada görünecek</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: '4px',
          }}>
            {photos.map((photo, i) => (
              <div
                key={photo.name}
                onClick={() => setSelected(i)}
                style={{
                  aspectRatio: '4/5',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  filter: 'grayscale(15%)',
                  transition: 'filter 0.4s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'grayscale(0%)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'grayscale(15%)' }}
              >
                <Image
                  src={photo.url}
                  alt={`Anı ${i + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 50vw, 210px"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selected !== null && photos[selected] && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(20, 12, 12, 0.94)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            style={{
              position: 'fixed', left: '24px', top: '50%', transform: 'translateY(-50%)',
              background: 'transparent', border: '1px solid rgba(250,246,240,0.3)',
              width: '46px', height: '46px', color: 'var(--ivory)', fontSize: '20px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >‹</button>

          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: '88vw', maxHeight: '88vh' }}>
            <Image
              src={photos[selected].url}
              alt={`Anı ${selected + 1}`}
              width={900}
              height={700}
              style={{ objectFit: 'contain', maxHeight: '82vh', width: 'auto' }}
            />
            <p className="eyebrow" style={{
              textAlign: 'center', marginTop: '18px', color: 'var(--gold-pale)',
            }}>
              {String(selected + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </p>
          </div>

          <button
            onClick={e => { e.stopPropagation(); next() }}
            style={{
              position: 'fixed', right: '24px', top: '50%', transform: 'translateY(-50%)',
              background: 'transparent', border: '1px solid rgba(250,246,240,0.3)',
              width: '46px', height: '46px', color: 'var(--ivory)', fontSize: '20px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >›</button>

          <button
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', top: '24px', right: '24px',
              background: 'transparent', border: '1px solid rgba(250,246,240,0.3)',
              width: '38px', height: '38px', color: 'var(--ivory)', fontSize: '16px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
        </div>
      )}
    </section>
  )
}
