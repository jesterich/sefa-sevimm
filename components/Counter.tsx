'use client'
import { useEffect, useState } from 'react'

const WEDDING_DATE = new Date('2025-06-28T10:00:00')

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Counter() {
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const now = new Date()
      const diff = now.getTime() - WEDDING_DATE.getTime()
      const total = Math.floor(diff / 1000)
      setTime({
        days: Math.floor(total / 86400),
        hours: Math.floor((total % 86400) / 3600),
        minutes: Math.floor((total % 3600) / 60),
        seconds: total % 60,
      })
    }
    calc()
    const interval = setInterval(calc, 1000)
    return () => clearInterval(interval)
  }, [])

  const boxes = [
    { label: 'Gün', value: time.days },
    { label: 'Saat', value: time.hours },
    { label: 'Dakika', value: time.minutes },
    { label: 'Saniye', value: time.seconds },
  ]

  return (
    <section style={{ padding: '80px 20px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div className="glass-card" style={{ padding: '50px 40px' }}>
          <div className="heartbeat" style={{ fontSize: '48px', marginBottom: '12px' }}>❤️</div>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            color: '#9c27b0',
            marginBottom: '8px',
            fontWeight: 700,
          }}>
            Birlikte Geçirdiğimiz Zaman
          </h2>
          <p style={{ color: '#c2185b', marginBottom: '40px', fontSize: '1rem' }}>
            28 Haziran 2025'ten bu yana...
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}>
            {boxes.map(({ label, value }) => (
              <div key={label} style={{
                background: 'linear-gradient(135deg, rgba(233,30,99,0.1), rgba(156,39,176,0.15))',
                borderRadius: '16px',
                padding: '20px 10px',
                border: '1px solid rgba(233,30,99,0.2)',
              }}>
                <div style={{
                  fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #e91e63, #9c27b0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}>
                  {String(value).padStart(2, '0')}
                </div>
                <div style={{ color: '#9c27b0', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
