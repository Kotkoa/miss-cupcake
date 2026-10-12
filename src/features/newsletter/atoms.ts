import { atom } from 'jotai'
import { validateEmail } from '../checkout/validation'
import { saveSubscribed } from './storage'

/** Whether the "registered" notice is showing. In memory on purpose: it shows once per signup, never after a reload. */
export const newsletterNoticeAtom = atom(false)

/** Validates the email. Returns the error text, or '' after it recorded the signup and turned the notice on. */
export const subscribeAtom = atom(null, (_get, set, email: string): string => {
  const error = validateEmail(email)
  if (error) return error
  saveSubscribed()
  set(newsletterNoticeAtom, true)
  return ''
})

export const dismissNewsletterNoticeAtom = atom(null, (_get, set) => {
  set(newsletterNoticeAtom, false)
})
