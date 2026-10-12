import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { cupcakes, UNIT_PRICE_CENTS } from '../../data/cupcakes'
import { addItem, countItems, removeItem, setItemQty } from './cart'
import type { CartItem } from './cart'
import { createCartStorage } from './storage'

export const CART_STORAGE_KEY = 'miss-cupcake:cart'

const catalogue = new Map(cupcakes.map((cupcake) => [cupcake.id, cupcake]))

/** Persisted `{ id, qty }` lines. `getOnInit` reads storage on the first render: no empty badge flash. */
export const cartItemsAtom = atomWithStorage<CartItem[]>(
  CART_STORAGE_KEY,
  [],
  createCartStorage((id) => catalogue.has(id)),
  { getOnInit: true },
)

export type CartLine = {
  id: string
  name: string
  image: string
  qty: number
  unitCents: number
  totalCents: number
}

/** Stored lines joined with the catalogue (name, picture, price). */
export const cartLinesAtom = atom<CartLine[]>((get) =>
  get(cartItemsAtom).flatMap(({ id, qty }) => {
    const cupcake = catalogue.get(id)
    if (!cupcake) return []
    return [
      {
        id,
        name: cupcake.name,
        image: cupcake.image.src,
        qty,
        unitCents: UNIT_PRICE_CENTS,
        totalCents: qty * UNIT_PRICE_CENTS,
      },
    ]
  }),
)

export const cartCountAtom = atom((get) => countItems(get(cartItemsAtom)))

export const cartSubtotalAtom = atom((get) => get(cartLinesAtom).reduce((sum, line) => sum + line.totalCents, 0))

export const addToCartAtom = atom(null, (get, set, { id, qty }: { id: string; qty: number }) => {
  if (!catalogue.has(id)) return
  set(cartItemsAtom, addItem(get(cartItemsAtom), id, qty))
})

export const setQtyAtom = atom(null, (get, set, { id, qty }: { id: string; qty: number }) => {
  set(cartItemsAtom, setItemQty(get(cartItemsAtom), id, qty))
})

export const removeFromCartAtom = atom(null, (get, set, id: string) => {
  set(cartItemsAtom, removeItem(get(cartItemsAtom), id))
})

export const clearCartAtom = atom(null, (_get, set) => {
  set(cartItemsAtom, [])
})
