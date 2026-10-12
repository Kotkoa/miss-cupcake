import { describe, expect, it } from 'vitest'
import { UNIT_PRICE_CENTS } from '../../data/cupcakes'
import { formatPrice } from './price'

describe('formatPrice', () => {
  it('formats integer cents as US dollars', () => {
    expect(formatPrice(349)).toBe('$3.49')
    expect(formatPrice(1047)).toBe('$10.47')
    expect(formatPrice(0)).toBe('$0.00')
    expect(formatPrice(123456)).toBe('$1,234.56')
  })

  it('reproduces the Figma totals from the unit price', () => {
    expect(formatPrice(3 * UNIT_PRICE_CENTS)).toBe('$10.47')
    expect(formatPrice(8 * UNIT_PRICE_CENTS)).toBe('$27.92')
  })
})
