import { createJSONStorage } from 'jotai/utils'
import { sanitizeItems } from './cart'
import type { CartItem } from './cart'

/** The part of `localStorage` the cart uses (and that a test can fake). */
type StringStorage = {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
  subscribe?: (key: string, callback: (value: string | null) => void) => (() => void) | undefined
}

/**
 * localStorage as JSON, with the stored value cleaned on every read (first render, mount and the
 * `storage` event from another tab), so damaged or edited data can never reach the app.
 * `getStringStorage` is a parameter only so tests can pass a fake.
 */
export function createCartStorage(
  isKnownId: (id: string) => boolean,
  getStringStorage?: () => StringStorage,
) {
  const base = getStringStorage ? createJSONStorage<unknown>(getStringStorage) : createJSONStorage<unknown>()
  return {
    getItem: (key: string, initialValue: CartItem[]) => sanitizeItems(base.getItem(key, initialValue), isKnownId),
    setItem: (key: string, value: CartItem[]) => base.setItem(key, sanitizeItems(value, isKnownId)),
    removeItem: (key: string) => base.removeItem(key),
    subscribe: base.subscribe
      ? (key: string, callback: (value: CartItem[]) => void, initialValue: CartItem[]) =>
          base.subscribe?.(key, (value) => callback(sanitizeItems(value, isKnownId)), initialValue)
      : undefined,
  }
}
