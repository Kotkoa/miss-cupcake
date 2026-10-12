import { createStore } from 'jotai'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { validateEmail } from '../checkout/validation'
import { dismissNewsletterNoticeAtom, newsletterNoticeAtom, subscribeAtom } from './atoms'
import { NEWSLETTER_STORAGE_KEY } from './storage'

function stubLocalStorage() {
  const data = new Map<string, string>()
  vi.stubGlobal('localStorage', { setItem: (key: string, value: string) => void data.set(key, value) })
  return data
}

afterEach(() => vi.unstubAllGlobals())

describe('newsletter signup', () => {
  it('rejects an invalid email with the shared rule: no notice, nothing stored', () => {
    const data = stubLocalStorage()
    const store = createStore()
    expect(store.set(subscribeAtom, '')).toBe('Enter your email address.')
    for (const email of ['nope', 'a@example']) {
      expect(store.set(subscribeAtom, email)).toBe('Enter an email address like name@example.com.')
      expect(store.set(subscribeAtom, email)).toBe(validateEmail(email))
    }
    expect(store.get(newsletterNoticeAtom)).toBe(false)
    expect(data.size).toBe(0)
  })

  it('stores only the subscribed flag, never the email, and shows the notice', () => {
    const data = stubLocalStorage()
    const store = createStore()
    expect(store.set(subscribeAtom, 'josh@example.com')).toBe('')
    expect(store.get(newsletterNoticeAtom)).toBe(true)
    expect([...data]).toEqual([[NEWSLETTER_STORAGE_KEY, '{"subscribed":true}']])
  })

  it('shows the notice again after a new signup once it was dismissed', () => {
    stubLocalStorage()
    const store = createStore()
    store.set(subscribeAtom, 'josh@example.com')
    store.set(dismissNewsletterNoticeAtom)
    expect(store.get(newsletterNoticeAtom)).toBe(false)
    store.set(subscribeAtom, 'josh@example.com')
    expect(store.get(newsletterNoticeAtom)).toBe(true)
  })

  it('still signs up when storage is blocked', () => {
    vi.stubGlobal('localStorage', { setItem: () => { throw new Error('blocked') } })
    const store = createStore()
    expect(store.set(subscribeAtom, 'josh@example.com')).toBe('')
    expect(store.get(newsletterNoticeAtom)).toBe(true)
  })
})
