export function SprigLeft({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 60 C 25 50, 40 35, 55 10" stroke="#A6824D" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <ellipse cx="22" cy="48" rx="6" ry="2.5" fill="#A6824D" opacity="0.6" transform="rotate(-35 22 48)"/>
      <ellipse cx="34" cy="34" rx="6" ry="2.5" fill="#A6824D" opacity="0.6" transform="rotate(-45 34 34)"/>
      <ellipse cx="45" cy="22" rx="5" ry="2" fill="#A6824D" opacity="0.5" transform="rotate(-50 45 22)"/>
    </svg>
  )
}

export function SprigRight({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
      <path d="M5 60 C 25 50, 40 35, 55 10" stroke="#A6824D" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <ellipse cx="22" cy="48" rx="6" ry="2.5" fill="#A6824D" opacity="0.6" transform="rotate(-35 22 48)"/>
      <ellipse cx="34" cy="34" rx="6" ry="2.5" fill="#A6824D" opacity="0.6" transform="rotate(-45 34 34)"/>
      <ellipse cx="45" cy="22" rx="5" ry="2" fill="#A6824D" opacity="0.5" transform="rotate(-50 45 22)"/>
    </svg>
  )
}

export function RingMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="24" r="10" stroke="#5C1F2E" strokeWidth="1.2"/>
      <circle cx="24" cy="24" r="10" stroke="#A6824D" strokeWidth="1.2"/>
    </svg>
  )
}
