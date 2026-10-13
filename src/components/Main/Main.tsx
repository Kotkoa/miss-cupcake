import type { ComponentPropsWithoutRef } from 'react'

export const MAIN_ID = 'main'

/** The page's `<main>`; the skip link targets it. tabIndex -1 lets the link move focus into it. */
export function Main(props: Omit<ComponentPropsWithoutRef<'main'>, 'id' | 'tabIndex'>) {
  return <main {...props} id={MAIN_ID} tabIndex={-1} />
}
