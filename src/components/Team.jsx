import { Mail } from 'lucide-react'
import { teamGroups } from '../data/team'
import { Reveal } from './ui'

const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')
const SAFE_EMAIL = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/

function Card({ m, tone }) {
  return (
    <article className="group flex h-full flex-col items-center rounded-3xl bg-plum-800 p-7 text-center transition duration-300 hover:-translate-y-1.5 hover:bg-plum-700">
      {m.photo
        ? <img src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" decoding="async" width="96" height="96" className="h-24 w-24 rounded-full object-cover ring-4 ring-emerald-500/60" />
        : <div aria-hidden="true" className={`grid h-24 w-24 place-items-center rounded-full font-display text-3xl font-black ring-4 ring-emerald-500/60 ${tone}`}>{initials(m.name)}</div>}
      <h4 className="mt-4 font-display text-xl font-bold">{m.name}</h4>
      <p className="mt-1 text-sm font-bold text-emerald-400">{m.role}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/85">{m.bio ? `“${m.bio}”` : ""}</p>
      {SAFE_EMAIL.test(m.email) && (
        <a href={`mailto:${m.email}`} aria-label={`Email ${m.name}`} className="mt-5 grid h-11 w-11 place-items-center rounded-full bg-emerald-600 transition hover:scale-110 hover:bg-emerald-700"><Mail size={18} /></a>
      )}
    </article>
  )
}

export default function Team() {
  const tones = ['bg-blush text-plum-900', 'bg-cream text-plum-900', 'bg-emerald-600 text-white']
  return (
    <section id="team" className="bg-plum-900">
      <div className="section">
        <Reveal><h2 className="h2 text-center">The People Behind SAHARA</h2></Reveal>
        {teamGroups.map((g, gi) => (
          <div key={g.title} className="mt-14">
            <Reveal><h3 className="mb-6 font-display text-2xl font-bold text-blush">{g.title}</h3></Reveal>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.members.map((m, k) => <li key={m.name}><Reveal delay={k * 0.08} className="h-full"><Card m={m} tone={tones[(gi + k) % 3]} /></Reveal></li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
