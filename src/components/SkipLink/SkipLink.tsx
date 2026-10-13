import type { MouseEvent } from 'react'
import { MAIN_ID } from '../Main/Main'
import styles from './SkipLink.module.css'

/** First focusable element of every page: hidden until it has focus, then jumps past the header. */
export function SkipLink() {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // Not a route change: move focus into <main> so the next Tab starts there, and scroll to it.
    event.preventDefault()
    const main = document.getElementById(MAIN_ID)
    main?.focus()
    main?.scrollIntoView()
  }

  return (
    <a className={styles.skip} href={`#${MAIN_ID}`} onClick={handleClick}>
      Skip to main content
    </a>
  )
}
