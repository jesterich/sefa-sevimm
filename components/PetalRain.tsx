'use client'
import { useEffect, useState } from 'react'

interface Petal {
  id: number
  left: number
  duration: number
  delay: number
  emoji: string
  size: number
}

export default function PetalRain() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const emojis = ['🌸', '🌺', '💮', '🌷', '💕', '✨', '💜', '🩷']
    const newPetals: Petal[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 10,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      size: 14 + Math.random() * 12,
    }))
    setPetals(newPetals)
  }, [])

  return (
    <>
      {petals.map(p => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </>
  )
}
