'use client'
import { useState } from 'react'
import { RingMark } from './Ornament'

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
        backgroundImage:
          'radial-gradient(circle at 15% 8%, rgba(166,130,77,0.08) 0%, transparent 40%), radial-gradient(circle at 85% 92%, rgba(92,31,46,0.07) 0%, transparent 45%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 24px',
        opacity: closing ? 0 : 1,
        transition: 'opacity 0.7s ease',
        pointerEvents: closing ? 'none' : 'auto',
      }}
    >
      <p className="eyebrow fade-up" style={{ marginBottom: '24px' }}>
        Sizi Davet Ediyoruz
      </p>

      <div className="fade-up" style={{ marginBottom: '20px' }}>
        <RingMark size={44} />
      </div>

      <h1 className="serif-display fade-up" style={{
        fontSize: 'clamp(2.4rem, 7vw, 3.6rem)',
        fontStyle: 'italic',
        fontWeight: 500,
        color: 'var(--wine)',
        marginBottom: '10px',
      }}>
        Sefa &amp; Sevim
      </h1>

      <p className="eyebrow fade-up" style={{ marginBottom: '46px', fontSize: '0.66rem' }}>
        28 Haziran 2025
      </p>

      <button
        className="btn-primary fade-up"
        onClick={handleEnter}
        style={{ animationDelay: '0.3s' }}
      >
        Hikayemize Gir
      </button>

      <p className="eyebrow fade-up" style={{
        marginTop: '24px',
        fontSize: '0.58rem',
        opacity: 0.6,
        animationDelay: '0.4s',
      }}>
        Müzik eşliğinde
      </p>
    </div>
  )
}
