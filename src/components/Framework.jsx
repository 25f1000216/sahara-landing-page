import { HeartHandshake, Users, Footprints, Megaphone, Link2, MapPin, Mic, Trophy, Share2 } from 'lucide-react'
import { goals } from '../data/goals'
import { Reveal, PhotoSlot } from './ui'

const ICONS = { HeartHandshake, Megaphone, Footprints, Link2, MapPin, Mic, Trophy, Share2 }

export default function Framework() {
  return (
    <section id="activities" className="bg-plum-950">
      <div className="section">
        <Reveal><h2 className="h2">Our Framework</h2></Reveal>
        <Reveal delay={0.1} className="mt-10">
          <article className="group grid overflow-hidden rounded-3xl bg-plum-800 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/30 md:grid-cols-2">
            <div className="aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[320px]"><div className="h-full transition duration-500 group-hover:scale-105"><PhotoSlot src="/images/offline-volunteering.jpg" alt="SAHARA volunteers during an offline activity" label="Offline Volunteering" /></div></div>
            <div className="p-7 sm:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-600"><Footprints aria-hidden="true" /></span>
              <h3 className="mt-5 font-display text-3xl font-bold">Offline Volunteering</h3>
              <p className="mt-4 leading-relaxed text-cream/90">We organize hands-on offline volunteering activities to provide our IITM BS student community with direct experience into the operations of NGOs, transforming online acquaintances into lifelong friends through affordable, inclusive journeys.</p>
              <ul className="mt-6 flex flex-wrap gap-3 text-sm">
                <li className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><HeartHandshake size={16} aria-hidden="true" />Social responsibility</li>
                <li className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><Footprints size={16} aria-hidden="true" />Hands-on experience</li>
                <li className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><Users size={16} aria-hidden="true" />Student community</li>
              </ul>
            </div>
          </article>
        </Reveal>
        <Reveal className="mt-16"><h3 className="font-display text-3xl font-black sm:text-4xl">Our Goals</h3></Reveal>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {goals.map((g, i) => { const Icon = ICONS[g.icon]; return (
            <li key={g.title}><Reveal delay={(i % 4) * 0.08} className="h-full">
              <article className="flex h-full flex-col rounded-2xl bg-plum-800 p-6 transition duration-300 hover:-translate-y-1 hover:bg-plum-700">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-emerald-600"><Icon size={22} aria-hidden="true" /></span>
                <h4 className="mt-4 font-display text-lg font-bold leading-snug text-blush">{g.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-cream/85">{g.text}</p>
              </article>
            </Reveal></li>) })}
        </ul>
      </div>
    </section>
  )
}
