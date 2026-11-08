import { useState } from 'react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import { Reveal } from './ui'

export default function Testimonials() {
  const [i, setI] = useState(0)
  const n = testimonials.length
  const t = testimonials[i]
  return (
    <section id="testimonials" className="bg-plum-950">
      <div className="section">
        <Reveal><h2 className="h2 text-center">Voices of SAHARA</h2></Reveal>
        <div className="mx-auto mt-12 max-w-3xl" role="region" aria-roledescription="carousel" aria-label="Testimonials">
          <figure key={i} aria-live="polite" className="rounded-3xl bg-plum-800 p-8 text-center sm:p-12" style={{ animation: 'fade .4s ease' }}>
            <Quote className="mx-auto text-emerald-400" size={40} aria-hidden="true" />
            <blockquote className="mt-5 font-display text-xl leading-relaxed sm:text-2xl">“{t.quote}”</blockquote>
            <figcaption className="mt-6 font-bold text-blush">— {t.name}</figcaption>
          </figure>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button type="button" aria-label="Previous testimonial" onClick={() => setI((i + n - 1) % n)} className="grid h-11 w-11 place-items-center rounded-full bg-emerald-600 transition hover:bg-emerald-700"><ChevronLeft /></button>
            <div className="flex gap-2">{testimonials.map((x, k) => <button key={x.name} type="button" aria-label={`Show testimonial ${k + 1} of ${n}`} aria-current={k === i} onClick={() => setI(k)} className={`h-3 rounded-full transition-all ${k === i ? 'w-8 bg-emerald-500' : 'w-3 bg-white/30'}`} />)}</div>
            <button type="button" aria-label="Next testimonial" onClick={() => setI((i + 1) % n)} className="grid h-11 w-11 place-items-center rounded-full bg-emerald-600 transition hover:bg-emerald-700"><ChevronRight /></button>
          </div>
        </div>
      </div>
      <style>{'@keyframes fade{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:none}}'}</style>
    </section>
  )
}
