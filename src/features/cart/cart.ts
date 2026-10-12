/** Pure cart logic: no React, no storage, so it can be tested on its own. */

/** What is stored: names and prices are looked up from the catalogue, never saved. */
export type CartItem = { id: string; qty: number }

/** Adds `qty` of a product; invalid or overflowing quantities change nothing. */
export function addItem(items: CartItem[], id: string, qty: number, maxQuantity = Number.MAX_SAFE_INTEGER): CartItem[] {
  if (!isValidQty(qty, maxQuantity)) return items
  const existing = items.find((item) => item.id === id)
  if (!existing) return [...items, { id, qty }]
  const nextQuantity = existing.qty + qty
  if (!isValidQty(nextQuantity, maxQuantity)) return items
  return items.map((item) => (item.id === id ? { id, qty: nextQuantity } : item))
}

/** Sets the quantity of a line; 0 (or less) removes it. Unknown lines are not created. */
export function setItemQty(items: CartItem[], id: string, qty: number, maxQuantity = Number.MAX_SAFE_INTEGER): CartItem[] {
  if (!Number.isInteger(qty)) return items
  if (qty <= 0) return removeItem(items, id)
  if (qty > maxQuantity || !Number.isSafeInteger(qty)) return items
  if (!items.some((item) => item.id === id)) return items
  return items.map((item) => (item.id === id ? { id, qty } : item))
}

export function removeItem(items: CartItem[], id: string): CartItem[] {
  return items.some((item) => item.id === id) ? items.filter((item) => item.id !== id) : items
}

export function countItems(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.qty, 0)
}

function isValidQty(qty: unknown, maxQuantity = Number.MAX_SAFE_INTEGER): qty is number {
  return typeof qty === 'number' && Number.isSafeInteger(qty) && qty > 0 && qty <= maxQuantity
}

/**
 * Makes stored data safe: non-arrays give an empty cart; unknown ids, invalid quantities, and
 * repeated-id sums above the limit are dropped. Canonical items contain only `id` and `qty`.
 * Returns the same array when nothing had to change, so React sees no new value.
 */
export function sanitizeItems(raw: unknown, isKnownId: (id: string) => boolean, maxQuantity = Number.MAX_SAFE_INTEGER): CartItem[] {
  if (!Array.isArray(raw)) return []
  const clean: CartItem[] = []
  for (const entry of raw) {
    if (typeof entry !== 'object' || entry === null) continue
    const { id, qty } = entry as Record<string, unknown>
    if (typeof id !== 'string' || !isKnownId(id) || !isValidQty(qty, maxQuantity)) continue
    const existing = clean.find((item) => item.id === id)
    if (existing) {
      const mergedQuantity = existing.qty + qty
      if (isValidQty(mergedQuantity, maxQuantity)) existing.qty = mergedQuantity
    } else {
      clean.push({ id, qty })
    }
  }
  const unchanged = clean.length === raw.length && clean.every((item, index) => isCanonicalItem(raw[index], item))
  return unchanged ? (raw as CartItem[]) : clean
}

function isCanonicalItem(entry: unknown, item: CartItem): boolean {
  if (typeof entry !== 'object' || entry === null) return false
  const record = entry as Record<string, unknown>
  return Object.keys(record).length === 2 && record.id === item.id && record.qty === item.qty
}
