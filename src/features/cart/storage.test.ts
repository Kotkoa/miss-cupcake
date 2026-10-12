import { describe, expect, it } from 'vitest'
import { createCartStorage } from './storage'

/** A string storage like localStorage, with optional change listeners for the `storage` event. */
function fakeStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial))
  const listeners = new Set<(key: string, value: string | null) => void>()
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    removeItem: (key: string) => void data.delete(key),
    subscribe: (key: string, callback: (value: string | null) => void) => {
      const listener = (changed: string, value: string | null) => changed === key && callback(value)
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    emit: (key: string, value: string | null) => listeners.forEach((listener) => listener(key, value)),
  }
}

const known = (id: string) => id === 'carrot' || id === 'mint-chip'
const KEY = 'miss-cupcake:cart'

describe('cart storage', () => {
  it('reads a saved cart', () => {
    const raw = fakeStorage({ [KEY]: JSON.stringify([{ id: 'carrot', qty: 2 }]) })
    const storage = createCartStorage(known, () => raw)
    expect(storage.getItem(KEY, [])).toEqual([{ id: 'carrot', qty: 2 }])
  })

  it('falls back to an empty cart for corrupt JSON or a missing key', () => {
    const corrupt = createCartStorage(known, () => fakeStorage({ [KEY]: '{not json' }))
    expect(corrupt.getItem(KEY, [])).toEqual([])
    const empty = createCartStorage(known, () => fakeStorage())
    expect(empty.getItem(KEY, [])).toEqual([])
  })

  it('drops unknown ids and bad quantities from stored data', () => {
    const raw = fakeStorage({
      [KEY]: JSON.stringify([
        { id: 'carrot', qty: 1 },
        { id: 'unicorn', qty: 4 },
        { id: 'mint-chip', qty: -3 },
      ]),
    })
    expect(createCartStorage(known, () => raw).getItem(KEY, [])).toEqual([{ id: 'carrot', qty: 1 }])
  })

  it('writes only canonical { id, qty } lines', () => {
    const raw = fakeStorage()
    const value = [{ id: 'carrot', qty: 2, name: 'Carrot', price: 349 }]
    createCartStorage(known, () => raw).setItem(KEY, value)
    expect(raw.getItem(KEY)).toBe('[{"id":"carrot","qty":2}]')
  })

  it('cleans values that arrive from another tab', () => {
    const raw = fakeStorage()
    const storage = createCartStorage(known, () => raw)
    const received: unknown[] = []
    storage.subscribe?.(KEY, (value) => received.push(value), [])
    raw.emit(KEY, JSON.stringify([{ id: 'mint-chip', qty: 2 }, { id: 'unicorn', qty: 1 }]))
    raw.emit(KEY, 'garbage')
    expect(received).toEqual([[{ id: 'mint-chip', qty: 2 }], []])
  })
})
