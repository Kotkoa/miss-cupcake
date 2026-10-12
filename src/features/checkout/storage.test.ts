import { afterEach, describe, expect, it, vi } from 'vitest'
import { CHECKOUT_STORAGE_KEY, clearCheckout, loadCheckout, saveCheckout } from './storage'
import { emptyValues } from './validation'
import type { CheckoutValues } from './validation'

function fakeStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial))
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    removeItem: (key: string) => void data.delete(key),
  }
}

const values: CheckoutValues = {
  firstName: 'Élodie',
  lastName: "O'Neill",
  email: 'elodie@example.com',
  passcode: 'private-passcode',
  street: '12 Cupcake Lane',
  city: 'London',
  postcode: 'WC1N 3PJ',
  entrance: '4B',
  recipient: 'Anne-Marie',
  phone: '+44 7700 900123',
  cardNumber: '4242 4242 4242 4242',
  expiryMonth: '10',
  expiryYear: '2026',
  cardHolder: 'Private Card Holder',
  cvv: '123',
}

const savedValues = {
  firstName: values.firstName,
  lastName: values.lastName,
  email: values.email,
  street: values.street,
  city: values.city,
  postcode: values.postcode,
  entrance: values.entrance,
  recipient: values.recipient,
  phone: values.phone,
}

const defaultCheckout = { values: emptyValues, delivery: 'regular' }

afterEach(() => vi.unstubAllGlobals())

describe('checkout session storage', () => {
  it('uses the checkout storage key and only persists the non-sensitive allowlist', () => {
    const storage = fakeStorage()
    vi.stubGlobal('sessionStorage', storage)
    saveCheckout(values, 'birthday')
    const stored: unknown = JSON.parse(storage.getItem(CHECKOUT_STORAGE_KEY) ?? 'null')
    expect(stored).toEqual({ values: savedValues, delivery: 'birthday' })
  })

  it.each(['regular', 'birthday', 'valentine'] as const)('restores saved fields and %s delivery without sensitive data', (delivery) => {
    vi.stubGlobal('sessionStorage', fakeStorage())
    saveCheckout(values, delivery)
    expect(loadCheckout()).toEqual({ values: { ...emptyValues, ...savedValues }, delivery })
  })

  it('does not restore sensitive or unknown fields even if they exist in saved JSON', () => {
    const storage = fakeStorage({
      [CHECKOUT_STORAGE_KEY]: JSON.stringify({ values: { ...values, unknown: 'extra' }, delivery: 'valentine' }),
    })
    vi.stubGlobal('sessionStorage', storage)
    expect(loadCheckout()).toEqual({ values: { ...emptyValues, ...savedValues }, delivery: 'valentine' })
  })

  it('does not save unknown fields supplied on the values object', () => {
    const storage = fakeStorage()
    vi.stubGlobal('sessionStorage', storage)
    saveCheckout({ ...values, unknown: 'extra' } as CheckoutValues, 'regular')
    expect(JSON.parse(storage.getItem(CHECKOUT_STORAGE_KEY) ?? 'null')).toEqual({ values: savedValues, delivery: 'regular' })
  })

  it('returns fresh empty values when the storage key is missing', () => {
    vi.stubGlobal('sessionStorage', fakeStorage())
    const first = loadCheckout()
    const second = loadCheckout()
    expect(first).toEqual(defaultCheckout)
    expect(first.values).not.toBe(emptyValues)
    expect(first.values).not.toBe(second.values)
    first.values.firstName = 'Changed'
    expect(second.values.firstName).toBe('')
    expect(emptyValues.firstName).toBe('')
  })

  it.each(['{broken', '', 'null', 'false', '123', '"text"', '[]'])('tolerates corrupt or unexpected root data: %s', (raw) => {
    vi.stubGlobal('sessionStorage', fakeStorage({ [CHECKOUT_STORAGE_KEY]: raw }))
    expect(loadCheckout()).toEqual(defaultCheckout)
  })

  it('keeps valid string fields and discards non-string field values', () => {
    vi.stubGlobal('sessionStorage', fakeStorage({
      [CHECKOUT_STORAGE_KEY]: JSON.stringify({
        values: { firstName: 'Anne', lastName: 123, email: null, street: {}, city: [], phone: true },
        delivery: 'birthday',
      }),
    }))
    expect(loadCheckout()).toEqual({ values: { ...emptyValues, firstName: 'Anne' }, delivery: 'birthday' })
  })

  it.each([null, 123, 'text', [], ['Anne']])('rejects a malformed values object without losing delivery: %j', (saved) => {
    vi.stubGlobal('sessionStorage', fakeStorage({
      [CHECKOUT_STORAGE_KEY]: JSON.stringify({ values: saved, delivery: 'birthday' }),
    }))
    expect(loadCheckout()).toEqual({ values: emptyValues, delivery: 'birthday' })
  })

  it.each(['other', '', null, 123, true, {}])('defaults an invalid delivery to regular: %j', (delivery) => {
    vi.stubGlobal('sessionStorage', fakeStorage({
      [CHECKOUT_STORAGE_KEY]: JSON.stringify({ values: savedValues, delivery }),
    }))
    expect(loadCheckout()).toEqual({ values: { ...emptyValues, ...savedValues }, delivery: 'regular' })
  })

  it('clears only checkout data and leaves unrelated storage entries intact', () => {
    const storage = fakeStorage({ 'miss-cupcake:cart': '[{"id":"carrot","qty":1}]' })
    vi.stubGlobal('sessionStorage', storage)
    saveCheckout(values, 'birthday')
    clearCheckout()
    expect(storage.getItem(CHECKOUT_STORAGE_KEY)).toBeNull()
    expect(storage.getItem('miss-cupcake:cart')).toBe('[{"id":"carrot","qty":1}]')
    expect(loadCheckout()).toEqual(defaultCheckout)
  })

  it('returns an empty checkout when sessionStorage is unavailable', () => {
    vi.stubGlobal('sessionStorage', undefined)
    expect(loadCheckout()).toEqual(defaultCheckout)
  })

  it('tolerates browser security errors when accessing the storage getter', () => {
    vi.stubGlobal('sessionStorage', undefined)
    Object.defineProperty(globalThis, 'sessionStorage', {
      configurable: true,
      get() { throw new Error('Access denied') },
    })
    expect(loadCheckout()).toEqual(defaultCheckout)
  })

  it('tolerates failed storage operations, including quota errors', () => {
    vi.stubGlobal('sessionStorage', {
      getItem() { throw new Error('Read blocked') },
      setItem() { throw new Error('Quota exceeded') },
      removeItem() { throw new Error('Removal blocked') },
    })
    expect(loadCheckout()).toEqual(defaultCheckout)
  })
})
