import { emptyValues } from './validation'
import type { CheckoutValues } from './validation'

export const CHECKOUT_STORAGE_KEY = 'miss-cupcake:checkout'

const savedFields = [
  'firstName',
  'lastName',
  'email',
  'street',
  'city',
  'postcode',
  'entrance',
  'recipient',
  'phone',
] as const

type Delivery = 'regular' | 'birthday' | 'valentine'

export function loadCheckout(): { values: CheckoutValues; delivery: Delivery } {
  const result: { values: CheckoutValues; delivery: Delivery } = {
    values: { ...emptyValues },
    delivery: 'regular',
  }
  try {
    const raw = sessionStorage.getItem(CHECKOUT_STORAGE_KEY)
    if (!raw) return result
    const saved: unknown = JSON.parse(raw)
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return result
    const data = saved as Record<string, unknown>
    if (data.delivery === 'regular' || data.delivery === 'birthday' || data.delivery === 'valentine') {
      result.delivery = data.delivery
    }
    if (data.values && typeof data.values === 'object' && !Array.isArray(data.values)) {
      const values = data.values as Record<string, unknown>
      for (const field of savedFields) {
        if (typeof values[field] === 'string') result.values[field] = values[field]
      }
    }
  } catch {
    // Storage can be blocked, unavailable or contain damaged JSON.
  }
  return result
}

export function saveCheckout(values: CheckoutValues, delivery: Delivery): void {
  try {
    const savedValues = {} as Pick<CheckoutValues, typeof savedFields[number]>
    for (const field of savedFields) savedValues[field] = values[field]
    sessionStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify({ values: savedValues, delivery }))
  } catch {
    // Keep checkout usable when storage is blocked or its quota is exhausted.
  }
}

export function clearCheckout(): void {
  try {
    sessionStorage.removeItem(CHECKOUT_STORAGE_KEY)
  } catch {
    // Completing an order must not depend on storage availability.
  }
}
