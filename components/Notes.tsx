'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Note {
  id: string
  author_name: string
  message: string
  created_at: string
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)

  const fetchNotes = async () => {
    const { data } = await supabase
      .from('anniversary_notes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
    if (data) setNotes(data)
    setFetchLoading(false)
  }

  useEffect(() => { fetchNotes() }, [])

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) return
    setLoading(true)
    const { error } = await supabase
      .from('anniversary_notes')
      .insert({ author_name: name.trim(), message: message.trim() })
    if (!error) {
      setSent(true)
      setName('')
      setMessage('')
      await fetchNotes()
      setTimeout(() => setSent(false), 4000)
    }
    setLoading(false)
  }

  const formatDate = (d: string) => {
    return new Date(d).toLocaleDateString('tr-TR', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
  }

  return (
    <section style={{ padding: '80px 20px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>💌</div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: '#9c27b0', fontWeight: 700, marginBottom: '12px' }}>
            Sevgi Notları
          </h2>
          <div className="section-divider" />
          <p style={{ color: '#c2185b' }}>Sefa & Sevim'e bir mesaj bırak</p>
        </div>

        {/* Form */}
        <div className="glass-card" style={{ padding: '40px', marginBottom: '40px' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }} className="heartbeat">💕</div>
              <p style={{ color: '#9c27b0', fontSize: '1.2rem', fontWeight: 600 }}>
                Teşekkürler! Notun gönderildi 🌸
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ color: '#9c27b0', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                  Adın 💜
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="İsmin..."
                  style={{
                    width: '100%', padding: '12px 16px',
                    border: '2px solid rgba(156,39,176,0.3)',
                    borderRadius: '12px', fontSize: '1rem',
                    background: 'rgba(255,255,255,0.7)',
                    color: '#4a1942', outline: 'none',
                    transition: 'border-color 0.3s',
                    fontFamily: 'Georgia, serif',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#9c27b0')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(156,39,176,0.3)')}
                />
              </div>
              <div>
                <label style={{ color: '#9c27b0', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                  Mesajın 🩷
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Bu çifte bir şeyler söyle..."
                  rows={4}
                  style={{
                    width: '100%', padding: '12px 16px',
                    border: '2px solid rgba(156,39,176,0.3)',
                    borderRadius: '12px', fontSize: '1rem',
                    background: 'rgba(255,255,255,0.7)',
                    color: '#4a1942', outline: 'none', resize: 'vertical',
                    transition: 'border-color 0.3s',
                    fontFamily: 'Georgia, serif',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#9c27b0')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(156,39,176,0.3)')}
                />
              </div>
              <button
                className="romantic-btn"
                onClick={handleSubmit}
                disabled={loading || !name.trim() || !message.trim()}
                style={{ opacity: loading || !name.trim() || !message.trim() ? 0.6 : 1 }}
              >
                {loading ? '⏳ Gönderiliyor...' : '💌 Not Bırak'}
              </button>
            </div>
          )}
        </div>

        {/* Notes List */}
        {fetchLoading ? (
          <div style={{ textAlign: 'center', color: '#9c27b0', padding: '40px' }}>
            <div className="pulse-soft" style={{ fontSize: '32px' }}>💜</div>
          </div>
        ) : notes.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {notes.map(note => (
              <div key={note.id} className="glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{
                    fontWeight: 700, color: '#9c27b0',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}>
                    <span style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #e91e63, #9c27b0)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontSize: '14px', fontWeight: 700, flexShrink: 0,
                    }}>
                      {note.author_name.charAt(0).toUpperCase()}
                    </span>
                    {note.author_name}
                  </div>
                  <span style={{ color: '#c2185b', fontSize: '0.8rem', opacity: 0.7 }}>
                    {formatDate(note.created_at)}
                  </span>
                </div>
                <p style={{ color: '#4a1942', lineHeight: 1.7, fontSize: '1rem' }}>
                  {note.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
