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
    <section style={{ padding: '80px 20px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📸</div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: '#9c27b0', fontWeight: 700, marginBottom: '12px' }}>
            Anılarımız
          </h2>
          <div className="section-divider" />
          <p style={{ color: '#c2185b' }}>Her kare, sonsuzluğa adım atmış bir an</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#9c27b0' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }} className="pulse-soft">🌸</div>
            <p>Fotoğraflar yükleniyor...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="glass-card" style={{ padding: '60px', textAlign: 'center', color: '#9c27b0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🖼️</div>
            <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Henüz fotoğraf yüklenmemiş</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Supabase Storage'a fotoğrafları yükleyince burada görünecek</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '12px',
          }}>
            {photos.map((photo, i) => (
              <div
                key={photo.name}
                onClick={() => setSelected(i)}
                style={{
                  aspectRatio: '1',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 4px 15px rgba(156,39,176,0.2)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 25px rgba(156,39,176,0.4)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 15px rgba(156,39,176,0.2)'
                }}
              >
                <Image
                  src={photo.url}
                  alt={`Anı ${i + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 50vw, 200px"
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(233,30,99,0.2), rgba(156,39,176,0.2))',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0'}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected !== null && photos[selected] && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            style={{
              position: 'fixed', left: '20px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
              width: '50px', height: '50px', color: 'white', fontSize: '24px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(10px)',
            }}
          >‹</button>

          <div
            onClick={e => e.stopPropagation()}
            style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}
          >
            <Image
              src={photos[selected].url}
              alt={`Anı ${selected + 1}`}
              width={900}
              height={700}
              style={{ objectFit: 'contain', maxHeight: '85vh', borderRadius: '12px' }}
            />
            <div style={{
              position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)',
              color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem',
            }}>
              {selected + 1} / {photos.length}
            </div>
          </div>

          <button
            onClick={e => { e.stopPropagation(); next() }}
            style={{
              position: 'fixed', right: '20px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
              width: '50px', height: '50px', color: 'white', fontSize: '24px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(10px)',
            }}
          >›</button>

          <button
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', top: '20px', right: '20px',
              background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
              width: '40px', height: '40px', color: 'white', fontSize: '20px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
        </div>
      )}
    </section>
  )
}
