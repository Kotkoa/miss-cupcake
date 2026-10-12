import { Band } from '../../components/Band/Band'
import { Container } from '../../components/Container/Container'
import { SiteFooter } from '../../components/SiteFooter/SiteFooter'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import styles from './WhyMissCupcake.module.css'
import { FeaturesSection } from './sections/FeaturesSection'
import { HeroSection } from './sections/HeroSection'
import { RoastedSection } from './sections/RoastedSection'

export function WhyMissCupcake() {
  return (
    <div className={styles.page}>
      <SiteHeader />
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
          <SiteFooter />
        </Container>
      </Band>
    </div>
  )
}
