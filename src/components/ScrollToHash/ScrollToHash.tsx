import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Restores the route start, or the element named in the URL hash, after React renders it.
 * A cross-page hash jump otherwise runs before its target exists.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    let id = hash.slice(1)
    try {
      id = decodeURIComponent(id)
    } catch {
      // a stray % in a hand-edited URL: look the fragment up as written
    }
    document.getElementById(id)?.scrollIntoView()
  }, [pathname, hash])

  return null
}
