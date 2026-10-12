import { describe, expect, it } from 'vitest'
import { formatCardNumber } from './cardNumber'

describe('formatCardNumber', () => {
  it('restores the cursor after the separator when Delete removes it', () => {
    expect(formatCardNumber('12345678', 4, 4)).toEqual({
      value: '1234 5678',
      selection: { start: 5, end: 5 },
    })
  })

  it('keeps invalid characters for field validation', () => {
    expect(formatCardNumber('123a', 4, 4)).toBeNull()
  })
})
