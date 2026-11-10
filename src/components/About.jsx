import { Target, Eye } from 'lucide-react'
import { Reveal, Hands } from './ui'

export default function About() {
  return (
    <section id="about" className="bg-cream text-ink">
      <div className="section grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <h2 className="h2 text-plum-900">Who We Are</h2>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-slate-800">SAHARA is the Official Social Welfare Society of the IIT Madras BS Degree Program. It serves as a platform for students who want to make meaningful efforts for themselves and for the less fortunate. It brings together individuals who believe in <strong className="text-emerald-700">compassion</strong>, <strong className="text-emerald-700">empathy</strong>, and the power of <strong className="text-emerald-700">collective action</strong>.</p>
          <Hands className="mt-8 hidden h-56 w-56 lg:block" />
        </Reveal>
        <div className="space-y-6">
          <Reveal delay={0.1}>
            <article className="rounded-2xl bg-blush p-7">
              <h3 className="flex items-center gap-3 font-display text-2xl font-bold text-plum-900"><Target className="text-emerald-700" aria-hidden="true" />Our Mission</h3>
              <p className="mt-3 leading-relaxed text-slate-800">Our mission is to raise awareness, inspire compassion, and promote humanity by various means. We foster essential skills such as <strong>leadership</strong>, <strong>effective social interactions</strong>, <strong>public speaking</strong>, and <strong>selflessness</strong> among our student community.</p>
            </article>
          </Reveal>
          <Reveal delay={0.2}>
            <article className="rounded-2xl bg-plum-900 p-7 text-cream">
              <h3 className="flex items-center gap-3 font-display text-2xl font-bold"><Eye className="text-emerald-600" aria-hidden="true" />Our Vision</h3>
              <p className="mt-3 leading-relaxed text-slate-200">To create a community of empathetic individuals who actively contribute towards building a more <strong className="text-emerald-300">inclusive, compassionate, and socially responsible</strong> society.</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
