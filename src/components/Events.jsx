import { useState } from 'react'
import { MapPin, CalendarDays, ChevronDown } from 'lucide-react'
import { events } from '../data/events'
import { Reveal, PhotoSlot } from './ui'

function EventCard({ ev }) {
  const [open, setOpen] = useState(false)
  const id = `ev-${ev.id}`
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-cream text-ink shadow-xl transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="h-full transition duration-500 group-hover:scale-105"><PhotoSlot src={ev.image} alt={ev.title} label={ev.title} /></div>
        <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1.5 text-sm font-bold text-white"><CalendarDays size={15} aria-hidden="true" />{ev.date}</span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="font-display text-2xl font-black text-plum-900">{ev.title}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm font-medium text-plum-700"><MapPin size={16} aria-hidden="true" />{ev.location}</p>
        <p className="mt-4 leading-relaxed">{ev.description}</p>
        <div id={id} hidden={!open} className="mt-5">
          <h4 className="font-bold text-plum-900">Highlights</h4>
          <ul className="mt-2 list-disc space-y-2 pl-5 leading-relaxed">{ev.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          <h4 className="mt-5 font-bold text-plum-900">Partner organizations</h4>
          <ul className="mt-2 flex flex-wrap gap-2">{ev.partners.map((p) => <li key={p} className="rounded-full bg-blush px-3 py-1 text-sm font-medium text-plum-900">{p}</li>)}</ul>
        </div>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={id}
          className="mt-6 inline-flex items-center gap-2 self-start rounded-lg py-2 font-bold text-emerald-700 transition hover:text-emerald-900">
          {open ? 'Show less' : 'Show highlights and partners'}<ChevronDown size={18} className={`transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

export default function Events() {
  return (
    <section id="events" className="bg-plum-900">
      <div className="section">
        <Reveal><h2 className="h2">Events &amp; Activities</h2><p className="mt-3 max-w-xl text-cream/80">Our offline volunteering journeys so far.</p></Reveal>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">{events.map((ev, i) => <Reveal key={ev.id} delay={i * 0.12}><EventCard ev={ev} /></Reveal>)}</div>
      </div>
    </section>
  )
}
