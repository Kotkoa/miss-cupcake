import { describe, expect, it } from 'vitest'
import { errorReducer, initialErrorState } from './errorState'
import type { ErrorAction, ErrorState } from './errorState'
import { emptyValues } from './validation'
import type { CheckoutValues } from './validation'

const run = (state: ErrorState, ...actions: ErrorAction[]) => actions.reduce(errorReducer, state)
const filled = (patch: Partial<CheckoutValues> = {}): CheckoutValues => ({
  ...emptyValues,
  firstName: 'Josh',
  lastName: 'Brown',
  email: 'josh@example.com',
  passcode: 'longenoughpass',
  street: '12 New N St',
  city: 'London',
  postcode: 'WC1N 3PJ',
  recipient: 'Julie Brown',
  phone: '+44 20 7946 0958',
  cardNumber: '4242 4242 4242 4242',
  expiryMonth: '12',
  expiryYear: String(new Date().getFullYear() + 1),
  cardHolder: 'Julie Brown',
  cvv: '123',
  ...patch,
})

describe('errorReducer', () => {
  it('shows nothing before the first blur or submit', () => {
    const state = run(initialErrorState, { type: 'change', name: 'email', values: { ...emptyValues, email: 'x' } })
    expect(state.errors).toEqual({})
    expect(state.attention).toBe('')
  })

  it('keeps the errors of a submit when focus moves to the first invalid field and fires a blur in the same event', () => {
    // Enter pressed in CVV: submit, then the blur of CVV as focus goes to First name.
    const state = run(initialErrorState, { type: 'submit', values: emptyValues }, { type: 'blur', name: 'cvv', values: emptyValues })
    expect(Object.values(state.errors).filter(Boolean)).toHaveLength(14)
    expect(state.attention).toBe('14 fields need attention')
  })

  it('checks a field on every change once it has shown an error, and clears the count when the last error is fixed', () => {
    const values = filled({ firstName: '' })
    let state = run(initialErrorState, { type: 'submit', values })
    expect(state.attention).toBe('1 field needs attention')
    state = run(state, { type: 'change', name: 'firstName', values: filled() })
    expect(state.errors.firstName).toBe('')
    expect(state.attention).toBe('')
    state = run(state, { type: 'change', name: 'firstName', values: filled({ firstName: 'J' }) })
    expect(state.errors.firstName).toMatch(/^Use 2–50 letters/)
    expect(state.attention).toBe('') // a new error after the fix is not a new submit: no stale count comes back
  })

  it('reset forgets errors, shown fields and the count', () => {
    const state = run(initialErrorState, { type: 'submit', values: emptyValues }, { type: 'reset' })
    expect(state).toEqual(initialErrorState)
  })
})
