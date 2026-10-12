import { describe, expect, it } from 'vitest'
import { emptyValues, validateField, validateForm } from './validation'
import type { CheckoutValues, FieldName } from './validation'

const now = new Date(2026, 9, 12, 12)
const validValues: CheckoutValues = {
  firstName: 'Élodie',
  lastName: "O'Neill",
  email: 'elodie+cupcakes@example.co.uk',
  passcode: 'tenletters',
  street: '12 Cupcake Lane',
  city: 'London',
  postcode: 'WC1N 3PJ',
  entrance: '',
  recipient: 'Anne-Marie',
  phone: '+44 7700 900123',
  cardNumber: '4242 4242 4242 4242',
  expiryMonth: '10',
  expiryYear: '2026',
  cardHolder: 'Élodie O Neill',
  cvv: '123',
}

const nameFields: FieldName[] = ['firstName', 'lastName', 'recipient', 'cardHolder']

describe('checkout form validation', () => {

  it('accepts a complete valid form without changing its values', () => {
    const values = { ...validValues }
    expect(validateForm(values, now)).toEqual({})
    expect(values).toEqual(validValues)
  })

  it('requires every field except entrance, including whitespace-only input', () => {
    for (const field of Object.keys(emptyValues) as FieldName[]) {
      for (const value of ['', '   ']) {
        const error = validateField(field, { ...validValues, [field]: value }, now)
        if (field === 'entrance') expect(error).toBe('')
        else expect(error).not.toBe('')
      }
    }
    const errors = validateForm(emptyValues, now)
    expect(Object.keys(errors)).toHaveLength(14)
    expect(errors).not.toHaveProperty('entrance')
  })

  it('returns errors only for invalid fields', () => {
    const values = { ...validValues, email: 'bad', entrance: '12345678901', cvv: '12' }
    const errors = validateForm(values, now)
    expect(Object.keys(errors)).toEqual(['email', 'entrance', 'cvv'])
  })
})

describe('names', () => {
  it('accepts Unicode letters, spaces, apostrophes and hyphens in every name field', () => {
    for (const field of nameFields) {
      for (const value of ['Élodie', 'E\u0301lodie', 'Ирина', '李明', "O'Neill", 'Anne-Marie', 'Mary Jane', 'Al', 'A'.repeat(50)]) {
        expect(validateField(field, { ...validValues, [field]: value }, now)).toBe('')
      }
    }
  })

  it('rejects names outside 2–50 characters and disallowed characters', () => {
    for (const field of nameFields) {
      for (const value of ['A', 'A'.repeat(51), 'Ann3', 'Ann_B', 'Ann.', 'Ann\tLee', 'Ann\nLee', '--', "''"]) {
        expect(validateField(field, { ...validValues, [field]: value }, now)).not.toBe('')
      }
    }
  })
})

describe('email, passcode and address', () => {
  it('accepts usual email addresses and rejects missing or malformed parts', () => {
    for (const email of ['a@example.com', 'first.last+tag@sub.example.co.uk', 'A@EXAMPLE.COM']) {
      expect(validateField('email', { ...validValues, email }, now)).toBe('')
    }
    for (const email of ['a', 'a@', '@example.com', 'a@example', 'a b@example.com', 'a@@example.com', 'a..b@example.com', '.a@example.com', 'a.@example.com', 'a@example..com', 'a@-example.com']) {
      expect(validateField('email', { ...validValues, email }, now)).not.toBe('')
    }
  })

  it('uses the original passcode length and accepts the ten-character boundary', () => {
    expect(validateField('passcode', { ...validValues, passcode: '123456789' }, now)).not.toBe('')
    for (const passcode of ['1234567890', '12345678901', ' 12345678 ']) {
      expect(validateField('passcode', { ...validValues, passcode }, now)).toBe('')
    }
  })

  it('only requires street and city, and limits the optional entrance to ten characters', () => {
    for (const field of ['street', 'city'] as const) {
      expect(validateField(field, { ...validValues, [field]: '1' }, now)).toBe('')
    }
    expect(validateField('entrance', { ...validValues, entrance: '1234567890' }, now)).toBe('')
    expect(validateField('entrance', { ...validValues, entrance: '12345678901' }, now)).not.toBe('')
    expect(validateField('entrance', { ...validValues, entrance: '1234567890 ' }, now)).not.toBe('')
  })
})

