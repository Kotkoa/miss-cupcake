import { useEffect, useRef } from 'react'
import { Band } from '../../components/Band/Band'
import { Button } from '../../components/Button/Button'
import { Container } from '../../components/Container/Container'
import { SiteFooter } from '../../components/SiteFooter/SiteFooter'
import { Main } from '../../components/Main/Main'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { formatPrice, useCartActions, useCartLines, useCartSubtotal } from '../../features/cart'
import decorDesktop from '../../assets/images/checkout/decor-d.webp'
import decorMobile from '../../assets/images/checkout/decor-m.webp'
import decorTablet from '../../assets/images/checkout/decor-t.webp'
import { CartRow } from './CartRow'
import styles from './Checkout.module.css'

export function Checkout() {
  const lines = useCartLines()
  const subtotalCents = useCartSubtotal()
  const { setQty } = useCartActions()
  const rowsRef = useRef<HTMLUListElement>(null)
  const emptyTitleRef = useRef<HTMLHeadingElement>(null)
  // Where keyboard focus goes once the line it was on has been removed: the next line (or the previous
  // one, on its harmless "increase" button so a held key cannot remove it too), or the "bag is empty" heading when nothing is left.
  const focusAfterRemoval = useRef<string | null>(null)

  useEffect(() => {
    const target = focusAfterRemoval.current
    if (target === null) return
    focusAfterRemoval.current = null
    if (target === '') emptyTitleRef.current?.focus()
    else rowsRef.current?.querySelector<HTMLElement>(`[data-line="${target}"] button[aria-label^="Increase"]`)?.focus()
  }, [lines])

  function changeQuantity(id: string, next: number) {
    if (next <= 0) {
      const index = lines.findIndex((line) => line.id === id)
      const neighbour = lines[index + 1] ?? lines[index - 1]
      focusAfterRemoval.current = neighbour?.id ?? ''
    }
    setQty({ id, qty: next })
  }

  return (
    <div className={styles.page}>
      <title>Check out – Miss Cupcake</title>
      <SiteHeader />
      <Main>
        <Band color="peach">
          <Container as="section" aria-labelledby="checkout-title" className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 id="checkout-title" className={styles.title}>
                Check out
              </h1>
              <p className={styles.lead}>Complete your order and we&rsquo;ll bring it to your door.</p>
              <picture className={styles.decor}>
                <source media="(min-width: 1440px)" srcSet={decorDesktop} width={457} height={630} />
                <source media="(min-width: 960px)" srcSet={decorTablet} width={274} height={378} />
                <img src={decorMobile} alt="" aria-hidden="true" width={178} height={241} />
              </picture>
            </div>
          </Container>
        </Band>

        <Band as="section" color="cream" wave aria-label="Your order" className={styles.band}>
          <Container className={styles.order}>
            {lines.length === 0 ? (
              <div className={styles.empty}>
                <h2 ref={emptyTitleRef} tabIndex={-1} className={styles.emptyTitle}>Your bag is empty</h2>
                <Button href="/#cupcakes">Shop cupcakes</Button>
              </div>
            ) : (
              <>
                <ul ref={rowsRef} className={styles.rows}>
                  {lines.map((line) => (
                    <CartRow key={line.id} line={line} onQuantityChange={(next) => changeQuantity(line.id, next)} />
                  ))}
                </ul>
                <div className={styles.summary}>
                  <div className={styles.summaryInner}>
                    <p className={styles.totalLabel}>Total to pay</p>
                    <p className={styles.total} aria-live="polite">
                      {formatPrice(subtotalCents)}
                    </p>
                    <Button href="/checkout/payment" fullWidth className={styles.placeOrder}>
                      Place order
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Container>
        </Band>
      </Main>

      <Band color="purple" wave flip className={styles.footerBand}>
        <Container className={styles.footerWrap}>
          <SiteFooter />
        </Container>
      </Band>
    </div>
  )
}
