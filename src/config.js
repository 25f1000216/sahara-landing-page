// Central place for every URL that may need updating.
// Empty string = not provided yet; the UI hides/disables that item instead of showing a fake link.
export const LOGO = '/images/sahara-logo.png' // official updated SAHARA logo

export const NAV = [
  { id: 'home', label: 'Home' }, { id: 'about', label: 'About Us' }, { id: 'activities', label: 'Activities' },
  { id: 'events', label: 'Events' }, { id: 'team', label: 'Our Team' }, { id: 'contact', label: 'Contact' },
]

export const SOCIAL = {
  email: 'connectwithsahara@study.iitm.ac.in', // rendered as mailto:
  instagram: 'https://www.instagram.com/sahara_iitmbs/',  // official profile URL
  linkedin: 'https://www.linkedin.com/company/sahara-the-social-innovation-society/?originalSubdomain=in',   // official profile URL
  youtube: 'https://www.youtube.com/@saharaiitm',    // official channel URL
}

export const USEFUL_LINKS = [
  { label: 'Constitution', href: '' },     // TODO: official URL
  { label: 'Privacy Policy', href: '' },   // TODO: official URL
  { label: 'Code of Conduct', href: '' },  // TODO: official URL
  { label: 'Website Code', href: '' },     // TODO: your public GitHub repo URL
]
