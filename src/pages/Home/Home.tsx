import { useState } from 'react'
import { Band } from '../../components/Band/Band'
import { Container } from '../../components/Container/Container'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { cupcakes } from '../../data/cupcakes'
import { footerNavLinks, footerText, getNavLinks, legalLinks } from '../../data/navigation'
import styles from './Home.module.css'
import { CupcakesSection } from './sections/CupcakesSection'
import { HeroSection } from './sections/HeroSection'
import { OnceUponSection } from './sections/OnceUponSection'
import { SimpleLifeSection } from './sections/SimpleLifeSection'

export function Home() {
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(cupcakes.map((cupcake) => [cupcake.id, cupcake.initialQuantity])),
  )
  // Figma shows 8 items in the cart on first render.
  const [cartCount, setCartCount] = useState(8)

  function changeQuantity(id: string, next: number) {
    setQuantities((current) => ({ ...current, [id]: next }))
  }

  function addToCart(id: string) {
    setCartCount((count) => count + quantities[id])
    changeQuantity(id, 0)
  }

  return (
    <div className={styles.page}>
      <Header navLinks={getNavLinks('/')} cartCount={cartCount} cartHref="/cart" />
      <main>
        <HeroSection />
        <SimpleLifeSection />
        <CupcakesSection quantities={quantities} onQuantityChange={changeQuantity} onAddToCart={addToCart} />
        <OnceUponSection />
      </main>
      <Band color="purple" wave flip className={styles.footerBand}>
        <Container className={styles.footerWrap}>
          <Footer {...footerText} navLinks={footerNavLinks} legalLinks={legalLinks} />
        </Container>
      </Band>
    </div>
  )
}