describe('UK postcodes', () => {
  it.each(['WC1N 3PJ', 'wc1n 3pj', 'WC1N3PJ', 'GIR 0AA', 'gir0aa', 'M1 1AE', 'M60 1NW', 'CR2 6XH', 'DN55 1PT', 'W1A 1HQ', 'EC1A 1BB'])('accepts %s', (postcode) => {
    expect(validateField('postcode', { ...validValues, postcode }, now)).toBe('')
  })

  it.each(['12345', 'ZZ1 1ZZ', 'Q1 1AA', 'AI1 1AA', 'W1I 1AA', 'EC1C 1AA', 'M1 1CI', 'GIR 1AA', 'WC1N  3PJ', 'WC1N-3PJ', 'WC1N\t3PJ'])('rejects %s', (postcode) => {
    expect(validateField('postcode', { ...validValues, postcode }, now)).not.toBe('')
  })
})

describe('phone numbers', () => {
  it.each(['1234567', '123456789012345', '+1234567', '+44 7700 900123', '123 4567'])('accepts %s', (phone) => {
    expect(validateField('phone', { ...validValues, phone }, now)).toBe('')
  })

  it.each(['123456', '1234567890123456', '+1234567890123456', '+', '++1234567', '123+4567', '(123) 4567', '123-4567', '123\t4567', '123\n4567', 'abcdefg', '１２３４５６７'])('rejects %s', (phone) => {
    expect(validateField('phone', { ...validValues, phone }, now)).not.toBe('')
  })
})

describe('card number and CVV', () => {
  it.each(['4242424242424242', '4242 4242 4242 4242', '4222222222222', '378282246310005', '4000000000000000006'])('accepts a Luhn-valid 13–19 digit number: %s', (cardNumber) => {
    expect(validateField('cardNumber', { ...validValues, cardNumber }, now)).toBe('')
  })

  it.each(['4242424242424241', '0'.repeat(12), '0'.repeat(20), '4242-4242-4242-4242', '+4242424242424242', '4242\t424242424242', '4242 4242 4242 abc2'])('rejects bad length, syntax or Luhn checksum: %s', (cardNumber) => {
    expect(validateField('cardNumber', { ...validValues, cardNumber }, now)).not.toBe('')
  })

  it('requires exactly three or four CVV digits', () => {
    for (const cvv of ['000', '123', '1234']) {
      expect(validateField('cvv', { ...validValues, cvv }, now)).toBe('')
    }
    for (const cvv of ['12', '12345', '12a', '1 23', '+123', '１２３']) {
      expect(validateField('cvv', { ...validValues, cvv }, now)).not.toBe('')
    }
  })
})

describe('expiration date', () => {
  it('accepts the current month through the last month of the +15 year boundary', () => {
    for (const [expiryMonth, expiryYear] of [['10', '2026'], ['11', '2026'], ['01', '2027'], ['12', '2041']]) {
      const values = { ...validValues, expiryMonth, expiryYear }
      expect(validateField('expiryMonth', values, now)).toBe('')
      expect(validateField('expiryYear', values, now)).toBe('')
    }
  })

  it('rejects previous months and previous years, but not the current month on its last day', () => {
    for (const [expiryMonth, expiryYear] of [['09', '2026'], ['12', '2025']]) {
      const values = { ...validValues, expiryMonth, expiryYear }
      expect(validateField('expiryMonth', values, now)).not.toBe('')
      expect(validateField('expiryYear', values, now)).not.toBe('')
    }
    expect(validateForm(validValues, new Date(2026, 9, 31, 23, 59))).toEqual({})
  })

  it('enforces two-digit months and four-digit years through +15 inclusive', () => {
    for (const expiryMonth of ['00', '13', '1', '001', '1a', '1.0']) {
      expect(validateField('expiryMonth', { ...validValues, expiryMonth }, now)).not.toBe('')
    }
    for (const expiryYear of ['2025', '2042', '26', '02026', '20a6', '2026.0']) {
      expect(validateField('expiryYear', { ...validValues, expiryYear }, now)).not.toBe('')
    }
  })

  it('handles December-to-January rollover using the supplied local date', () => {
    const december = new Date(2026, 11, 31, 23, 59)
    const january = new Date(2027, 0, 1)
    const values = { ...validValues, expiryMonth: '12', expiryYear: '2026' }
    expect(validateForm(values, december)).toEqual({})
    expect(validateForm(values, january)).toHaveProperty('expiryYear')
    expect(validateForm({ ...values, expiryMonth: '01', expiryYear: '2027' }, january)).toEqual({})
  })

  it('does not blame a valid date part for a missing or malformed counterpart', () => {
    expect(validateField('expiryMonth', { ...validValues, expiryYear: '' }, now)).toBe('')
    expect(validateField('expiryYear', { ...validValues, expiryMonth: '' }, now)).toBe('')
    expect(validateField('expiryMonth', { ...validValues, expiryYear: 'bad' }, now)).toBe('')
    expect(validateField('expiryYear', { ...validValues, expiryMonth: 'bad' }, now)).toBe('')
  })
})
