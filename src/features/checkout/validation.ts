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
export type FieldErrors = Partial<Record<FieldName, string>>

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

/** What to do when a field is empty: says how to fix it instead of only saying "required". */
const emptyMessages: Record<FieldName, string> = {
  firstName: 'Enter your first name.',
  lastName: 'Enter your last name.',
  email: 'Enter your email address.',
  passcode: 'Enter a passcode of 10 or more characters.',
  street: 'Enter your street.',
  city: 'Enter your city.',
  postcode: 'Enter your postcode.',
  entrance: '',
  recipient: "Enter the recipient's name.",
  phone: 'Enter a phone number.',
  cardNumber: 'Enter your card number.',
  expiryMonth: 'Enter the expiration month (MM).',
  expiryYear: 'Enter the expiration year (YYYY).',
  cardHolder: 'Enter the name on the card.',
  cvv: 'Enter the 3 or 4 digit CVV.',
}

/** The one email rule: Payment (through `validateField`) and the footer signup both use it. */
export function validateEmail(email: string): string {
  const value = email.trim()
  if (!value) return emptyMessages.email
  return emailPattern.test(value) ? '' : 'Enter an email address like name@example.com.'
}

export function validateField(field: FieldName, values: CheckoutValues, now = new Date()): string {
  const value = values[field].trim()
  if (field === 'entrance') {
    return values.entrance.length <= 10 ? '' : 'Use 10 characters or fewer.'
  }
  if (!value) return emptyMessages[field]

  switch (field) {
    case 'firstName':
    case 'lastName':
    case 'recipient':
    case 'cardHolder': {
      const name = value.normalize('NFC')
      const length = Array.from(name).length
      return length >= 2 && length <= 50 && /^[\p{L} '-]+$/u.test(name) && /\p{L}/u.test(name)
        ? ''
        : 'Use 2–50 letters. Spaces, apostrophes and hyphens are allowed.'
    }
    case 'email':
      return validateEmail(value)
    case 'passcode':
      return values.passcode.length >= 10 ? '' : 'Use 10 or more characters.'
    case 'street':
    case 'city':
      return ''
    case 'postcode':
      return ukPostcode.test(value) ? '' : 'Enter a UK postcode, like WC1N 3PJ.'
    case 'phone': {
      const digits = values.phone.replace(/ /g, '').replace(/^\+/, '')
      return /^\+?[0-9 ]+$/.test(values.phone) && digits.length >= 7 && digits.length <= 15
        ? ''
        : 'Use 7–15 digits. A leading + and spaces are allowed.'
    }
    case 'cardNumber': {
      const digits = values.cardNumber.replace(/ /g, '')
      return /^[0-9 ]+$/.test(values.cardNumber) && digits.length >= 13 && digits.length <= 19 && passesLuhn(digits)
        ? ''
        : 'Check the card number: it has 13–19 digits.'
    }
    case 'expiryMonth':
      if (!expiryMonthPattern.test(value)) return 'Use a month from 01 to 12.'
      return expiryIsPast(values, now) ? 'Use a date that is not in the past.' : ''
    case 'expiryYear':
      if (!expiryYearPattern.test(value) || Number(value) < now.getFullYear() || Number(value) > now.getFullYear() + 15) {
        return `Use a year from ${now.getFullYear()} to ${now.getFullYear() + 15}.`
      }
      return expiryIsPast(values, now) ? 'Use a date that is not in the past.' : ''
    case 'cvv':
      return /^[0-9]{3,4}$/.test(value) ? '' : 'Use the 3 or 4 digits from the card.'
  }
}

export function validateForm(values: CheckoutValues, now = new Date()): FieldErrors {
  const errors: FieldErrors = {}
  for (const field of Object.keys(emptyValues) as FieldName[]) {
    const error = validateField(field, values, now)
    if (error) errors[field] = error
  }
  return errors
}

/** The expiration month and year judge each other (a past date), so they are checked together. */
const linkedFields: Partial<Record<FieldName, FieldName[]>> = {
  expiryMonth: ['expiryMonth', 'expiryYear'],
  expiryYear: ['expiryMonth', 'expiryYear'],
}

/**
 * After a change: fields that have already shown an error are checked again right away, so the error
 * goes as soon as the value is fixed. Fields that never showed one stay quiet until blur or submit.
 * `shown` is the set of fields that have shown an error at any time.
 */
export function revalidateChanged(
  errors: FieldErrors,
  shown: ReadonlySet<FieldName>,
  changed: FieldName,
  values: CheckoutValues,
  now = new Date(),
): FieldErrors {
  const next = { ...errors }
  for (const field of linkedFields[changed] ?? [changed]) {
    if (shown.has(field)) next[field] = validateField(field, values, now)
  }
  return next
}

/** Text for the live region above the submit button; '' when nothing needs attention. */
export function attentionMessage(errors: FieldErrors): string {
  const count = Object.values(errors).filter(Boolean).length
  if (count === 0) return ''
  return count === 1 ? '1 field needs attention' : `${count} fields need attention`
}
