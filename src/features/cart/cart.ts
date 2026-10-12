/** Pure cart logic: no React, no storage, so it can be tested on its own. */

/** What is stored: names and prices are looked up from the catalogue, never saved. */
export type CartItem = { id: string; qty: number }

/** The most pieces of one product in the cart; also the stepper's `max`. */
export const MAX_LINE_QTY = 99

/** Adds `qty` of a product; invalid or overflowing quantities change nothing. */
export function addItem(items: CartItem[], id: string, qty: number): CartItem[] {
  if (!isValidQty(qty)) return items
  const existing = items.find((item) => item.id === id)
  if (!existing) return [...items, { id, qty }]
  const nextQuantity = existing.qty + qty
  if (!isValidQty(nextQuantity)) return items
  return items.map((item) => (item.id === id ? { id, qty: nextQuantity } : item))
}

/** Sets the quantity of a line; 0 (or less) removes it. Unknown lines are not created. */
export function setItemQty(items: CartItem[], id: string, qty: number): CartItem[] {
  if (!Number.isInteger(qty)) return items
  if (qty <= 0) return removeItem(items, id)
  if (qty > MAX_LINE_QTY) return items
  if (!items.some((item) => item.id === id)) return items
  return items.map((item) => (item.id === id ? { id, qty } : item))
}

export function removeItem(items: CartItem[], id: string): CartItem[] {
  return items.some((item) => item.id === id) ? items.filter((item) => item.id !== id) : items
}

export function countItems(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.qty, 0)
}

function isValidQty(qty: unknown): qty is number {
  return typeof qty === 'number' && Number.isInteger(qty) && qty > 0 && qty <= MAX_LINE_QTY
}

/**
 * Makes stored data safe: non-arrays give an empty cart; unknown ids, invalid quantities, and
 * repeated-id sums above the limit are dropped. Always returns a new array of `{ id, qty }` only.
 */
export function sanitizeItems(raw: unknown, isKnownId: (id: string) => boolean): CartItem[] {
  if (!Array.isArray(raw)) return []
  const clean: CartItem[] = []
  for (const entry of raw) {
    if (typeof entry !== 'object' || entry === null) continue
    const { id, qty } = entry as Record<string, unknown>
    if (typeof id !== 'string' || !isKnownId(id) || !isValidQty(qty)) continue
    const existing = clean.find((item) => item.id === id)
    if (existing) {
      if (isValidQty(existing.qty + qty)) existing.qty += qty
    } else {
      clean.push({ id, qty })
    }
  }
  return clean
}
