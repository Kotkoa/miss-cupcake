import { useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getNavLinks } from '../../data/navigation'
import { useCartCount, useCartLines, useCartSubtotal } from '../../features/cart'
import { useNewsletterNotice } from '../../features/newsletter'
import { Header } from '../Header/Header'
import { MyBag } from '../MyBag/MyBag'
import { NoticeBar } from '../NoticeBar/NoticeBar'

const newsletterMessage = "Registered completed successfully. We'll keep you up to date"

/** The header every page uses: nav, the live cart badge and the My Bag popover behind the cart button. */
export function SiteHeader() {
  const count = useCartCount()
  const lines = useCartLines()
  const subtotalCents = useCartSubtotal()
  const location = useLocation()
  const panelId = useId()
  const cartButtonRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const notice = useNewsletterNotice()

  // The bag is open for the location it was opened on, so any navigation closes it.
  const [openedAt, setOpenedAt] = useState<string | null>(null)
  const open = openedAt === location.key

  function close(returnFocus: boolean) {
    setOpenedAt(null)
    if (returnFocus) cartButtonRef.current?.focus()
  }

  // The Homepage shows the signup notice above the header; closing it hands focus to the header,
  // starting at the first link that is on screen (on Mobile, the menu button comes first).
  function closeNotice() {
    const first = [...(headerRef.current?.querySelectorAll<HTMLElement>('a, button') ?? [])].find(
      (element) => element.getClientRects().length > 0,
    )
    first?.focus()
    notice.dismiss()
  }

  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close(true)
    }
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node
      if (panelRef.current?.contains(target) || cartButtonRef.current?.contains(target)) return
      close(false) // the pointer already moved focus where the user wanted it
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [open])

  return (
    <>
      {notice.visible && location.pathname === '/' ? <NoticeBar message={newsletterMessage} onClose={closeNotice} /> : null}
      <Header
        headerRef={headerRef}
        navLinks={getNavLinks(location.pathname)}
        cartCount={count}
        cartOpen={open}
        onCartToggle={() => setOpenedAt(open ? null : location.key)}
        cartPanelId={panelId}
        cartButtonRef={cartButtonRef}
        cartPanel={
          <div ref={panelRef}>
            <MyBag
              id={panelId}
              lines={lines}
              subtotalCents={subtotalCents}
              onClose={() => close(true)}
              onNavigate={() => close(false)}
              closeRef={closeRef}
              checkoutHref="/checkout"
              shopHref="/#cupcakes"
            />
          </div>
        }
      />
    </>
  )
}
