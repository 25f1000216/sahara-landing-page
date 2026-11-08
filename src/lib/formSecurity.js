// Client-side hardening for the contact form. NOTE: client checks reduce abuse and
// bad input but can be bypassed; real protection must also be enforced by the form
// backend (Formspree spam filtering, reCAPTCHA/Turnstile, allowed-domain settings).
export const LIMITS = { name: 60, email: 254, message: 1500 }
export const IDENTITY = ['IIT Madras BS Student', 'Volunteer', 'NGO Representative', 'Collaborator', 'Other']
export const PURPOSE = ['Join SAHARA', 'Volunteer for Activities', 'NGO Collaboration', 'Event Partnership', 'General Inquiry', 'Other']
export const MIN_FILL_MS = 3000        // humans need >3s to fill the form
export const COOLDOWN_MS = 60_000      // one submission per minute per browser
const KEY = 'sahara:lastSubmit'

// Strip control/zero-width/bidi characters and collapse whitespace (keep newlines in messages).
export function clean(value, { multiline = false } = {}) {
  let v = String(value ?? '').normalize('NFKC').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '')
  v = multiline ? v.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n') : v.replace(/\s+/g, ' ')
  return v.trim()
}

const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}'’. -]*$/u
const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/

export function sanitize(f) {
  return { firstName: clean(f.firstName), lastName: clean(f.lastName), email: clean(f.email).toLowerCase(),
    identity: clean(f.identity), purpose: clean(f.purpose), message: clean(f.message, { multiline: true }) }
}

export function validate(f) {
  const e = {}
  for (const [k, label] of [['firstName', 'first name'], ['lastName', 'last name']]) {
    if (!f[k]) e[k] = `Enter your ${label}.`
    else if (f[k].length > LIMITS.name) e[k] = `Use ${LIMITS.name} characters or fewer.`
    else if (!NAME_RE.test(f[k])) e[k] = 'Use letters, spaces, hyphens or apostrophes only.'
  }
  if (!f.email) e.email = 'Enter your email address.'
  else if (f.email.length > LIMITS.email || !EMAIL_RE.test(f.email)) e.email = 'Enter a valid email address, like name@example.com.'
  if (!IDENTITY.includes(f.identity)) e.identity = 'Choose how you identify yourself.'
  if (!PURPOSE.includes(f.purpose)) e.purpose = 'Choose your purpose.'
  if (!f.message) e.message = 'Tell us how we can help.'
  else if (f.message.length < 10) e.message = 'Write at least 10 characters.'
  else if (f.message.length > LIMITS.message) e.message = `Use ${LIMITS.message} characters or fewer.`
  return e
}

export const cooldownLeft = () => {
  try { return Math.max(0, COOLDOWN_MS - (Date.now() - Number(localStorage.getItem(KEY) || 0))) } catch { return 0 }
}
export const markSubmitted = () => { try { localStorage.setItem(KEY, String(Date.now())) } catch { /* storage unavailable */ } }

// Vite exposes VITE_* values through import.meta.env; require a real HTTPS endpoint.
export function getEndpoint() {
  const raw = String(import.meta.env.VITE_FORM_ENDPOINT ?? '').trim()
  if (!raw || /your[_-]?form[_-]?id/i.test(raw)) return null
  try { const endpoint = new URL(raw); return endpoint.protocol === 'https:' ? endpoint.href : null } catch { return null }
}
export const testMode = () => import.meta.env.DEV && import.meta.env.VITE_FORM_TEST_MODE === 'true'
