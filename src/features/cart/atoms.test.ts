import { createStore } from 'jotai'
import { describe, expect, it } from 'vitest'
import { MAX_LINE_QTY } from './cart'
import { addToCartAtom, cartCountAtom, cartItemsAtom, cartLinesAtom, cartSubtotalAtom, clearCartAtom, removeFromCartAtom, setQtyAtom } from './atoms'

/** The Figma scenario: Carrot x1, Red Velvet x3, Mint Chip x2, Pink strawberry x2. */
function fillFigmaCart(store: ReturnType<typeof createStore>) {
  store.set(addToCartAtom, { id: 'carrot', qty: 1 })
  store.set(addToCartAtom, { id: 'red-velvet', qty: 3 })
  store.set(addToCartAtom, { id: 'mint-chip', qty: 2 })
  store.set(addToCartAtom, { id: 'pink-strawberry', qty: 2 })
}

describe('cart atoms', () => {
  it('counts pieces and totals cents for the Figma scenario', () => {
    const store = createStore()
    fillFigmaCart(store)
    expect(store.get(cartCountAtom)).toBe(8)
    expect(store.get(cartSubtotalAtom)).toBe(2792)
  })

  it('joins lines with the catalogue and prices each line', () => {
    const store = createStore()
    fillFigmaCart(store)
    const lines = store.get(cartLinesAtom)
    expect(lines.map((line) => [line.name, line.qty, line.totalCents])).toEqual([
      ['Carrot', 1, 349],
      ['Red Velvet', 3, 1047],
      ['Mint Chip', 2, 698],
      ['Pink strawberry', 2, 698],
    ])
  })

  it('merges repeated adds into one line', () => {
    const store = createStore()
    store.set(addToCartAtom, { id: 'carrot', qty: 1 })
    store.set(addToCartAtom, { id: 'carrot', qty: 2 })
    expect(store.get(cartItemsAtom)).toEqual([{ id: 'carrot', qty: 3 }])
  })

  it('never lets a line go above the maximum', () => {
    const store = createStore()
    store.set(addToCartAtom, { id: 'carrot', qty: MAX_LINE_QTY })
    store.set(addToCartAtom, { id: 'carrot', qty: 1 })
    store.set(setQtyAtom, { id: 'carrot', qty: MAX_LINE_QTY + 1 })
    expect(store.get(cartItemsAtom)).toEqual([{ id: 'carrot', qty: MAX_LINE_QTY }])
  })

  it('ignores ids that are not in the catalogue', () => {
    const store = createStore()
    store.set(addToCartAtom, { id: 'unicorn', qty: 1 })
    expect(store.get(cartCountAtom)).toBe(0)
  })

  it('removes a line when its quantity is set to 0, or when it is removed', () => {
    const store = createStore()
    fillFigmaCart(store)
    store.set(setQtyAtom, { id: 'red-velvet', qty: 0 })
    expect(store.get(cartCountAtom)).toBe(5)
    store.set(removeFromCartAtom, 'carrot')
    expect(store.get(cartItemsAtom).map((item) => item.id)).toEqual(['mint-chip', 'pink-strawberry'])
  })

  it('clears the cart', () => {
    const store = createStore()
    fillFigmaCart(store)
    store.set(clearCartAtom)
    expect(store.get(cartCountAtom)).toBe(0)
    expect(store.get(cartSubtotalAtom)).toBe(0)
  })

  it('keeps separate stores independent', () => {
    const a = createStore()
    const b = createStore()
    a.set(addToCartAtom, { id: 'carrot', qty: 1 })
    expect(b.get(cartCountAtom)).toBe(0)
  })
})
