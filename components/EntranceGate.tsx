'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function EntranceGate({ onEnter }: { onEnter: () => void }) {
  const [closing, setClosing] = useState(false)

  const handleEnter = () => {
    setClosing(true)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      onEnter()
    }, 700)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'var(--ivory)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        opacity: closing ? 0 : 1,
        transition: 'opacity 0.7s ease',
        pointerEvents: closing ? 'none' : 'auto',
      }}
    >
      <div
        className="fade-up"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          aspectRatio: '4/5',
          boxShadow: '0 12px 50px rgba(92,31,46,0.18)',
          border: '1px solid var(--line)',
        }}
      >
        <Image
          src="/davetiye.jpg"
          alt="Sevim & Sefa Davetiyesi"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <button
        className="btn-primary fade-up"
        onClick={handleEnter}
        style={{ marginTop: '36px', animationDelay: '0.3s' }}
      >
        Hikayemize Gir
      </button>
    </div>
  )
}
