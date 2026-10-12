const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

/** Prices are integer cents everywhere; this is the only place they become text ("$10.47"). */
export function formatPrice(cents: number): string {
  return usd.format(cents / 100)
}
