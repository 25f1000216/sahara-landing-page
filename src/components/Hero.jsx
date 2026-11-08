import { motion } from 'framer-motion'
import { Hands } from './ui'

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-plum-950 to-plum-900">
      <div aria-hidden="true" className="absolute -right-24 top-20 h-96 w-96 rounded-full bg-emerald-600/15 blur-3xl" />
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="font-display text-6xl font-black leading-none sm:text-8xl">SAHARA</h1>
          <p className="mt-2 font-display text-2xl font-bold text-blush sm:text-3xl">The Social Welfare Society</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/90">We are the Official Social Welfare Society of the IIT Madras BS Degree Program, dedicated to providing assistance to those in need and creating opportunities for willing hearts.</p>
          <blockquote className="mt-6 max-w-xl border-l-4 border-emerald-500 bg-white/5 py-3 pl-5 pr-4 font-display text-lg italic text-cream">
            “We, the student community at IIT Madras BS Degree, are dedicated to instilling a sense of purpose and joy in assisting the less fortunate.”
          </blockquote>
          <p className="mt-5 max-w-xl text-cream/80">Our mission is to raise awareness, inspire compassion, and promote humanity by various means.</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#contact" className="btn text-lg">Join Us!</a>
            <p className="font-display text-xl font-bold text-blush">Together, we can make a difference.</p>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="mx-auto w-full max-w-md">
          <Hands className="h-auto w-full" />
        </motion.div>
      </div>
    </section>
  )
}
