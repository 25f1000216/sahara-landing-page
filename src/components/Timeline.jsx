import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { timeline } from '../data/events'
import { Reveal } from './ui'

function Card({ t, i }) {
  const [open, setOpen] = useState(false)
  const id = `tl-${i}`
  return (
    <div className="rounded-2xl bg-cream p-6 text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <time className="text-sm font-bold text-emerald-700">{t.date}</time>
      <h3 className="mt-1 font-display text-xl font-black text-plum-900">{t.title}</h3>
      <p className="mt-2 leading-relaxed">{t.text}</p>
      <div id={id} hidden={!open} className="mt-3">
        {t.image && <img src={t.image} alt={t.title} loading="lazy" decoding="async" className="mb-3 aspect-[4/3] w-full rounded-lg object-cover" />}
        <p className="leading-relaxed text-ink/90">{t.more}</p>
      </div>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)} className="mt-3 inline-flex items-center gap-1 py-1 font-bold text-emerald-700 hover:text-emerald-900">
        {open ? 'Show less' : 'Read more'}<ChevronDown size={18} className={`transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
    </div>
  )
}

export default function Timeline() {
  return (
    <section id="journey" className="bg-blush text-ink">
      <div className="section">
        <Reveal><h2 className="h2 text-center text-plum-900">Our Journey So Far</h2></Reveal>
        <ol className="relative mt-14 space-y-10 before:absolute before:bottom-0 before:left-4 before:top-0 before:w-0.5 before:bg-plum-700/40 md:before:left-1/2 md:before:-translate-x-1/2">
          {timeline.map((t, i) => (
            <li key={t.title} className="relative pl-12 md:grid md:grid-cols-2 md:gap-14 md:pl-0">
              <span aria-hidden="true" className="absolute left-4 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-blush bg-emerald-600 md:left-1/2" />
              <Reveal className={i % 2 ? 'md:col-start-2' : ''}><Card t={t} i={i} /></Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
