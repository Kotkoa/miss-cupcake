import { useState } from 'react'
import { Band } from '../../components/Band/Band'
import { Container } from '../../components/Container/Container'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { cupcakes } from '../../data/cupcakes'
import styles from './Home.module.css'
import { CupcakesSection } from './sections/CupcakesSection'
import { HeroSection } from './sections/HeroSection'
import { OnceUponSection } from './sections/OnceUponSection'
import { SimpleLifeSection } from './sections/SimpleLifeSection'

const navLinks = [
  { label: 'Shop', href: '/', current: true },
  { label: 'Our story', href: '/our-story' },
  { label: 'Why Miss cupcake', href: '/why-miss-cupcake' },
]

const footerNavLinks = [
  { label: 'Shop', href: '/' },
  { label: 'Our story', href: '/our-story' },
  { label: 'Why Miss cupcake', href: '/why-miss-cupcake' },
]

const legalLinks = [
  { label: 'Privacy policy', href: '/privacy-policy' },
  { label: 'Cookies policy', href: '/cookies-policy' },
  { label: 'Terms of use', href: '/terms-of-use' },
]

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
      <Header navLinks={navLinks} cartCount={cartCount} cartHref="/cart" />
      <main>
        <HeroSection />
        <SimpleLifeSection />
        <CupcakesSection quantities={quantities} onQuantityChange={changeQuantity} onAddToCart={addToCart} />
        <OnceUponSection />
      </main>
      <Band color="purple" wave flip className={styles.footerBand}>
        <Container className={styles.footerWrap}>
          <Footer
            brand={['Miss', 'cupcake']}
            navLinks={footerNavLinks}
            newsletterTitle="Suger up your Inbox"
            emailLabel="Email address"
            submitLabel="send"
            legalLinks={legalLinks}
            copyright="Miss cupcakes 2020"
          />
        </Container>
      </Band>
    </div>
  )
}
