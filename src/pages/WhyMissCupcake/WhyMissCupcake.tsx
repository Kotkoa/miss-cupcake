import { Band } from '../../components/Band/Band'
import { Container } from '../../components/Container/Container'
import { SiteFooter } from '../../components/SiteFooter/SiteFooter'
import { Main } from '../../components/Main/Main'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import styles from './WhyMissCupcake.module.css'
import { FeaturesSection } from './sections/FeaturesSection'
import { HeroSection } from './sections/HeroSection'
import { RoastedSection } from './sections/RoastedSection'

export function WhyMissCupcake() {
  return (
    <div className={styles.page}>
      <title>Why Miss cupcake – Miss Cupcake</title>
      <SiteHeader />
      <Main>
        {/* The exploded cupcake hangs from the peach band into the blush one, so both sections live in it. */}
        <Band color="peach">
          <HeroSection />
          <FeaturesSection />
        </Band>
        <RoastedSection />
      </Main>
      <Band color="purple" wave flip className={styles.footerBand}>
        <Container className={styles.footerWrap}>
          <SiteFooter />
        </Container>
      </Band>
    </div>
  )
}
