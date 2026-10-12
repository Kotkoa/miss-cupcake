import { useRef, useState } from 'react'
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
  /** Returns the error text to show under the field, or '' when the signup went through (the field is then cleared). */
  onSubmit: (email: string) => string
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

  const [error, setError] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const message = onSubmit(emailRef.current?.value ?? '')
    setError(message)
    if (message) emailRef.current?.focus() // the "send" button took focus: put it back in the field
    else event.currentTarget.reset()
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <p className={styles.brand}>
          {brand.map((line, index) => (
            <span key={index}>{line}</span>
          ))}
        </p>

        <form className={styles.newsletter} onSubmit={handleSubmit} noValidate>
          <h2 className={styles.title}>{newsletterTitle}</h2>
          <div className={styles.signup}>
            <Input
              name="email"
              type="email"
              tone="light"
              label={emailLabel}
              placeholder={emailLabel}
              hideLabel
              ref={emailRef}
              required
              autoComplete="email"
              error={error}
              onChange={() => setError('')}
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
