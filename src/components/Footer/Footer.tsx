import type { FormEvent } from 'react'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import styles from './Footer.module.css'

type FooterLink = { label: string; href: string }

type FooterProps = {
  brand: string[]
  /** First link renders as the column heading (Figma: "Shop"), the rest as list links. */
  navLinks: FooterLink[]
  newsletterTitle: string
  emailLabel: string
  submitLabel: string
  onSubmit?: (email: string) => void
  legalLinks: FooterLink[]
  copyright: string
}

export function Footer({
  brand,
  navLinks,
  newsletterTitle,
  emailLabel,
  submitLabel,
  onSubmit,
  legalLinks,
  copyright,
}: FooterProps) {
  const [primaryLink, ...otherLinks] = navLinks

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = new FormData(event.currentTarget).get('email')
    onSubmit?.(typeof email === 'string' ? email : '')
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <p className={styles.brand}>
          {brand.map((line, index) => (
            <span key={index}>{line}</span>
          ))}
        </p>

        <form className={styles.newsletter} onSubmit={handleSubmit}>
          <h2 className={styles.title}>{newsletterTitle}</h2>
          <div className={styles.signup}>
            <Input
              name="email"
              type="email"
              tone="light"
              label={emailLabel}
              placeholder={emailLabel}
              hideLabel
              required
              autoComplete="email"
              className={styles.email}
            />
            <Button type="submit" variant="light" className={styles.send}>
              {submitLabel}
            </Button>
          </div>
        </form>

        <nav className={styles.nav} aria-label="Footer">
          {primaryLink ? (
            <a className={styles.title} href={primaryLink.href}>
              {primaryLink.label}
            </a>
          ) : null}
          <ul className={styles.links}>
            {otherLinks.map((link) => (
              <li key={link.href}>
                <a className={styles.link} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          <span aria-hidden="true">©</span> {copyright}
        </p>
        <ul className={styles.legal}>
          {legalLinks.map((link) => (
            <li key={link.href}>
              <a className={styles.link} href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
