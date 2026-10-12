import type { NavLink } from '../components/Header/Header'

const links = [
  { label: 'Shop', href: '/#cupcakes' },
  { label: 'Our story', href: '/our-story' },
  { label: 'Why Miss cupcake', href: '/why-miss-cupcake' },
]

/** Header navigation; the entry for the page the visitor is on gets `current`. */
export function getNavLinks(pathname: string): NavLink[] {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname // the router also matches '/our-story/'
  return links.map((link) => ({ ...link, current: link.href.split('#', 1)[0] === path }))
}

export const footerNavLinks = links

export const legalLinks = [
  { label: 'Privacy policy', href: '/privacy-policy' },
  { label: 'Cookies policy', href: '/cookies-policy' },
  { label: 'Terms of use', href: '/terms-of-use' },
]

export const footerText = {
  brand: ['Miss', 'cupcake'],
  newsletterTitle: 'Sugar up your Inbox',
  emailLabel: 'Email address',
  submitLabel: 'send',
  copyright: 'Miss cupcakes 2020',
}
