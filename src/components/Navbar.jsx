import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV } from '../config'
import { Logo } from './ui'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-40% 0px -55% 0px' })
    NAV.forEach((n) => { const el = document.getElementById(n.id); el && io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey)
  }, [])

  const link = (n, mobile) => (
    <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} aria-current={active === n.id ? 'true' : undefined}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition ${mobile ? 'block text-base' : ''} ${active === n.id ? 'bg-emerald-600 text-white' : 'text-cream/85 hover:bg-white/10 hover:text-white'}`}>
      {n.label}
    </a>
  )

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition ${scrolled || open ? 'bg-plum-950/95 shadow-lg backdrop-blur' : 'bg-transparent'}`}>
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#home" className="flex items-center gap-3" aria-label="SAHARA home">
          <Logo />
          <span className="leading-tight"><span className="block font-display text-xl font-black tracking-wide">SAHARA</span><span className="block text-xs text-blush">IIT Madras BS Degree</span></span>
        </a>
        <div className="hidden items-center gap-1 md:flex">{NAV.map((n) => link(n))}</div>
        <button type="button" className="grid h-11 w-11 place-items-center rounded-lg hover:bg-white/10 md:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && <div id="mobile-menu" className="space-y-1 border-t border-white/10 px-5 pb-5 pt-3 md:hidden">{NAV.map((n) => link(n, true))}</div>}
    </header>
  )
}
