import { useLocation, useNavigate } from 'react-router-dom'
import { footerNavLinks, footerText, legalLinks } from '../../data/navigation'
import { validateEmail } from '../../features/checkout/validation'
import { useNewsletterSignup } from '../../features/newsletter'
import { Footer } from '../Footer/Footer'

/** The footer every page uses: its newsletter form signs up and takes the visitor to the top of the Homepage. */
export function SiteFooter() {
  const subscribe = useNewsletterSignup()
  const navigate = useNavigate()
  const { pathname, hash } = useLocation()

  function handleSubmit(email: string) {
    const error = subscribe(email)
    if (error) return error
    // Already at the Homepage: the route does not change, so nothing else would scroll up to the notice.
    if (pathname === '/' && !hash) window.scrollTo(0, 0)
    else navigate('/')
    return ''
  }

  return <Footer {...footerText} navLinks={footerNavLinks} legalLinks={legalLinks} onSubmit={handleSubmit} validate={validateEmail} />
}
