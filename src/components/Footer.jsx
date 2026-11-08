import { Mail, Instagram, Linkedin, Youtube } from 'lucide-react'
import { NAV, SOCIAL, USEFUL_LINKS } from '../config'
import { Logo } from './ui'

const isHttps = (u) => { try { return new URL(u).protocol === 'https:' } catch { return false } }

export default function Footer() {
  const social = [
    { label: 'Email', Icon: Mail, href: SOCIAL.email && `mailto:${SOCIAL.email}` },
    { label: 'Instagram', Icon: Instagram, href: isHttps(SOCIAL.instagram) && SOCIAL.instagram },
    { label: 'LinkedIn', Icon: Linkedin, href: isHttps(SOCIAL.linkedin) && SOCIAL.linkedin },
    { label: 'YouTube', Icon: Youtube, href: isHttps(SOCIAL.youtube) && SOCIAL.youtube },
  ].filter((s) => s.href)
  return (
    <footer className="border-t border-white/10 bg-plum-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3"><Logo className="h-16 w-[4.5rem]" /><div><p className="font-display text-2xl font-black">SAHARA</p><p className="text-sm text-blush">The Social Welfare Society</p></div></div>
          <p className="mt-4 text-sm text-cream/75">IIT Madras BS Degree Program</p>
        </div>
        <nav aria-label="Quick navigation"><h2 className="font-display text-lg font-bold">Quick Navigation</h2>
          <ul className="mt-3 space-y-2 text-sm">{NAV.map((n) => <li key={n.id}><a className="text-cream/80 hover:text-emerald-400" href={`#${n.id}`}>{n.id === 'contact' ? 'Contact Us' : n.label}</a></li>)}</ul></nav>
        <nav aria-label="Useful links"><h2 className="font-display text-lg font-bold">Useful Links</h2>
          <ul className="mt-3 space-y-2 text-sm">{USEFUL_LINKS.map((l) => (
            <li key={l.label}>{isHttps(l.href)
              ? <a className="text-cream/80 hover:text-emerald-400" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
              : <span className="text-cream/50" title="Link coming soon">{l.label} (coming soon)</span>}</li>))}</ul></nav>
        <div><h2 className="font-display text-lg font-bold">Follow Us</h2>
          {social.length ? <ul className="mt-3 flex gap-3">{social.map(({ label, Icon, href }) => (
            <li key={label}><a href={href} aria-label={label} target={label === 'Email' ? undefined : '_blank'} rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-full bg-emerald-600 transition hover:-translate-y-0.5 hover:bg-emerald-700"><Icon size={20} /></a></li>))}</ul>
            : <p className="mt-3 text-sm text-cream/60">Our official channels will be linked here soon.</p>}</div>
      </div>
      <p className="border-t border-white/10 px-5 py-5 text-center text-sm text-cream/65">© {new Date().getFullYear()} SAHARA – The Social Welfare Society, IIT Madras BS Degree Program. Affiliated with the Indian Institute of Technology Madras.</p>
    </footer>
  )
}
