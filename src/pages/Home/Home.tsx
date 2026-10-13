import { useEffect, useRef, useState } from 'react'
import { Band } from '../../components/Band/Band'
import { Container } from '../../components/Container/Container'
import { SiteFooter } from '../../components/SiteFooter/SiteFooter'
import { Main } from '../../components/Main/Main'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { cupcakes } from '../../data/cupcakes'
import { useCartActions } from '../../features/cart'
import styles from './Home.module.css'
import { CupcakesSection } from './sections/CupcakesSection'
import { HeroSection } from './sections/HeroSection'
import { OnceUponSection } from './sections/OnceUponSection'
import { SimpleLifeSection } from './sections/SimpleLifeSection'

export function Home() {
  const { add } = useCartActions()
  // Every stepper starts at 1 and goes back to 1 after "add to cart".
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(cupcakes.map((cupcake) => [cupcake.id, 1])),
  )
  // The card that was just added: its status line announces it for a moment.
  const [addedId, setAddedId] = useState<string | null>(null)
  const addedTimer = useRef<number>(undefined)
  const addedFrame = useRef<number>(0)

  useEffect(
    () => () => {
      window.clearTimeout(addedTimer.current)
      window.cancelAnimationFrame(addedFrame.current)
    },
    [],
  )

  function changeQuantity(id: string, next: number) {
    setQuantities((current) => ({ ...current, [id]: next }))
  }

  function addToCart(id: string) {
    add({ id, qty: quantities[id] })
    changeQuantity(id, 1)
    // Clear first so adding the same card again changes the status text and is announced again.
    setAddedId(null)
    window.cancelAnimationFrame(addedFrame.current)
    addedFrame.current = window.requestAnimationFrame(() => setAddedId(id))
    window.clearTimeout(addedTimer.current)
    addedTimer.current = window.setTimeout(() => setAddedId(null), 2000)
  }

  return (
    <div className={styles.page}>
      <title>Miss Cupcake</title>
      <SiteHeader />
      <Main>
        <HeroSection />
        <SimpleLifeSection />
        <CupcakesSection
          quantities={quantities}
          addedId={addedId}
          onQuantityChange={changeQuantity}
          onAddToCart={addToCart}
        />
        <OnceUponSection />
      </Main>
      <Band color="purple" wave flip className={styles.footerBand}>
        <Container className={styles.footerWrap}>
          <SiteFooter />
        </Container>
      </Band>
    </div>
  )
}
