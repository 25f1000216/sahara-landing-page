import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { LOGO } from '../config'

export function Reveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  )
}

export function Logo({ className = 'h-12 w-14' }) {
  const [broken, setBroken] = useState(false)
  if (broken) return <span aria-hidden="true" className={`${className} grid place-items-center rounded-lg bg-electric font-display font-black text-white`}>S</span>
  return <img src={LOGO} alt="SAHARA logo" className={`${className} rounded-lg bg-surface object-contain`} onError={() => setBroken(true)} width="56" height="48" />
}

// Honest stand-in shown until a real photograph is added to the data files.
export function PhotoSlot({ src, alt, label, className = '' }) {
  if (src) return <img src={src} alt={alt} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />
  return (
    <div role="img" aria-label={`${alt} (photo to be added)`} className={`grid h-full w-full place-items-center bg-gradient-to-br from-electric to-cyan p-4 text-center ${className}`}>
      <span className="text-sm text-white/90">Photo to be added<br /><span className="font-bold text-white">{label}</span></span>
    </div>
  )
}

export function Hands({ className = '' }) {
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Two hands holding a heart">
      <circle cx="200" cy="200" r="190" fill="#e0f2fe" />
      <circle cx="200" cy="200" r="140" fill="#bae6fd" />
      <path d="M200 270 C120 215 130 150 170 150 C190 150 200 165 200 175 C200 165 210 150 230 150 C270 150 280 215 200 270Z" fill="#00f2fe" />
      <path d="M70 290 C110 250 150 270 200 300 C250 270 290 250 330 290 L330 330 L70 330Z" fill="#0066ff" />
      <path d="M95 300 C125 280 160 290 200 315 C240 290 275 280 305 300" stroke="#f8fafc" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="90" cy="110" r="8" fill="#0066ff" /><circle cx="320" cy="90" r="5" fill="#00b8d4" /><circle cx="335" cy="190" r="6" fill="#0f172a" />
    </svg>
  )
}
