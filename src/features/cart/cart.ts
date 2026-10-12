/** Pure cart logic: no React, no storage, so it can be tested on its own. */

/** What is stored: names and prices are looked up from the catalogue, never saved. */
export type CartItem = { id: string; qty: number }

/** Adds `qty` of a product; a non-positive or fractional `qty` changes nothing. */
export function addItem(items: CartItem[], id: string, qty: number): CartItem[] {
  if (!isValidQty(qty)) return items
  const existing = items.find((item) => item.id === id)
  if (!existing) return [...items, { id, qty }]
  return items.map((item) => (item.id === id ? { id, qty: item.qty + qty } : item))
}

/** Sets the quantity of a line; 0 (or less) removes it. Unknown lines are not created. */
export function setItemQty(items: CartItem[], id: string, qty: number): CartItem[] {
  if (!Number.isInteger(qty)) return items
  if (qty <= 0) return removeItem(items, id)
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
  return typeof qty === 'number' && Number.isInteger(qty) && qty > 0
}

/**
 * Makes stored data safe: anything that is not an array of `{ id, qty }` gives an empty cart; lines
 * with an unknown id or a non-positive / non-integer qty are dropped; repeated ids are merged.
 * Returns the same array when nothing had to change, so React sees no new value.
 */
export function sanitizeItems(raw: unknown, isKnownId: (id: string) => boolean): CartItem[] {
  if (!Array.isArray(raw)) return []
  const clean: CartItem[] = []
  for (const entry of raw) {
    if (typeof entry !== 'object' || entry === null) continue
    const { id, qty } = entry as Record<string, unknown>
    if (typeof id !== 'string' || !isKnownId(id) || !isValidQty(qty)) continue
    const existing = clean.find((item) => item.id === id)
    if (existing) existing.qty += qty
    else clean.push({ id, qty })
  }
  const unchanged =
    clean.length === raw.length && clean.every((item, index) => raw[index]?.id === item.id && raw[index]?.qty === item.qty)
  return unchanged ? (raw as CartItem[]) : clean
}
