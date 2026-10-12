import { Band } from '../../components/Band/Band'
import { Container } from '../../components/Container/Container'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { footerNavLinks, footerText, getNavLinks, legalLinks } from '../../data/navigation'
import styles from './WhyMissCupcake.module.css'
import { FeaturesSection } from './sections/FeaturesSection'
import { HeroSection } from './sections/HeroSection'
import { RoastedSection } from './sections/RoastedSection'

export function WhyMissCupcake() {
  return (
    <div className={styles.page}>
      {/* Figma shows 8 items; the real count comes with the cart (task 5.0). */}
      <Header navLinks={getNavLinks('/why-miss-cupcake')} cartCount={8} cartHref="/cart" />
      <main>
        {/* The exploded cupcake hangs from the peach band into the blush one, so both sections live in it. */}
        <Band color="peach">
          <HeroSection />
          <FeaturesSection />
        </Band>
        <RoastedSection />
      </main>
      <Band color="purple" wave flip className={styles.footerBand}>
        <Container className={styles.footerWrap}>
          <Footer {...footerText} navLinks={footerNavLinks} legalLinks={legalLinks} />
        </Container>
      </Band>
    </div>
  )
}
