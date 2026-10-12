import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * After a link click, scrolls to the route start or to the element named in the URL hash, once
 * React has rendered it (a cross-page hash jump otherwise runs before its target exists).
 * Back/Forward without a hash is left to the browser, which restores the saved position.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (!hash) {
      if (navigationType !== 'POP') window.scrollTo(0, 0)
      return
    }
    let id = hash.slice(1)
    try {
      id = decodeURIComponent(id)
    } catch {
      // a stray % in a hand-edited URL: look the fragment up as written
    }
    document.getElementById(id)?.scrollIntoView()
  }, [pathname, hash, navigationType])

  return null
}
