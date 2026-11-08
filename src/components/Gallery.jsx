import { useEffect, useState, useCallback, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { gallery } from '../data/gallery'
import { Reveal, PhotoSlot } from './ui'

export default function Gallery() {
  const [idx, setIdx] = useState(null)
  const closeRef = useRef(null)
  const lastFocus = useRef(null)
  const n = gallery.length
  const close = useCallback(() => { setIdx(null); lastFocus.current?.focus() }, [])
  const step = useCallback((d) => setIdx((i) => (i + d + n) % n), [n])

  useEffect(() => {
    if (idx === null) return
    closeRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [idx === null, close, step]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="gallery" className="bg-plum-950">
      <div className="section">
        <Reveal><h2 className="h2 text-center">Moments That Matter</h2></Reveal>
        <ul className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
          {gallery.map((g, i) => (
            <li key={g.alt} className="break-inside-avoid">
              <button type="button" aria-label={`Open photo: ${g.caption}`} onClick={(e) => { lastFocus.current = e.currentTarget; setIdx(i) }}
                className={`group block w-full overflow-hidden rounded-2xl ${g.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                <div className="h-full transition duration-500 group-hover:scale-110"><PhotoSlot src={g.src} alt={g.alt} label={g.caption} /></div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {idx !== null && (
        <div role="dialog" aria-modal="true" aria-label="Photo preview" className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4" onClick={close}>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl"><PhotoSlot src={gallery[idx].src} alt={gallery[idx].alt} label={gallery[idx].caption} /></div>
            <p className="mt-3 text-center text-cream">{gallery[idx].caption} <span className="text-cream/60">({idx + 1}/{n})</span></p>
            <button ref={closeRef} type="button" aria-label="Close preview" onClick={close} className="absolute -top-3 right-0 grid h-11 w-11 place-items-center rounded-full bg-emerald-600 sm:-right-3"><X /></button>
            <button type="button" aria-label="Previous photo" onClick={() => step(-1)} className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/60 hover:bg-emerald-600"><ChevronLeft /></button>
            <button type="button" aria-label="Next photo" onClick={() => step(1)} className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/60 hover:bg-emerald-600"><ChevronRight /></button>
          </div>
        </div>
      )}
    </section>
  )
}
