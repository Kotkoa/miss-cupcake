import { Band } from '../../components/Band/Band'
import { Container } from '../../components/Container/Container'
import { SiteFooter } from '../../components/SiteFooter/SiteFooter'
import { Main } from '../../components/Main/Main'
import { PageMeta } from '../../components/PageMeta/PageMeta'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import styles from './WhyMissCupcake.module.css'
import { FeaturesSection } from './sections/FeaturesSection'
import { HeroSection } from './sections/HeroSection'
import { RoastedSection } from './sections/RoastedSection'

export function WhyMissCupcake() {
  return (
    <div className={styles.page}>
      <PageMeta title="Why Miss cupcake – Miss Cupcake" description="Handmade cupcakes from the finest ingredients, with recipes inspired by local and international favourites." />
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
