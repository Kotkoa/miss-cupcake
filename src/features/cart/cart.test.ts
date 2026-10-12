import { describe, expect, it } from 'vitest'
import { addItem, countItems, removeItem, sanitizeItems, setItemQty } from './cart'

const known = (id: string) => ['carrot', 'mint-chip'].includes(id)

describe('addItem', () => {
  it('adds a new line and merges into an existing one', () => {
    const once = addItem([], 'carrot', 1)
    expect(once).toEqual([{ id: 'carrot', qty: 1 }])
    expect(addItem(once, 'carrot', 2)).toEqual([{ id: 'carrot', qty: 3 }])
    expect(addItem(once, 'mint-chip', 2)).toEqual([
      { id: 'carrot', qty: 1 },
      { id: 'mint-chip', qty: 2 },
    ])
  })

  it('ignores zero, negative and fractional quantities', () => {
    const items = [{ id: 'carrot', qty: 1 }]
    expect(addItem(items, 'carrot', 0)).toBe(items)
    expect(addItem(items, 'carrot', -2)).toBe(items)
    expect(addItem(items, 'carrot', 1.5)).toBe(items)
  })

  it('does not change the array it was given', () => {
    const items = [{ id: 'carrot', qty: 1 }]
    addItem(items, 'carrot', 5)
    expect(items).toEqual([{ id: 'carrot', qty: 1 }])
  })
})

describe('setItemQty', () => {
  it('increases and decreases a line', () => {
    const items = [{ id: 'carrot', qty: 2 }]
    expect(setItemQty(items, 'carrot', 3)).toEqual([{ id: 'carrot', qty: 3 }])
    expect(setItemQty(items, 'carrot', 1)).toEqual([{ id: 'carrot', qty: 1 }])
  })

  it('removes the line when decreased to 0', () => {
    expect(setItemQty([{ id: 'carrot', qty: 1 }], 'carrot', 0)).toEqual([])
  })

  it('never creates a line that is not in the cart', () => {
    const items = [{ id: 'carrot', qty: 1 }]
    expect(setItemQty(items, 'mint-chip', 4)).toBe(items)
  })
})

describe('removeItem and countItems', () => {
  it('removes one line and counts all the pieces', () => {
    const items = [
      { id: 'carrot', qty: 1 },
      { id: 'mint-chip', qty: 2 },
    ]
    expect(removeItem(items, 'carrot')).toEqual([{ id: 'mint-chip', qty: 2 }])
    expect(countItems(items)).toBe(3)
    expect(countItems([])).toBe(0)
  })
})

describe('sanitizeItems', () => {
  it('keeps valid data as it is (same array)', () => {
    const items = [{ id: 'carrot', qty: 2 }]
    expect(sanitizeItems(items, known)).toBe(items)
  })

  it('drops unknown ids and bad quantities, merges repeated ids', () => {
    const raw = [
      { id: 'carrot', qty: 1 },
      { id: 'unicorn', qty: 1 },
      { id: 'mint-chip', qty: 0 },
      { id: 'mint-chip', qty: -1 },
      { id: 'mint-chip', qty: 1.5 },
      { id: 'mint-chip', qty: '2' },
      { id: 'carrot', qty: 2 },
      null,
      'carrot',
    ]
    expect(sanitizeItems(raw, known)).toEqual([{ id: 'carrot', qty: 3 }])
  })

  it('gives an empty cart for anything that is not an array', () => {
    for (const raw of [null, undefined, 5, 'x', {}, { id: 'carrot', qty: 1 }]) {
      expect(sanitizeItems(raw, known)).toEqual([])
    }
  })
})
