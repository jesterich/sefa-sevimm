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

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 4px',
    border: 'none',
    borderBottom: '1px solid var(--line)',
    background: 'transparent',
    fontSize: '1rem',
    color: 'var(--ink)',
    outline: 'none',
    transition: 'border-color 0.3s',
  }

  return (
    <section style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="eyebrow" style={{ marginBottom: '18px' }}>Misafir Defteri</p>
          <h2 className="serif-display" style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 500,
            fontStyle: 'italic',
            color: 'var(--wine)',
          }}>
            Bir Not Bırak
          </h2>
        </div>

        <div className="card-frame" style={{ padding: '48px 40px', marginBottom: '56px' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p className="serif-display" style={{ color: 'var(--wine)', fontSize: '1.3rem', fontStyle: 'italic' }}>
                Teşekkürler — notunuz iletildi.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <p className="eyebrow" style={{ fontSize: '0.65rem', marginBottom: '6px' }}>İsim</p>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Adınız"
                  style={fieldStyle}
                  onFocus={e => (e.target.style.borderColor = 'var(--wine)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--line)')}
                />
              </div>
              <div>
                <p className="eyebrow" style={{ fontSize: '0.65rem', marginBottom: '6px' }}>Mesaj</p>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Bize birkaç söz yazın..."
                  rows={4}
                  style={{ ...fieldStyle, resize: 'vertical' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--wine)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--line)')}
                />
              </div>
              <button
                className="btn-primary"
                onClick={handleSubmit}
                disabled={loading || !name.trim() || !message.trim()}
                style={{ alignSelf: 'center', marginTop: '8px' }}
              >
                {loading ? 'Gönderiliyor' : 'Notu Gönder'}
              </button>
            </div>
          )}
        </div>

        {!fetchLoading && notes.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {notes.map((note, i) => (
              <div key={note.id} style={{
                padding: '28px 4px',
                borderTop: i === 0 ? '1px solid var(--line)' : 'none',
                borderBottom: '1px solid var(--line)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                  <p className="serif-display" style={{ fontWeight: 600, color: 'var(--wine)', fontSize: '1.1rem' }}>
                    {note.author_name}
                  </p>
                  <p className="eyebrow" style={{ fontSize: '0.6rem' }}>{formatDate(note.created_at)}</p>
                </div>
                <p style={{ color: 'var(--ink)', lineHeight: 1.75, fontSize: '0.96rem', fontWeight: 300 }}>
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
