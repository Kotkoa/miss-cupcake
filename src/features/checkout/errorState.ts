import { attentionMessage, revalidateChanged, validateField, validateForm } from './validation'
import type { CheckoutValues, FieldErrors, FieldName } from './validation'

export type ErrorState = {
  errors: FieldErrors
  /** Fields that have shown an error at any time: from then on they are checked on every change. */
  shown: ReadonlySet<FieldName>
  /** Set by a submit with errors: the text announced once, and the switch for the visible count. Cleared when no error is left. */
  attention: string
}

export type ErrorAction =
  | { type: 'change'; name: FieldName; values: CheckoutValues }
  | { type: 'blur'; name: FieldName; values: CheckoutValues }
  | { type: 'submit'; values: CheckoutValues }
  | { type: 'reset' }

export const initialErrorState: ErrorState = { errors: {}, shown: new Set(), attention: '' }

function settle(errors: FieldErrors, previous: ErrorState, attention = previous.attention): ErrorState {
  const withError = (Object.keys(errors) as FieldName[]).filter((name) => errors[name])
  const shown = withError.every((name) => previous.shown.has(name)) ? previous.shown : new Set([...previous.shown, ...withError])
  return { errors, shown, attention: withError.length === 0 ? '' : attention }
}

/**
 * Pure, and reading only the state it is given: a submit that moves focus fires a blur in the same event,
 * and both must build on each other, not on the render they were created in.
 */
export function errorReducer(state: ErrorState, action: ErrorAction): ErrorState {
  switch (action.type) {
    case 'change':
      return settle(revalidateChanged(state.errors, state.shown, action.name, action.values), state)
    case 'blur': {
      const errors = { ...state.errors, [action.name]: validateField(action.name, action.values) }
      if (action.name === 'expiryMonth' || action.name === 'expiryYear') {
        errors.expiryMonth = validateField('expiryMonth', action.values)
        errors.expiryYear = validateField('expiryYear', action.values)
      }
      return settle(errors, state)
    }
    case 'submit': {
      const errors = validateForm(action.values)
      return settle(errors, state, attentionMessage(errors))
    }
    case 'reset':
      return initialErrorState
  }
}
