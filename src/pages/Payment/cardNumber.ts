type CardSelection = {
  start: number
  end: number
}

type FormattedCardNumber = {
  value: string
  selection: CardSelection | null
}

/** Formats groups of four digits while preserving the user's position in the digit stream. */
export function formatCardNumber(value: string, start: number | null, end: number | null): FormattedCardNumber | null {
  if (!/^[\d ]*$/.test(value)) return null
  const formatted = value.replace(/ /g, '').match(/.{1,4}/g)?.join(' ') ?? ''
  if (formatted === value) return { value, selection: null }

  const position = (offset: number) => {
    const digits = value.slice(0, offset).replace(/ /g, '').length
    const grouped = Math.min(formatted.length, digits + Math.max(0, Math.floor((digits - 1) / 4)))
    // Delete before a group separator must advance to the next digit; otherwise the separator is restored forever.
    return formatted[grouped] === ' ' && value[offset] !== ' ' ? grouped + 1 : grouped
  }
  const selectionStart = start ?? value.length
  const selectionEnd = end ?? value.length
  return {
    value: formatted,
    selection: { start: position(selectionStart), end: position(selectionEnd) },
  }
}
