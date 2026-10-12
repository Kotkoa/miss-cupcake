import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to the element named in the URL hash (`/#cupcakes`) once the page has rendered.
 * The browser's own jump runs before React has drawn the page, so a link from another page
 * would otherwise land at the top.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return
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
