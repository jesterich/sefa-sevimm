'use client'
import { useEffect, useState } from 'react'

interface Balloon {
  id: number
  left: number
  duration: number
  delay: number
  emoji: string
  size: number
  drift: number
}

const EMOJIS = ['🎈', '🎈', '🎈', '💕', '🎈']

function makeBalloon(id: number): Balloon {
  return {
    id,
    left: Math.random() * 100,
    duration: 9 + Math.random() * 7,
    delay: Math.random() * 6,
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    size: 28 + Math.random() * 22,
    drift: (Math.random() - 0.5) * 80,
  }
}

export default function Balloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([])

  useEffect(() => {
    setBalloons(Array.from({ length: 18 }, (_, i) => makeBalloon(i)))
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1500 }}>
      {balloons.map(b => (
        <span
          key={b.id}
          style={{
            position: 'absolute',
            left: `${b.left}%`,
            bottom: '-60px',
            fontSize: `${b.size}px`,
            animation: `balloonRise ${b.duration}s ease-in ${b.delay}s infinite`,
            // @ts-expect-error custom property for drift
            '--drift': `${b.drift}px`,
          }}
        >
          {b.emoji}
        </span>
      ))}
    </div>
  )
}
