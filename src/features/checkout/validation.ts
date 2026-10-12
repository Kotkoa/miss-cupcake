export type FieldName =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'passcode'
  | 'street'
  | 'city'
  | 'postcode'
  | 'entrance'
  | 'recipient'
  | 'phone'
  | 'cardNumber'
  | 'expiryMonth'
  | 'expiryYear'
  | 'cardHolder'
  | 'cvv'

export type CheckoutValues = Record<FieldName, string>

export const emptyValues: CheckoutValues = {
  firstName: '',
  lastName: '',
  email: '',
  passcode: '',
  street: '',
  city: '',
  postcode: '',
  entrance: '',
  recipient: '',
  phone: '',
  cardNumber: '',
  expiryMonth: '',
  expiryYear: '',
  cardHolder: '',
  cvv: '',
}

const ukPostcode = /^(?:GIR ?0AA|(?:[A-PR-UWYZ][0-9]{1,2}|[A-PR-UWYZ][A-HK-Y][0-9]{1,2}|[A-PR-UWYZ][0-9][A-HJKPSTUW]|[A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]) ?[0-9][ABD-HJLNP-UW-Z]{2})$/i
const expiryMonthPattern = /^(?:0[1-9]|1[0-2])$/
const expiryYearPattern = /^[0-9]{4}$/
const emailPattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i

function passesLuhn(digits: string): boolean {
  let total = 0
  let double = false
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index])
    if (double) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    total += digit
    double = !double
  }
  return total % 10 === 0
}

function expiryIsPast(values: CheckoutValues, now: Date): boolean {
  const month = values.expiryMonth.trim()
  const year = values.expiryYear.trim()
  if (!expiryMonthPattern.test(month) || !expiryYearPattern.test(year)) return false
  return Number(year) < now.getFullYear()
    || (Number(year) === now.getFullYear() && Number(month) < now.getMonth() + 1)
}

export function validateField(field: FieldName, values: CheckoutValues, now = new Date()): string {
  const value = values[field].trim()
  if (field === 'entrance') {
    return values.entrance.length <= 10 ? '' : 'Entrance must be 10 characters or fewer.'
  }
  if (!value) return 'This field is required.'

  switch (field) {
    case 'firstName':
    case 'lastName':
    case 'recipient':
    case 'cardHolder': {
      const name = value.normalize('NFC')
      const length = Array.from(name).length
      return length >= 2 && length <= 50 && /^[\p{L} '-]+$/u.test(name) && /\p{L}/u.test(name)
        ? ''
        : 'Enter a name of 2–50 letters, spaces, apostrophes or hyphens.'
    }
    case 'email':
      return emailPattern.test(value) ? '' : 'Enter a valid email address.'
    case 'passcode':
      return values.passcode.length >= 10 ? '' : 'Passcode must be 10 or more characters.'
    case 'street':
    case 'city':
      return ''
    case 'postcode':
      return ukPostcode.test(value) ? '' : 'Enter a valid UK postcode.'
    case 'phone': {
      const digits = values.phone.replace(/ /g, '').replace(/^\+/, '')
      return /^\+?[0-9 ]+$/.test(values.phone) && digits.length >= 7 && digits.length <= 15
        ? ''
        : 'Enter 7–15 digits, with an optional leading + and spaces.'
    }
    case 'cardNumber': {
      const digits = values.cardNumber.replace(/ /g, '')
      return /^[0-9 ]+$/.test(values.cardNumber) && digits.length >= 13 && digits.length <= 19 && passesLuhn(digits)
        ? ''
        : 'Enter a valid credit card number.'
    }
    case 'expiryMonth':
      if (!expiryMonthPattern.test(value)) return 'Enter a month from 01 to 12.'
      return expiryIsPast(values, now) ? 'The expiration date must not be in the past.' : ''
    case 'expiryYear':
      if (!expiryYearPattern.test(value) || Number(value) < now.getFullYear() || Number(value) > now.getFullYear() + 15) {
        return 'Enter a year from the current year to 15 years ahead.'
      }
      return expiryIsPast(values, now) ? 'The expiration date must not be in the past.' : ''
    case 'cvv':
      return /^[0-9]{3,4}$/.test(value) ? '' : 'Enter a 3–4 digit CVV.'
  }
}

export function validateForm(values: CheckoutValues, now = new Date()): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {}
  for (const field of Object.keys(emptyValues) as FieldName[]) {
    const error = validateField(field, values, now)
    if (error) errors[field] = error
  }
  return errors
}
