import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, AlertTriangle, Loader2, Send } from 'lucide-react'
import { IDENTITY, PURPOSE, LIMITS, MIN_FILL_MS, sanitize, validate, cooldownLeft, markSubmitted, getEndpoint, testMode } from '../lib/formSecurity'
import { Reveal, Hands } from './ui'

const EMPTY = { firstName: '', lastName: '', email: '', identity: '', purpose: '', message: '' }
const field = (err) => `mt-1.5 w-full rounded-lg border-2 bg-white px-4 py-3 text-ink placeholder:text-gray-600 transition duration-200 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 ${err ? 'border-red-500' : 'border-transparent'}`

export default function Contact() {
  const [v, setV] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errMsg, setErrMsg] = useState('')
  const [trap, setTrap] = useState('')         // honeypot: real users never see or fill this
  const openedAt = useRef(Date.now())
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const set = (k) => (e) => { setV((s) => ({ ...s, [k]: e.target.value })); if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined })) }

  async function onSubmit(e) {
    e.preventDefault()
    if (status === 'sending') return
    const data = sanitize(v)
    const errs = validate(data)
    setErrors(errs)
    if (Object.keys(errs).length) { document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus(); return }

    // Bots: silently pretend success without sending anything.
    if (trap || Date.now() - openedAt.current < MIN_FILL_MS) {
      if (!trap) { setErrMsg('That was a little quick. Please wait a few seconds and submit again.'); setStatus('error'); return }
      setStatus('success'); setV(EMPTY); return
    }
    const wait = cooldownLeft()
    if (wait) { setErrMsg(`You already sent a request. Please wait ${Math.ceil(wait / 1000)} seconds before sending another.`); setStatus('error'); return }

    const endpoint = getEndpoint()
    if (!endpoint && !testMode()) { setErrMsg('The contact form is not configured yet. Please set VITE_FORM_ENDPOINT (see README).'); setStatus('error'); return }

    setStatus('sending'); setErrMsg('')
    const ctrl = new AbortController()
    const to = setTimeout(() => ctrl.abort(), 12000)
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST', signal: ctrl.signal, mode: 'cors', credentials: 'omit', referrerPolicy: 'strict-origin-when-cross-origin',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...data, name: `${data.firstName} ${data.lastName}`, _gotcha: '' }),
        })
        if (!res.ok) throw new Error(String(res.status))
      } else {
        await new Promise((r) => setTimeout(r, 900)) // TEST MODE (dev only): nothing is transmitted
      }
      markSubmitted(); setV(EMPTY); setErrors({}); setStatus('success'); openedAt.current = Date.now()
      timer.current = setTimeout(() => setStatus('idle'), 8000)
    } catch (err) {
      setErrMsg(err.name === 'AbortError' ? 'The request timed out. Check your connection and try again.' : 'We could not send your request. Please try again in a moment.')
      setStatus('error')
    } finally { clearTimeout(to) }
  }

  const Err = ({ k }) => errors[k] ? <p id={`e-${k}`} role="alert" className="mt-1 text-sm font-medium text-red-300">{errors[k]}</p> : null
  const a11y = (k) => ({ id: `f-${k}`, name: k, value: v[k], onChange: set(k), 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `e-${k}` : undefined, className: field(errors[k]) })
  const sending = status === 'sending'

  return (
    <section id="contact" className="bg-gradient-to-b from-plum-900 to-plum-950">
      <div className="section">
        <Reveal><h2 className="h2 text-center text-cream">Let's Make a Difference Together!</h2><p className="mt-3 text-center font-display text-xl text-blush">Get in Touch with Us</p></Reveal>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <Hands className="mx-auto hidden h-auto w-full max-w-sm lg:block" />
          <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl bg-plum-800/80 p-6 sm:p-8" aria-busy={sending}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div><label htmlFor="f-firstName" className="font-medium text-cream">First Name</label><input type="text" autoComplete="given-name" required maxLength={LIMITS.name} placeholder="Asha" {...a11y('firstName')} /><Err k="firstName" /></div>
              <div><label htmlFor="f-lastName" className="font-medium text-cream">Last Name</label><input type="text" autoComplete="family-name" required maxLength={LIMITS.name} placeholder="Verma" {...a11y('lastName')} /><Err k="lastName" /></div>
            </div>
            <div><label htmlFor="f-email" className="font-medium text-cream">Email</label><input type="email" autoComplete="email" inputMode="email" required maxLength={LIMITS.email} placeholder="you@example.com" {...a11y('email')} /><Err k="email" /></div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div><label htmlFor="f-identity" className="font-medium text-cream">Identify Yourself As</label>
                <select required {...a11y('identity')}><option value="">Select one</option>{IDENTITY.map((o) => <option key={o}>{o}</option>)}</select><Err k="identity" /></div>
              <div><label htmlFor="f-purpose" className="font-medium text-cream">Your Purpose</label>
                <select required {...a11y('purpose')}><option value="">Select one</option>{PURPOSE.map((o) => <option key={o}>{o}</option>)}</select><Err k="purpose" /></div>
            </div>
            <div><label htmlFor="f-message" className="font-medium text-cream">What We Can Do For You?</label>
              <textarea rows={5} required maxLength={LIMITS.message} placeholder="Tell us a little about how we can help" {...a11y('message')} />
              <div className="flex justify-between"><Err k="message" /><span className="ml-auto mt-1 text-xs text-cream/70">{v.message.length}/{LIMITS.message}</span></div></div>

            {/* Honeypot: hidden from people and assistive tech, bots tend to fill it */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
              <label>Leave this empty<input type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} /></label>
            </div>

            {status === 'error' && <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-950/70 p-3 text-sm text-red-100"><AlertTriangle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />{errMsg}</p>}
            <button type="submit" disabled={sending} className="btn w-full text-lg">
              {sending ? <><Loader2 className="animate-spin" size={20} aria-hidden="true" />Sending…</> : <><Send size={18} aria-hidden="true" />Submit Request</>}
            </button>
            {testMode() && <p className="text-center text-xs text-blush">Test mode is on: submissions are not sent anywhere.</p>}
          </form>
        </div>
      </div>
      {status === 'success' && (
        <div role="status" className="fixed inset-x-4 bottom-6 z-50 mx-auto flex max-w-md items-start gap-3 rounded-2xl bg-emerald-600 p-5 text-white shadow-2xl">
          <CheckCircle2 className="mt-0.5 shrink-0" aria-hidden="true" />
          <p className="font-medium">Thank you! Your request has been successfully submitted to SAHARA Welfare Society.</p>
          <button type="button" onClick={() => setStatus('idle')} className="ml-2 rounded px-2 font-bold hover:bg-white/20" aria-label="Dismiss message">×</button>
        </div>
      )}
    </section>
  )
}
