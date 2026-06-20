'use client'
import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function useCountdown(from: Date): TimeLeft {
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const now = new Date()
      const diff = now.getTime() - from.getTime()
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
  }, [from])

  return time
}

function CounterBlock({
  eyebrow,
  title,
  time,
}: {
  eyebrow: string
  title: string
  time: TimeLeft
}) {
  const boxes = [
    { label: 'Gün', value: time.days },
    { label: 'Saat', value: time.hours },
    { label: 'Dakika', value: time.minutes },
    { label: 'Saniye', value: time.seconds },
  ]

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
      <p className="eyebrow" style={{ marginBottom: '18px' }}>{eyebrow}</p>
      <h2 className="serif-display" style={{
        fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
        fontWeight: 500,
        fontStyle: 'italic',
        color: 'var(--wine)',
        marginBottom: '50px',
      }}>
        {title}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0px',
        border: '1px solid var(--line)',
      }}>
        {boxes.map(({ label, value }, i) => (
          <div key={label} style={{
            padding: '36px 8px',
            borderRight: i < 3 ? '1px solid var(--line)' : 'none',
          }}>
            <div className="serif-display" style={{
              fontSize: 'clamp(2.2rem, 6vw, 3.4rem)',
              fontWeight: 500,
              color: 'var(--wine)',
              lineHeight: 1,
              marginBottom: '10px',
            }}>
              {String(value).padStart(2, '0')}
            </div>
            <div className="eyebrow" style={{ fontSize: '0.62rem' }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const WEDDING_DATE = new Date('2025-06-28T10:00:00')
const RELATIONSHIP_DATE = new Date('2021-11-09T00:00:00')

export default function Counter() {
  const weddingTime = useCountdown(WEDDING_DATE)
  const relationshipTime = useCountdown(RELATIONSHIP_DATE)

  return (
    <section style={{ padding: '120px 24px', position: 'relative' }}>
      <CounterBlock
        eyebrow="Birlikte Geçen Zaman"
        title="28 Haziran 2025'ten bu yana"
        time={weddingTime}
      />

      <div className="hairline" style={{ maxWidth: '720px', margin: '90px auto' }} />

      <CounterBlock
        eyebrow="Aşkımızın Başlangıcı"
        title="9 Kasım 2021'den bu yana"
        time={relationshipTime}
      />
    </section>
  )
}
