import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { appHref } from '../../routing/appHref'
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
  /** The email rule, run on blur and, once an error has shown, on every change. Returns the error text or ''. */
  validate: (email: string) => string
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
  validate,
  legalLinks,
  copyright,
}: FooterProps) {
  const [primaryLink, ...otherLinks] = navLinks

  const [error, setError] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)
  // Once the field has shown an error it is checked on every change, also after the error went away.
  const errorShown = useRef(false)

  function showError(message: string) {
    setError(message)
    if (message) errorShown.current = true
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const message = onSubmit(emailRef.current?.value ?? '')
    showError(message)
    if (message) {
      emailRef.current?.focus() // the "send" button took focus: put it back in the field
      return
    }
    errorShown.current = false
    // Blur first: leaving an empty field later would otherwise validate it and flag the signup that just worked.
    emailRef.current?.blur()
    event.currentTarget.reset()
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
              onChange={(event) => {
                if (errorShown.current) showError(validate(event.currentTarget.value))
              }}
              onBlur={(event) => showError(validate(event.currentTarget.value))}
              className={styles.email}
            />
            <Button type="submit" variant="light" className={styles.send}>
              {submitLabel}
            </Button>
          </div>
        </form>

        <nav className={styles.nav} aria-label="Footer">
          {primaryLink ? (
            <a className={styles.title} href={appHref(primaryLink.href)}>
              {primaryLink.label}
            </a>
          ) : null}
          <ul className={styles.links}>
            {otherLinks.map((link) => (
              <li key={link.href}>
                <a className={styles.link} href={appHref(link.href)}>
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
              <a className={styles.link} href={appHref(link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
